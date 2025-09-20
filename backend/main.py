from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Any, Dict
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
import time
import re
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os

# Paths (relative to project root where CSVs are located)
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir))
INTERNSHIPS_CSV = os.path.join(PROJECT_ROOT, "internships preprocessed 1.csv")
CANDIDATES_CSV = os.path.join(PROJECT_ROOT, "preprocessed candidates 1.csv")

# Load internships dataset once
internships_df = pd.read_csv(INTERNSHIPS_CSV)
try:
    candidates_df = pd.read_csv(CANDIDATES_CSV)
except Exception:
    candidates_df = pd.DataFrame()

# Build TF-IDF artifacts once
combined_corpus = internships_df["Job_Description"].astype(str) + " " + internships_df["Skills_Required"].astype(str)
tfidf = TfidfVectorizer(stop_words="english")
_ = tfidf.fit_transform(combined_corpus)

tfidf_matrix_jd = tfidf.transform(internships_df["Job_Description"].astype(str))
internships_df["tfidf_vector_jd"] = list(tfidf_matrix_jd.toarray())

tfidf_matrix_skills = tfidf.transform(internships_df["Skills_Required"].astype(str))
internships_df["tfidf_vector_skills"] = list(tfidf_matrix_skills.toarray())


def edu_to_rank(label: str) -> int:
    mapping = {
        "12th Pass": 1,
        "Diploma": 2,
        "Graduate": 3,
    }
    return mapping.get(str(label).strip(), 0)


def safe_float(x) -> float:
    try:
        return float(x)
    except Exception:
        return 0.0


class CandidatePayload(BaseModel):
    # Minimal fields required by the engine
    Applicant_ID: Optional[str] = None
    Name: Optional[str] = None
    Skills: str
    Sector_Preferences: str  # comma-separated
    Location_Preference: str  # comma-separated or single
    Background: Optional[str] = ""
    cgpa_or_percentage: Optional[float] = 0.0
    Education_Level: Optional[str] = ""

    # Accept unknown extra fields and ignore
    class Config:
        extra = "ignore"


class RecommendationRequest(BaseModel):
    candidate: CandidatePayload
    top_n: Optional[int] = 5
    weights: Optional[List[float]] = None  # 7 weights


app = FastAPI(title="PMIS Recommendation API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> Dict[str, Any]:
    return {"status": "ok"}


# =====================
# Admin Auth (JWT)
# =====================
SECRET_KEY = os.getenv("ADMIN_JWT_SECRET", "supersecret_admin_key_change_me")
ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "admin123")

security = HTTPBearer()


class AdminLoginRequest(BaseModel):
    username: str
    password: str


def create_token(username: str, ttl_seconds: int = 60 * 60 * 8) -> str:
    now = int(time.time())
    payload = {
        "sub": username,
        "role": "admin",
        "iat": now,
        "exp": now + ttl_seconds,
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")


def verify_admin(creds: HTTPAuthorizationCredentials = Depends(security)) -> Dict[str, Any]:
    token = creds.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])  # type: ignore
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")
    if payload.get("role") != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized")
    return payload


@app.post("/admin/login")
def admin_login(body: AdminLoginRequest) -> Dict[str, Any]:
    if body.username != ADMIN_USERNAME or body.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = create_token(body.username)
    return {"token": token, "token_type": "bearer"}


@app.get("/internships")
def list_internships(limit: int = 20) -> List[Dict[str, Any]]:
    cols = [
        "Internship_ID","Title","Sector","Location","Mode","Industry_Type",
        "Job_Description","Skills_Required","Min_CGPA","Min_Education_Level"
    ]
    return internships_df.head(limit)[cols].to_dict(orient="records")


# =====================
# Admin: Internship CRUD
# =====================
class InternshipPayload(BaseModel):
    Title: str
    Sector: Optional[str] = ""
    Location: Optional[str] = ""
    Mode: Optional[str] = ""
    Industry_Type: Optional[str] = ""
    Job_Description: Optional[str] = ""
    Skills_Required: Optional[str] = ""
    Min_CGPA: Optional[float] = 0.0
    Min_Education_Level: Optional[str] = ""


