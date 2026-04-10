import { useState } from "react";
import axios from "axios";

export default function AddApplication({ refresh }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [jd, setJd] = useState("");

  const [skills, setSkills] = useState([]);
  const [niceSkills, setNiceSkills] = useState([]);
  const [seniority, setSeniority] = useState("");
  const [location, setLocation] = useState("");

  const [points, setPoints] = useState([]);

  const [loadingAI, setLoadingAI] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingResume, setLoadingResume] = useState(false);

  const BASE = "https://job-tracker-backend-jwgv.onrender.com";

  // AI PARSE
  const handleAI = async () => {
    if (!jd) return alert("Paste job description");

    try {
      setLoadingAI(true);

      const res = await axios.post(`${BASE}/api/ai/parse`, { jd });

      setCompany(res.data.company || "");
      setRole(res.data.role || "");
      setSkills(res.data.required_skills || []);
      setNiceSkills(res.data.nice_to_have_skills || []);
      setSeniority(res.data.seniority || "");
      setLocation(res.data.location || "");
    } catch (err) {
      console.log(err);
      alert("AI parsing failed");
    } finally {
      setLoadingAI(false);
    }
  };

  // RESUME AI
  const handleResume = async () => {
    if (!company || !role) {
      return alert("Fill company & role first");
    }

    try {
      setLoadingResume(true);

      const res = await axios.post(`${BASE}/api/ai/resume`, {
        company,
        role,
      });

      setPoints(res.data.points || []);
    } catch (err) {
      console.log(err);
      alert("Resume AI failed");
    } finally {
      setLoadingResume(false);
    }
  };

  // ADD
  const handleAdd = async () => {
    if (!company || !role) {
      return alert("Fill all fields");
    }

    try {
      setLoadingAdd(true);

      await axios.post(`${BASE}/api/applications`, {
        company,
        role,
        status: "Applied",
        required_skills: skills,
        nice_to_have_skills: niceSkills,
        seniority,
        location,
      });

      // reset
      setCompany("");
      setRole("");
      setJd("");
      setSkills([]);
      setNiceSkills([]);
      setSeniority("");
      setLocation("");
      setPoints([]);

      refresh();
    } catch (err) {
      console.log(err);
      alert("Error adding application");
    } finally {
      setLoadingAdd(false);
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow border">

        <h2 className="text-primary font-bold text-lg mb-4">
          Add Application
        </h2>

        {/* JD */}
        <textarea
          className="w-full p-3 border rounded mb-3"
          placeholder="Paste Job Description..."
          value={jd}
          onChange={(e) => setJd(e.target.value)}
        />

        {/* AI Button */}
        <button
          onClick={handleAI}
          className="bg-primary text-white w-full p-3 rounded mb-3"
        >
          {loadingAI ? "Parsing..." : "Parse with AI"}
        </button>

        {/* Inputs */}
        <input
          className="w-full p-3 border rounded mb-2"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          className="w-full p-3 border rounded mb-2"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        {/* AI Data */}
        <p><b>Seniority:</b> {seniority}</p>
        <p><b>Location:</b> {location}</p>

        <p className="mt-2"><b>Skills:</b></p>
        <ul>
          {skills.map((s, i) => <li key={i}>• {s}</li>)}
        </ul>

        {/* Add */}
        <button
          onClick={handleAdd}
          className="bg-primary text-white w-full p-3 rounded mt-3"
        >
          {loadingAdd ? "Adding..." : "Add Application"}
        </button>

        {/* Resume */}
        <button
          onClick={handleResume}
          className="bg-black text-white w-full p-3 rounded mt-3"
        >
          {loadingResume ? "Generating..." : "Generate Resume Points"}
        </button>
      </div>

      {/* Resume Output */}
      {points.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold">Resume Suggestions</h3>

          {points.map((p, i) => (
            <div key={i} className="bg-gray-100 p-2 mb-2 rounded flex justify-between">
              <p>{p}</p>
              <button onClick={() => navigator.clipboard.writeText(p)}>
                Copy
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}