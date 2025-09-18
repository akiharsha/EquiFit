# -*- coding: utf-8 -*-
"""equifit.ipynb"""

import pandas as pd
internships = pd.read_csv("internships preprocessed 1.csv")
candidates = pd.read_csv("preprocessed candidates 1.csv")

print("Head of internships preprocessed dataset:")
print(internships.head())

print("\nHead of preprocessed candidates dataset:")
print(candidates.head())

# ================================
# PMIS Internship Recommendation Engine (AI-driven with Mode Boost + Eligibility Filters)
# ================================

# 1. Libraries
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# 2. TF-IDF on Job Descriptions and Skills Required
combined_corpus = internships["Job_Description"].astype(str) + " " + internships["Skills_Required"].astype(str)
tfidf = TfidfVectorizer(stop_words="english")
tfidf_matrix = tfidf.fit_transform(combined_corpus)

# Transform Job Descriptions and Skills Required separately
tfidf_matrix_jd = tfidf.transform(internships["Job_Description"].astype(str))
internships["tfidf_vector_jd"] = list(tfidf_matrix_jd.toarray())

tfidf_matrix_skills = tfidf.transform(internships["Skills_Required"].astype(str))
internships["tfidf_vector_skills"] = list(tfidf_matrix_skills.toarray())


# 3. Recommendation Function (Now includes CGPA & Education Level eligibility)
def recommend_internships(candidate_id, top_n=5, weights=(0.25, 0.20, 0.15, 0.15, 0.10, 0.10, 0.05)):
    """
    weights = (
        skills_required_weight,
        jobdesc_weight,
        sector_weight,
        location_weight,
        mode_weight,
        cgpa_weight,
        edu_weight
    )
    """
    candidate = candidates[candidates["Applicant_ID"] == candidate_id].iloc[0]

    # Helpers
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

    # Candidate skills vector
    candidate_vec = tfidf.transform([str(candidate["Skills"])]).toarray()

    # Similarity with internship Job Description
    jd_sim = cosine_similarity(candidate_vec, tfidf_matrix_jd)[0]

    # Similarity with internship Skills_Required
    skills_sim = cosine_similarity(candidate_vec, tfidf_matrix_skills)[0]

    # Sector match
    candidate_sectors = [s.strip() for s in str(candidate["Sector_Preferences"]).split(',')]
    sector_match = internships["Sector"].apply(lambda x: 1 if x in candidate_sectors else 0)

    # Location match
    candidate_locations = [loc.strip() for loc in str(candidate["Location_Preference"]).split(',')]
    location_match = internships["Location"].apply(lambda x: 1 if x in candidate_locations else 0)

    # Mode preference (simple rule-based)
    candidate_mode_preference = 'Remote' if 'Urban' in str(candidate['Background']) else 'In-person'
    candidate_mode_preferences = [candidate_mode_preference, 'Hybrid']
    mode_match = internships["Mode"].apply(lambda x: 1 if x in candidate_mode_preferences else 0)

    # CGPA eligibility (uses internships['Min_CGPA'] and candidates['cgpa_or_percentage'])
    candidate_cgpa = safe_float(candidate.get("cgpa_or_percentage", 0))
    cgpa_thresholds = internships.get("Min_CGPA")
    if cgpa_thresholds is None:
        # If thresholds not present, allow all
        cgpa_match = pd.Series([1] * len(internships), index=internships.index)
    else:
        cgpa_match = cgpa_thresholds.fillna(0).apply(lambda x: 1 if candidate_cgpa >= safe_float(x) else 0)

    # Education level eligibility (map strings to comparable ranks)
    candidate_edu_rank = edu_to_rank(candidate.get("Education_Level", ""))
    min_edu_series = internships.get("Min_Education_Level")
    if min_edu_series is None:
        edu_match = pd.Series([1] * len(internships), index=internships.index)
    else:
        edu_match = min_edu_series.apply(lambda x: 1 if candidate_edu_rank >= edu_to_rank(x) else 0)

    # Weighted score (includes all factors)
    scores = (
        weights[0]*skills_sim +
        weights[1]*jd_sim +
        weights[2]*sector_match +
        weights[3]*location_match +
        weights[4]*mode_match +
        weights[5]*cgpa_match +
        weights[6]*edu_match
    )

    internships["Score"] = scores
    internships['Mode_Rank'] = internships['Mode'].apply(
        lambda x: 2 if x == 'Hybrid' else (1 if x in ['Remote', 'In-person'] else 0)
    )

    return internships.sort_values(['Mode_Rank', 'Score'], ascending=[False, False]).head(top_n)[
        ["Internship_ID","Title","Sector","Location","Mode","Industry_Type",
         "Job_Description","Skills_Required","Min_CGPA","Min_Education_Level","Score"]
    ]


# === Example Usage with flexible weights ===
candidate_id = "APP004"

print("🎯 Updated Recommendations with Skills_Required + CGPA + Education eligibility included")
print(recommend_internships(candidate_id, top_n=5,
                            weights=(0.25, 0.20, 0.15, 0.15, 0.10, 0.10, 0.05)))