def _persist_internships():
    # Persist current internships_df to CSV to keep state across restarts
    try:
        internships_df.to_csv(INTERNSHIPS_CSV, index=False)
    except Exception as e:
        # Log to console in absence of logging infra
        print(f"[WARN] Failed to persist internships CSV: {e}")


@app.get("/admin/internships")
def admin_list_internships(limit: int = 100, _: Dict[str, Any] = Depends(verify_admin)) -> List[Dict[str, Any]]:
    cols = [
        "Internship_ID","Title","Sector","Location","Mode","Industry_Type",
        "Job_Description","Skills_Required","Min_CGPA","Min_Education_Level"
    ]
    df = internships_df[cols]
    return df.head(limit).to_dict(orient="records")


@app.post("/admin/internships")
def admin_add_internship(payload: InternshipPayload, _: Dict[str, Any] = Depends(verify_admin)) -> Dict[str, Any]:
    global internships_df
    # Determine next ID in the format like existing (e.g., I200 -> I201)
    def compute_next_id() -> str:
        try:
            ids_series = internships_df.get("Internship_ID", pd.Series([], dtype=object))
            all_ids = [str(x).strip() for x in ids_series.tolist() if str(x).strip() not in ("", "nan", "None")]
            nums: List[int] = []
            for s in all_ids:
                # Prefer trailing number (works for I200, I011, 200, etc.)
                m = re.search(r"(\d+)$", s)
                if m:
                    try:
                        nums.append(int(m.group(1)))
                        continue
                    except Exception:
                        pass
                # Fallback: pure int conversion
                try:
                    nums.append(int(s))
                except Exception:
                    pass
            next_num = (max(nums) + 1) if nums else 1
            candidate = f"I{next_num}"
            # Ensure uniqueness in case of collisions
            existing_set = set(all_ids)
            while candidate in existing_set:
                next_num += 1
                candidate = f"I{next_num}"
            return candidate
        except Exception:
            return f"I{int(time.time())}"

    next_id = compute_next_id()
    row = {
        "Internship_ID": next_id,
        "Title": payload.Title,
        "Sector": payload.Sector or "",
        "Location": payload.Location or "",
        "Mode": payload.Mode or "",
        "Industry_Type": payload.Industry_Type or "",
        "Job_Description": payload.Job_Description or "",
        "Skills_Required": payload.Skills_Required or "",
        "Min_CGPA": payload.Min_CGPA if payload.Min_CGPA is not None else 0.0,
        "Min_Education_Level": payload.Min_Education_Level or "",
    }
    internships_df = pd.concat([internships_df, pd.DataFrame([row])], ignore_index=True)
    # Recompute TF-IDF vectors for new row
    try:
        # Update the precomputed vectors for the appended row
        jd_vec = tfidf.transform([str(row["Job_Description"])])
        skills_vec = tfidf.transform([str(row["Skills_Required"])])
        internships_df.at[internships_df.index[-1], "tfidf_vector_jd"] = list(jd_vec.toarray()[0])
        internships_df.at[internships_df.index[-1], "tfidf_vector_skills"] = list(skills_vec.toarray()[0])
    except Exception:
        pass
    _persist_internships()
    return {"status": "created", "id": next_id}


@app.put("/admin/internships/{internship_id}")
def admin_update_internship(internship_id: str, payload: InternshipPayload, _: Dict[str, Any] = Depends(verify_admin)) -> Dict[str, Any]:
    global internships_df
    idx = internships_df.index[internships_df["Internship_ID"].astype(str) == str(internship_id)]
    if len(idx) == 0:
        raise HTTPException(status_code=404, detail="Internship not found")
    i = idx[0]
    for field in payload.model_fields.keys():
        val = getattr(payload, field)
        if val is not None:
            internships_df.at[i, field] = val
    # Recompute vectors for updated row
    try:
        jd_vec = tfidf.transform([str(internships_df.at[i, "Job_Description"])])
        skills_vec = tfidf.transform([str(internships_df.at[i, "Skills_Required"])])
        internships_df.at[i, "tfidf_vector_jd"] = list(jd_vec.toarray()[0])
        internships_df.at[i, "tfidf_vector_skills"] = list(skills_vec.toarray()[0])
    except Exception:
        pass
    _persist_internships()
    return {"status": "updated", "id": internship_id}


