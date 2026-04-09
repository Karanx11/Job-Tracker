import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
      });

      alert("Registered successfully");
      navigate("/");
    } catch (err) {
      alert("Error registering");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="p-8 rounded-2xl w-96 shadow-lg border bg-white">

        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">
          Create Account
        </h2>

        {/* Email */}
        <input
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="relative mb-4">
          <input
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-primary"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* Button */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full p-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-900 transition flex items-center justify-center"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Register"
          )}
        </button>

        {/* Login Redirect */}
        <p className="text-gray-600 mt-5 text-sm text-center">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-primary font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}