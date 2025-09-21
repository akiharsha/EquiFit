"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Internship = {
  Internship_ID: string;
  Title: string;
  Sector?: string;
  Location?: string;
  Mode?: string;
  Industry_Type?: string;
  Job_Description?: string;
  Skills_Required?: string;
  Min_CGPA?: number;
  Min_Education_Level?: string;
};

const API_BASE = "http://127.0.0.1:8000";

export default function AdminDashboardPage() {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const [items, setItems] = useState<Internship[]>([]);
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState<Internship | null>(null);

  const [form, setForm] = useState<Partial<Internship>>({
    Title: "",
    Sector: "",
    Location: "",
    Mode: "",
    Industry_Type: "",
    Job_Description: "",
    Skills_Required: "",
    Min_CGPA: 0,
    Min_Education_Level: "",
  });

  useEffect(() => {
    const t = localStorage.getItem("pmis_admin_token");
    if (t) setToken(t);
  }, []);

  const headers = useMemo(() => {
    const h: Record<string, string> = { "Content-Type": "application/json" };
    if (token) h["Authorization"] = `Bearer ${token}`;
    return h;
  }, [token]);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        throw new Error("Invalid credentials");
      }
      const data = await res.json();
      localStorage.setItem("pmis_admin_token", data.token);
      setToken(data.token);
      setUsername("");
      setPassword("");
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem("pmis_admin_token");
    setToken(null);
  };

  const loadItems = async () => {
    if (!token) return;
    setBusy(true);
    try {
      const res = await fetch(`${API_BASE}/admin/internships?limit=500`, {
        headers,
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Failed to load internships (${res.status}): ${txt}`);
      }
      const data = await res.json();
      setItems(data);
    } catch (e) {
      console.error(e);
      alert(String(e));
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const onChange = (key: keyof Internship, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setForm({
      Title: "",
      Sector: "",
      Location: "",
      Mode: "",
      Industry_Type: "",
      Job_Description: "",
      Skills_Required: "",
      Min_CGPA: 0,
      Min_Education_Level: "",
    });
    setEditing(null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setBusy(true);
    try {
      const payload = {
        Title: form.Title?.trim() || "",
        Sector: form.Sector || "",
        Location: form.Location || "",
        Mode: form.Mode || "",
        Industry_Type: form.Industry_Type || "",
        Job_Description: form.Job_Description || "",
        Skills_Required: form.Skills_Required || "",
        Min_CGPA: Number(form.Min_CGPA || 0),
        Min_Education_Level: form.Min_Education_Level || "",
      };
      let res: Response;
      if (editing) {
        res = await fetch(`${API_BASE}/admin/internships/${editing.Internship_ID}`, {
          method: "PUT",
          headers,
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_BASE}/admin/internships`, {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
        });
      }
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Save failed (${res.status}): ${txt}`);
      }
      await loadItems();
      resetForm();
    } catch (e) {
      console.error(e);
      alert(String(e));
    } finally {
      setBusy(false);
    }
  };

  const editRow = (row: Internship) => {
    setEditing(row);
    setForm({ ...row });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteRow = async (row: Internship) => {
    if (!token) return;
    if (!confirm(`Delete internship #${row.Internship_ID}?`)) return;
    setBusy(true);
    try {
      const res = await fetch(`${API_BASE}/admin/internships/${row.Internship_ID}`, {
        method: "DELETE",
        headers,
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Delete failed (${res.status}): ${txt}`);
      }
      await loadItems();
    } catch (e) {
      console.error(e);
      alert(String(e));
    } finally {
      setBusy(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
        <nav className="bg-white/80 backdrop-blur-sm shadow-lg border-b-4 border-orange-500">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-gray-800">PMIS Portal</Link>
            <span className="text-sm text-gray-500">Admin Login</span>
          </div>
        </nav>
        <div className="max-w-md mx-auto mt-16 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
          <h1 className="text-2xl font-bold mb-6">Admin Sign In</h1>
          {error && <p className="mb-4 text-red-600 text-sm">{error}</p>}
          <form onSubmit={signIn} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Username</label>
              <input className="w-full border rounded-xl px-4 py-3" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="admin" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Password</label>
              <input type="password" className="w-full border rounded-xl px-4 py-3" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••••" />
            </div>
            <button disabled={loading} className="w-full govt-button disabled:opacity-60">{loading?"Signing in...":"Sign In"}</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <nav className="bg-white/80 backdrop-blur-sm shadow-lg border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-800">PMIS Portal</Link>
          <div className="flex items-center gap-3">
            <button onClick={loadItems} className="px-3 py-2 rounded-lg bg-orange-100 text-orange-700">Refresh</button>
            <button onClick={signOut} className="px-3 py-2 rounded-lg bg-red-100 text-red-700">Sign out</button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Weights Tuning */}
        <WeightsPanel token={token} headers={headers} />

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow border p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">{editing ? `Edit Internship #${editing.Internship_ID}` : "Add Internship"}</h2>
          <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Title</label>
              <input className="w-full border rounded-xl px-3 py-2" value={form.Title || ""} onChange={(e)=>onChange("Title", e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Sector</label>
              <input className="w-full border rounded-xl px-3 py-2" value={form.Sector || ""} onChange={(e)=>onChange("Sector", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Location</label>
              <input className="w-full border rounded-xl px-3 py-2" value={form.Location || ""} onChange={(e)=>onChange("Location", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Mode</label>
              <input className="w-full border rounded-xl px-3 py-2" value={form.Mode || ""} onChange={(e)=>onChange("Mode", e.target.value)} placeholder="Remote / In-person / Hybrid" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Industry Type</label>
              <input className="w-full border rounded-xl px-3 py-2" value={form.Industry_Type || ""} onChange={(e)=>onChange("Industry_Type", e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700 mb-1">Job Description</label>
              <textarea className="w-full border rounded-xl px-3 py-2" value={form.Job_Description || ""} onChange={(e)=>onChange("Job_Description", e.target.value)} rows={3} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700 mb-1">Skills Required (comma separated)</label>
              <input className="w-full border rounded-xl px-3 py-2" value={form.Skills_Required || ""} onChange={(e)=>onChange("Skills_Required", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Min CGPA</label>
              <input type="number" step="0.01" className="w-full border rounded-xl px-3 py-2" value={form.Min_CGPA ?? 0} onChange={(e)=>onChange("Min_CGPA", Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Min Education Level</label>
              <input className="w-full border rounded-xl px-3 py-2" value={form.Min_Education_Level || ""} onChange={(e)=>onChange("Min_Education_Level", e.target.value)} placeholder="12th Pass / Diploma / Graduate" />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button disabled={busy} className="govt-button px-6 disabled:opacity-60">{editing?"Update":"Add"} Internship</button>
              {editing && (
                <button type="button" onClick={resetForm} className="px-4 py-2 rounded-xl border">Cancel</button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Internships ({items.length})</h2>
            <button onClick={loadItems} className="px-3 py-2 rounded-lg bg-gray-100">Reload</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-3 pr-4">ID</th>
                  <th className="py-3 pr-4">Title</th>
                  <th className="py-3 pr-4">Sector</th>
                  <th className="py-3 pr-4">Location</th>
                  <th className="py-3 pr-4">Mode</th>
                  <th className="py-3 pr-4">Min CGPA</th>
                  <th className="py-3 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((row) => (
                  <tr key={row.Internship_ID} className="border-b align-top">
                    <td className="py-3 pr-4">{row.Internship_ID}</td>
                    <td className="py-3 pr-4">
                      <div className="font-medium">{row.Title}</div>
                      <div className="text-gray-500 max-w-[360px] truncate">{row.Job_Description}</div>
                    </td>
                    <td className="py-3 pr-4">{row.Sector}</td>
                    <td className="py-3 pr-4">{row.Location}</td>
                    <td className="py-3 pr-4">{row.Mode}</td>
                    <td className="py-3 pr-4">{row.Min_CGPA ?? 0}</td>
                    <td className="py-3 pr-4">
                      <div className="flex gap-2">
                        <button onClick={()=>editRow(row)} className="px-3 py-1 rounded-lg bg-blue-100 text-blue-700">Edit</button>
                        <button onClick={()=>deleteRow(row)} className="px-3 py-1 rounded-lg bg-red-100 text-red-700">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-500">No internships found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function WeightsPanel({ token, headers }: { token: string; headers: Record<string,string> }) {
  const [labels, setLabels] = useState<string[]>(["skills","jd","sector","location","mode","cgpa","edu"]);
  const [weights, setWeights] = useState<number[]>([0.25,0.20,0.15,0.15,0.10,0.10,0.05]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const sum = weights.reduce((a,b)=>a+(Number.isFinite(b)?b:0),0);

  const fetchWeights = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/admin/weights`, { headers });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Load weights failed (${res.status}): ${txt}`);
      }
      const data = await res.json();
      if (Array.isArray(data.labels)) setLabels(data.labels);
      if (Array.isArray(data.weights) && data.weights.length===7) setWeights(data.weights.map((x:number)=>Number(x)));
    } catch (e) {
      console.error(e);
      alert(String(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{ fetchWeights(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [token]);

  const setWeight = (idx: number, val: number) => {
    setWeights(w => {
      const next = [...w];
      next[idx] = val;
      return next;
    });
  };

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/admin/weights`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ weights })
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Save weights failed (${res.status}): ${txt}`);
      }
      const data = await res.json();
      if (Array.isArray(data.weights)) setWeights(data.weights.map((x:number)=>Number(x)));
    } catch (e) {
      console.error(e);
      alert(String(e));
    } finally {
      setSaving(false);
    }
  };

  // Normalized preview
  const norm = (() => {
    const s = sum;
    if (s <= 1e-12) return weights.map(()=>0);
    return weights.map(w => w/s);
  })();

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow border p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Tune Recommendation Weights</h2>
        <div className="text-sm text-gray-600">Sum: <span className={sum>1.001||sum<0.999?"text-red-600 font-semibold":"font-semibold"}>{sum.toFixed(3)}</span> (auto-normalized on save)</div>
      </div>
      {loading ? (
        <div className="py-6 text-gray-500">Loading weights…</div>
      ) : (
        <div className="space-y-4">
          {labels.map((label, i) => (
            <div key={label} className="grid grid-cols-1 md:grid-cols-6 gap-3 items-center">
              <div className="md:col-span-1 font-medium capitalize">{label}</div>
              <div className="md:col-span-4">
                <input type="range" min={0} max={1} step={0.01} value={weights[i] ?? 0}
                  onChange={(e)=>setWeight(i, parseFloat(e.target.value))}
                  className="w-full" />
              </div>
              <div className="md:col-span-1 text-right text-sm">
                <div>raw: {Number(weights[i] ?? 0).toFixed(2)}</div>
                <div className="text-gray-500">norm: {Number(norm[i] ?? 0).toFixed(2)}</div>
              </div>
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <button onClick={save} disabled={saving} className="govt-button px-6 disabled:opacity-60">{saving?"Saving…":"Save Weights"}</button>
            <button onClick={fetchWeights} disabled={loading} className="px-4 py-2 rounded-xl border">Reset</button>
          </div>
          <p className="text-xs text-gray-500 pt-1">Labels map to engine components: skills, job description, sector, location, mode, cgpa, education.</p>
        </div>
      )}
    </div>
  );
}