@app.delete("/admin/internships/{internship_id}")
def admin_delete_internship(internship_id: str, _: Dict[str, Any] = Depends(verify_admin)) -> Dict[str, Any]:
    global internships_df
    before = len(internships_df)
    internships_df = internships_df[internships_df["Internship_ID"].astype(str) != str(internship_id)].reset_index(drop=True)
    if len(internships_df) == before:
        raise HTTPException(status_code=404, detail="Internship not found")
    _persist_internships()
    return {"status": "deleted", "id": internship_id}


def recommend_from_payload(candidate: CandidatePayload, top_n: int = 5, weights: Optional[List[float]] = None):
    # If Applicant_ID provided and exists in candidates_df, backfill missing fields from CSV
    if getattr(candidate, "Applicant_ID", None) and not candidates_df.empty:
        try:
            row = candidates_df[candidates_df["Applicant_ID"].astype(str) == str(candidate.Applicant_ID)].iloc[0]
            # Only fill if empty in incoming payload
            def or_from_csv(val_in, csv_val):
                return val_in if (val_in is not None and str(val_in).strip() != "") else csv_val
            candidate.Skills = or_from_csv(candidate.Skills, row.get("Skills", ""))
            candidate.Sector_Preferences = or_from_csv(candidate.Sector_Preferences, row.get("Sector_Preferences", ""))
            candidate.Location_Preference = or_from_csv(candidate.Location_Preference, row.get("Location_Preference", ""))
            candidate.Background = or_from_csv(candidate.Background, row.get("Background", ""))
            candidate.cgpa_or_percentage = or_from_csv(candidate.cgpa_or_percentage, row.get("cgpa_or_percentage", 0))
            candidate.Education_Level = or_from_csv(candidate.Education_Level, row.get("Education_Level", ""))
        except Exception:
            pass
    # Defaults same length as engine
    if not weights:
        weights = [0.25, 0.20, 0.15, 0.15, 0.10, 0.10, 0.05]

    # Candidate skills vector
    candidate_vec = tfidf.transform([str(candidate.Skills)]).toarray()

    # Similarities
    jd_sim = cosine_similarity(candidate_vec, tfidf_matrix_jd)[0]
    skills_sim = cosine_similarity(candidate_vec, tfidf_matrix_skills)[0]

    # Sector match
    candidate_sectors = [s.strip() for s in str(candidate.Sector_Preferences).split(',') if s.strip()]
    sector_match = internships_df["Sector"].apply(lambda x: 1 if x in candidate_sectors else 0)

    # Location match
    candidate_locations = [loc.strip() for loc in str(candidate.Location_Preference).split(',') if loc.strip()]
    location_match = internships_df["Location"].apply(lambda x: 1 if x in candidate_locations else 0)

    # Mode preference (simple rule-based)
    candidate_mode_preference = 'Remote' if 'Urban' in str(candidate.Background) else 'In-person'
    candidate_mode_preferences = [candidate_mode_preference, 'Hybrid']
    mode_match = internships_df["Mode"].apply(lambda x: 1 if x in candidate_mode_preferences else 0)

    # CGPA eligibility
    candidate_cgpa = safe_float(candidate.cgpa_or_percentage)
    cgpa_thresholds = internships_df.get("Min_CGPA")
    if cgpa_thresholds is None:
        cgpa_match = pd.Series([1] * len(internships_df), index=internships_df.index)
    else:
        cgpa_match = cgpa_thresholds.fillna(0).apply(lambda x: 1 if candidate_cgpa >= safe_float(x) else 0)

    # Education level eligibility
    candidate_edu_rank = edu_to_rank(candidate.Education_Level or "")
    min_edu_series = internships_df.get("Min_Education_Level")
    if min_edu_series is None:
        edu_match = pd.Series([1] * len(internships_df), index=internships_df.index)
    else:
        edu_match = min_edu_series.apply(lambda x: 1 if candidate_edu_rank >= edu_to_rank(x) else 0)

    # Weighted score
    scores = (
        weights[0]*skills_sim +
        weights[1]*jd_sim +
        weights[2]*sector_match +
        weights[3]*location_match +
        weights[4]*mode_match +
        weights[5]*cgpa_match +
        weights[6]*edu_match
    )

    tmp = internships_df.copy()
    tmp["Score"] = scores
    tmp['Mode_Rank'] = tmp['Mode'].apply(lambda x: 2 if x == 'Hybrid' else (1 if x in ['Remote', 'In-person'] else 0))

    # Attach raw metrics and contributions for explanations
    tmp["metric_skills"]   = skills_sim
    tmp["metric_jd"]       = jd_sim
    tmp["metric_sector"]   = sector_match.values
    tmp["metric_location"] = location_match.values
    tmp["metric_mode"]     = mode_match.values
    tmp["metric_cgpa"]     = cgpa_match.values
    tmp["metric_edu"]      = edu_match.values

    tmp["contrib_skills"]   = weights[0]*tmp["metric_skills"]
    tmp["contrib_jd"]       = weights[1]*tmp["metric_jd"]
    tmp["contrib_sector"]   = weights[2]*tmp["metric_sector"]
    tmp["contrib_location"] = weights[3]*tmp["metric_location"]
    tmp["contrib_mode"]     = weights[4]*tmp["metric_mode"]
    tmp["contrib_cgpa"]     = weights[5]*tmp["metric_cgpa"]
    tmp["contrib_edu"]      = weights[6]*tmp["metric_edu"]

    # Compute match percentage across full distribution BEFORE slicing top_n
    scores_full = tmp["Score"].to_numpy()
    if len(scores_full) > 0:
        min_s, max_s = float(np.min(scores_full)), float(np.max(scores_full))
        if max_s - min_s > 1e-9:
            perc_full = (scores_full - min_s) / (max_s - min_s) * 100.0
            tmp["matchPercentage"] = np.round(perc_full, 1)
        else:
            # Fallback: build a composite percentage from component metrics
            # Blend continuous (skills/jd) and binary matches (sector/location/mode/cgpa/edu)
            cont = (tmp["metric_skills"].to_numpy() + tmp["metric_jd"].to_numpy()) / 2.0
            binm = (
                tmp["metric_sector"].to_numpy() +
                tmp["metric_location"].to_numpy() +
                tmp["metric_mode"].to_numpy() +
                tmp["metric_cgpa"].to_numpy() +
                tmp["metric_edu"].to_numpy()
            ) / 5.0
            alt = 0.6*cont + 0.4*binm  # [0,1]
            # Scale to a friendlier band 40-95
            alt_min, alt_max = float(np.min(alt)), float(np.max(alt))
            if alt_max - alt_min > 1e-9:
                alt_norm = (alt - alt_min) / (alt_max - alt_min)
            else:
                alt_norm = alt
            tmp["matchPercentage"] = np.round(40.0 + alt_norm*55.0, 1)
    else:
        tmp["matchPercentage"] = []

    # Compute accurate skills_matched as intersection with candidate skills
    try:
        cand_skills = [s.strip().lower() for s in str(candidate.Skills).split(',') if s.strip()]
    except Exception:
        cand_skills = []

    def parse_skills_required(val: Any) -> List[str]:
        if isinstance(val, list):
            return [str(x).strip().lower() for x in val]
        s = str(val)
        s = s.strip()
        # Handle Python-list-like strings
        if s.startswith('[') and s.endswith(']'):
            parts = [p.strip().strip("'\"") for p in s[1:-1].split(',')]
            return [p.lower() for p in parts if p]
        # Fallback comma-separated
        return [p.strip().lower() for p in s.split(',') if p.strip()]

    def intersect_skills(row) -> List[str]:
        req = set(parse_skills_required(row.get("Skills_Required", "")))
        inter = [x for x in cand_skills if x in req]
        # Title case for display
        return [w.title() for w in inter][:10]

    tmp["skills_matched"] = tmp.apply(intersect_skills, axis=1)

    # Build normalized contribution percentages and reasons
    def build_explain(row):
        contribs = {
            "skills": float(row["contrib_skills"]),
            "jd": float(row["contrib_jd"]),
            "sector": float(row["contrib_sector"]),
            "location": float(row["contrib_location"]),
            "mode": float(row["contrib_mode"]),
            "cgpa": float(row["contrib_cgpa"]),
            "edu": float(row["contrib_edu"]),
        }
        total = sum(contribs.values())
        if total <= 1e-12:
            perc = {k: 0.0 for k in contribs}
        else:
            perc = {k: round(v*100.0/total, 1) for k, v in contribs.items()}
        # Reasons
        reasons = []
        if row.get("metric_sector", 0) == 1:
            reasons.append(f"Sector match: {row.get('Sector', '')}")
        if row.get("metric_location", 0) == 1:
            reasons.append(f"Location match: {row.get('Location','')}")
        if row.get("metric_mode", 0) == 1:
            reasons.append(f"Mode preference matched: {row.get('Mode','')}")
        if row.get("metric_cgpa", 0) == 1:
            reasons.append("Meets CGPA threshold")
        if row.get("metric_edu", 0) == 1:
            reasons.append("Meets minimum education level")
        if row.get("metric_skills", 0) > 0:
            sm = row.get("skills_matched", [])
            if isinstance(sm, list) and len(sm) > 0:
                reasons.append(f"Skills overlap: {len(sm)} matched ({', '.join(sm[:5])})")
            else:
                reasons.append("Skills similar to role requirements")
        # Sort reasons by largest contribution first
        order = sorted(perc.items(), key=lambda x: x[1], reverse=True)
        # Ensure top 3 reasons cover major contributions
        top_comp_labels = {
            "skills": "Skills similarity",
            "jd": "Job description similarity",
            "sector": "Sector match",
            "location": "Location match",
            "mode": "Mode preference",
            "cgpa": "CGPA eligibility",
            "edu": "Education eligibility",
        }
        comp_reasons = [f"{top_comp_labels[k]} contributed {v}%" for k, v in order[:3] if v > 0]
        # Merge and deduplicate
        seen = set()
        merged = []
        for item in comp_reasons + reasons:
            if item not in seen:
                seen.add(item)
                merged.append(item)
        return {"contrib_percentages": perc, "reasons": merged[:6]}

    tmp["explain"] = tmp.apply(build_explain, axis=1)

    cols = [
        "Internship_ID","Title","Sector","Location","Mode","Industry_Type",
        "Job_Description","Skills_Required","Min_CGPA","Min_Education_Level","Score","matchPercentage","skills_matched",
        "metric_skills","metric_jd","metric_sector","metric_location","metric_mode","metric_cgpa","metric_edu",
        "contrib_skills","contrib_jd","contrib_sector","contrib_location","contrib_mode","contrib_cgpa","contrib_edu",
        "explain"
    ]
    return tmp.sort_values(['Mode_Rank', 'Score'], ascending=[False, False]).head(top_n)[cols]


@app.post("/recommend")
def recommend(req: RecommendationRequest):
    df = recommend_from_payload(req.candidate, top_n=req.top_n or 5, weights=req.weights)
    # Add a friendly matchPercentage 0-100
    df = df.copy()
    
    return {
        "count": len(df),
        "results": df.to_dict(orient="records")
    }
