import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";

function Register() {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/auth/register", { name, email, password });
      login(res.data.user, res.data.token); // auto-login
      navigate("/"); // go Home after register
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-100 via-white to-emerald-50 px-4">
      {/* ===== Header / Title ===== */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Create an Account 
        </h1>
        <p className="text-gray-600 mt-2">
          Join <span className="font-semibold text-indigo-700">OnlineShop</span>{" "}
          and start shopping smartly today!
        </p>
      </div>

      {/* ===== Register Form Card ===== */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl w-full max-w-sm p-6 sm:p-8 transition-all"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Register
        </h2>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1 text-sm font-medium">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
            className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-300 outline-none"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1 text-sm font-medium">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-300 outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-1 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-300 outline-none"
          />
        </div>

        {/* Register Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 text-lg rounded-xl font-medium text-white shadow-md transition-all ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-gray-400 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Redirect to Login */}
        <p className="text-center text-gray-700 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 hover:underline font-medium"
          >
            Login here
          </Link>
        </p>
      </form>

      {/* ===== Footer ===== */}
      <footer className="mt-10 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} SwapnilKirana • Local & Trusted 
      </footer>
    </div>
  );
}

export default Register;
