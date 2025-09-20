# PMIS Portal – AI Internship Recommendation System

An AI-powered internship recommendation web app for the Prime Minister Internship Scheme (PMIS). Built with Next.js (frontend) and FastAPI (backend). It loads a preprocessed internships dataset, accepts candidate details, and produces personalized recommendations with detailed explanations.

## Features

- Personalized recommendations using TF‑IDF and cosine similarity
- Eligibility filters (CGPA, education level) and preference matching (sector, location, mode)
- Transparent AI explanations: contribution percentages and reasons per match
- Comparison tool to view multiple internships side-by-side
- Optional Applicant ID to prefill candidate details from CSV

## Repository Structure

- `backend/` – FastAPI server and recommendation engine wrapper
  - `main.py` – API and scoring pipeline
  - `requirements.txt` – Python dependencies
- `frontend/` – Next.js 15 + Tailwind CSS app
  - `src/app/application/page.tsx` – Full candidate form (trimmed to essentials)
  - `src/app/apply/page.tsx` – Quick minimal form
  - `src/app/recommendations/page.tsx` – Recommendations dashboard
  - `src/app/recommendations/[id]/page.tsx` – (optional) detailed view if present
  - `src/app/compare/page.tsx` – Comparison view
- Data files (project root)
  - `internships preprocessed 1.csv`
  - `preprocessed candidates 1.csv`

## Prerequisites

- Windows (PowerShell)
- Python 3.11 or 3.12
  - Note: Python 3.13 can cause pandas/scikit-learn install issues
- Node.js 18+ and npm 9+

## Quick Start

1) Backend – create venv and install dependencies

```
cd "c:\EquiFit"
py -3.12 -m venv .venv   # or: py -3.11 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip setuptools wheel
python -m pip install -r backend\requirements.txt
```

2) Run backend

```
.\.venv\Scripts\Activate.ps1
python -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

Health check: http://127.0.0.1:8000/health

3) Frontend – install and run

```
cd "c:\EquiFit\frontend"
npm install
npm run dev
```

Open http://localhost:3000

## Usage Guide

- Application forms
  - Full form: `http://localhost:3000/application`
  - Quick minimal form: `http://localhost:3000/apply`
- Recommendations
  - After submit, you will be redirected to `http://localhost:3000/recommendations`
  - Shows match percentage, skills matched, sector/location, and AI explanation
- Compare
  - Select multiple recommendations and click Compare to open `/compare?matches=…`

### Optional Applicant ID

- Enter an `Applicant ID` (e.g., `APP004`) on the form to backfill missing details from `preprocessed candidates 1.csv`
- The backend merges any missing fields from the CSV before scoring

## Data Files

Place the following CSV files in the project root (same folder that contains `backend/` and `frontend/`):

- `internships preprocessed 1.csv`
- `preprocessed candidates 1.csv`

Expected columns (examples):

- Internships: `Internship_ID, Title, Sector, Location, Mode, Industry_Type, Job_Description, Skills_Required, Min_CGPA, Min_Education_Level`
- Candidates: `Applicant_ID, Name, Education_Level, Skills, Sector_Preferences, Location_Preference, Background, cgpa_or_percentage, ...`

## API Reference (Backend)

Base URL: `http://127.0.0.1:8000`

- `GET /health` → `{ "status": "ok" }`
- `GET /internships?limit=20` → list of internships
- `POST /recommend`

Request body:

```json
{
  "candidate": {
    "Applicant_ID": "APP004",          // optional
    "Name": "Priya Sharma",            // optional
    "Skills": "Python, SQL, ML",
    "Sector_Preferences": "IT, Finance",
    "Location_Preference": "Pune",
    "Background": "Urban",
    "cgpa_or_percentage": 7.8,
    "Education_Level": "Graduate"
  },
  "top_n": 5
}
```

Response fields (partial):

- `matchPercentage` – normalized across full score distribution (with robust fallback)
- `skills_matched` – actual overlap with candidate skills
- `explain.contrib_percentages` – component contributions (skills, jd, sector, location, mode, cgpa, edu)
- `explain.reasons` – human‑readable reasons for the match

## How It Works

1. Build TF‑IDF vectors on internships’ `Job_Description` and `Skills_Required`
2. Vectorize candidate skills and compute cosine similarity vs. JD and Skills
3. Apply preference/eligibility: sector, location, mode, CGPA, education
4. Aggregate weighted score and normalize for display as `matchPercentage`
5. Return top N with `skills_matched` and `explain` breakdown

## Configuration

- CORS: Enabled by default for local development
- Ports
  - Backend: 8000 (127.0.0.1)
  - Frontend: 3000
- Paths: Backend reads CSVs from the project root via relative paths

## Troubleshooting

- **pip install fails for pandas/scikit‑learn**
  - Use Python 3.11 or 3.12. Python 3.13 wheels may be unavailable.
  - Upgrade tooling: `python -m pip install --upgrade pip setuptools wheel`

- **Frontend npm install fails with ENOENT**
  - Ensure you run npm from `frontend/` folder, not the project root.

- **Next.js workspace root warning about multiple lockfiles**
  - Safe to ignore for development. Ensure you run dev from `frontend/`.

- **Both servers need to run at once**
  - Keep backend running in one terminal, frontend in another. Do not Ctrl+C the backend while using the app.

- **All match percentages look 100%**
  - The backend includes a robust fallback. Restart the backend and regenerate recommendations.

- **Skills Matched shows as one long string when copying**
  - On screen, they render as chips. If you need a comma‑separated line, open an issue or ask to enable the text line under chips.

## Development Notes

- Frontend framework: Next.js 15 (Turbopack) + Tailwind CSS + TypeScript
- Backend framework: FastAPI, Uvicorn
- ML/NLP: scikit‑learn, numpy, pandas, TF‑IDF vectorization

## Roadmap

- Detailed recommendation page with richer reasoning and weight bars
- Persist submissions for analytics and A/B testing
- Expand datasets and add real stipend/duration fields where available

## License

Internal prototype for PMIS Portal. All rights reserved.
