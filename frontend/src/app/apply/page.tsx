"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SimpleApplicationPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [applicantId, setApplicantId] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [sectors, setSectors] = useState<string[]>([]);
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const allSectors = ["IT", "Manufacturing", "Healthcare", "Education", "Finance", "Energy", "Tourism", "Agriculture"];
  const eduOptions = [
    { label: "12th Pass", value: "12th" },
    { label: "Diploma", value: "Diploma" },
    { label: "Graduate", value: "Graduation" },
  ];

  const toggleSector = (s: string) => {
    setSectors(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const mapEducation = (level: string) => {
    switch (level) {
      case "12th": return "12th Pass";
      case "Diploma": return "Diploma";
      case "Graduation": return "Graduate";
      default: return "";
    }
  };

  const onSubmit = async () => {
    setError("");
    if (!name || !educationLevel || !cgpa || sectors.length === 0 || !skills || !location) {
      setError("Please fill all fields.");
      return;
    }
    setLoading(true);

    const payload = {
      candidate: {
        Applicant_ID: applicantId && applicantId.trim() ? applicantId.trim() : undefined,
        Name: name,
        Skills: skills,
        Sector_Preferences: sectors.join(", "),
        Location_Preference: location,
        Background: "Urban",
        cgpa_or_percentage: Number(String(cgpa).replace('%','')),
        Education_Level: mapEducation(educationLevel),
      },
      top_n: 5,
    };

    try {
      localStorage.setItem('applicationData', JSON.stringify(payload.candidate));
      const res = await fetch('http://127.0.0.1:8000/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`Backend error ${res.status}`);
      const data = await res.json();
      localStorage.setItem('recommendations', JSON.stringify(data));
      router.push('/recommendations');
    } catch (e) {
      console.error(e);
      setError("Failed to get recommendations. Ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Quick Apply (Minimal)</h1>
        <div className="space-y-5 bg-white p-6 rounded-2xl shadow">
          <div>
            <label className="block text-sm mb-1">Applicant ID (Optional)</label>
            <input className="w-full border p-2 rounded" value={applicantId} onChange={e=>setApplicantId(e.target.value)} placeholder="e.g., APP004"/>
            <p className="text-xs text-gray-500 mt-1">If provided, we’ll prefill missing details from your previous application.</p>
          </div>
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input className="w-full border p-2 rounded" value={name} onChange={e=>setName(e.target.value)} placeholder="Your name"/>
          </div>
          <div>
            <label className="block text-sm mb-1">Education Level</label>
            <select className="w-full border p-2 rounded" value={educationLevel} onChange={e=>setEducationLevel(e.target.value)}>
              <option value="">Select</option>
              {eduOptions.map(o=> <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">CGPA or Percentage</label>
            <input className="w-full border p-2 rounded" value={cgpa} onChange={e=>setCgpa(e.target.value)} placeholder="e.g., 7.5 or 75%"/>
          </div>
          <div>
            <label className="block text-sm mb-2">Sector Preferences</label>
            <div className="grid grid-cols-2 gap-2">
              {allSectors.map(s => (
                <label key={s} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={sectors.includes(s)} onChange={()=>toggleSector(s)} /> {s}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Skills (comma separated)</label>
            <input className="w-full border p-2 rounded" value={skills} onChange={e=>setSkills(e.target.value)} placeholder="Python, SQL, Communication"/>
          </div>
          <div>
            <label className="block text-sm mb-1">Location Preference (City)</label>
            <input className="w-full border p-2 rounded" value={location} onChange={e=>setLocation(e.target.value)} placeholder="e.g., Pune"/>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button disabled={loading} onClick={onSubmit} className="px-4 py-2 bg-orange-600 text-white rounded disabled:opacity-50">
            {loading ? 'Submitting...' : 'Get Recommendations'}
          </button>
        </div>
      </div>
    </div>
  );
}
