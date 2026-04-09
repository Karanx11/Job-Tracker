import { useState } from "react";
import axios from "axios";

export default function AddApplication({ refresh }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [jd, setJd] = useState("");

  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/applications", {
        company,
        role,
        status: "Applied",
      });

      setCompany("");
      setRole("");
      setJd("");

      refresh();
    } catch (err) {
      alert("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow border">

      <h2 className="text-primary font-bold text-lg mb-4">
        Add Application
      </h2>

      <textarea
        className="w-full p-3 border rounded mb-3 focus:ring-2 focus:ring-primary outline-none"
        placeholder="Job Description"
        value={jd}
        onChange={(e) => setJd(e.target.value)}
      />

      <input
        className="w-full p-3 border rounded mb-3 focus:ring-2 focus:ring-primary outline-none"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        className="w-full p-3 border rounded mb-3 focus:ring-2 focus:ring-primary outline-none"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <button
        onClick={handleAdd}
        disabled={loading}
        className="bg-primary text-white w-full p-3 rounded-lg hover:bg-blue-900 transition"
      >
        {loading ? "Adding..." : "Add Application"}
      </button>
    </div>
  );
}