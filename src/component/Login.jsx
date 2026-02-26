import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Heart,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  Clock,
  LogOut
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("logintoken");
    const userData = localStorage.getItem("userData");
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("logintoken");
    localStorage.removeItem("userData");
    setUser(null);
    toast.success("Logged out successfully");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!existingUser) {
      toast.error("Account not found. Please register first.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("logintoken", "dummy-token");
      localStorage.setItem("userData", JSON.stringify(existingUser));
      toast.success(`Welcome back, ${existingUser.name}!`);
      setUser(existingUser);
      setLoading(false);
      navigate("/");
    }, 800);
  };

  // ================= LOGGED IN VIEW =================
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 max-w-md w-full text-center">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
            <span className="text-3xl font-bold text-white">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            You're Logged In!
          </h2>
          <p className="text-gray-500 mb-6">
            Welcome back, {user.name}
          </p>

          <div className="space-y-3">
            <button
              onClick={() => navigate("/")}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
            >
              Go to Dashboard
            </button>

            <button
              onClick={handleLogout}
              className="w-full py-3 px-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================= LOGIN FORM =================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 flex items-center justify-center p-4 md:p-8">
      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">

          {/* Header Section */}
          <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-8">
            <div className="relative flex flex-col items-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-white fill-white animate-pulse" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                MediTriage
              </h1>
            </div>
          </div>

          {/* Form Container */}
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-500 text-sm">
                If you are already a member, easily log in
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="email"
                    placeholder="username@gmail.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type={visible ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setVisible(!visible)}
                    className="absolute right-3 top-3 text-gray-400"
                  >
                    {visible ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* Remember */}
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Remember me
                </label>
                <span className="text-gray-400 flex items-center gap-1">
                  <Clock size={14} />
                  30 min lock
                </span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl flex justify-center items-center gap-2"
              >
                {loading ? "Authenticating..." : "Sign In"}
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="text-blue-600 font-semibold"
                >
                  Create account
                </button>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-gray-400 hover:text-gray-600"
          >
            ← Back to MediTriage Homepage
          </button>
        </div>
      </div>
    </div>
  );
}