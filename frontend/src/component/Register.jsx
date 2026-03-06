import React, { useState } from "react";
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
  Stethoscope,
  User,
  Phone,
  ArrowLeft,
  Check,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill in all required fields");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    if (!agreedToTerms) {
      toast.error("Please agree to the terms and conditions");
      return false;
    }

    return true;
  };

  const checkExistingUser = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    return users.find(u => u.email.toLowerCase() === formData.email.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Check if user already exists
    if (checkExistingUser()) {
      toast.error("An account with this email already exists. Please login.");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Create new user object
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        createdAt: new Date().toISOString()
      };

      // Save to localStorage (simulating database)
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Auto-login after registration
      localStorage.setItem("logintoken", "dummy-token");
      localStorage.setItem("userData", JSON.stringify(newUser));

      toast.success("Account created successfully!");
      setLoading(false);
      navigate("/");
    }, 1500);
  };

  // Password strength checker
  const getPasswordStrength = (password) => {
    const checks = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "Contains a number" },
      { regex: /[a-z]/, text: "Contains lowercase letter" },
      { regex: /[A-Z]/, text: "Contains uppercase letter" },
      { regex: /[^a-zA-Z0-9]/, text: "Contains special character" }
    ];

    return checks.map((check, index) => ({
      ...check,
      valid: check.regex.test(password)
    }));
  };

  const passwordChecks = getPasswordStrength(formData.password);
  const strengthScore = passwordChecks.filter(c => c.valid).length;

  const getStrengthColor = (score) => {
    if (score <= 1) return "bg-red-500";
    if (score <= 2) return "bg-orange-500";
    if (score <= 3) return "bg-yellow-500";
    if (score <= 4) return "bg-blue-500";
    return "bg-green-500";
  };

  const getStrengthText = (score) => {
    if (score <= 1) return "Very Weak";
    if (score <= 2) return "Weak";
    if (score <= 3) return "Medium";
    if (score <= 4) return "Strong";
    return "Very Strong";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 flex items-center justify-center p-4 md:p-8">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-lg">
        {/* Back Button */}
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back to Login</span>
        </button>

        {/* Main Card with Glassmorphism */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          
          {/* Header Section */}
          <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-8 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                <path d="M0 100 C 30 0 60 0 100 100 Z" fill="white" opacity="0.5" />
              </svg>
            </div>
            
            <div className="relative flex flex-col items-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 ring-4 ring-white/10">
                <Heart className="w-8 h-8 text-white fill-white animate-pulse" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            </div>
          </div>

          {/* Form Container */}
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">New Registration</h2>
              <p className="text-gray-500 text-sm">Fill in your details to create your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="username@gmail.com"
                    className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Phone & Department Row */}
                {/* Phone Input */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Phone Number
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 (555) 000-0000"
                      className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>


              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    placeholder="Create a strong password"
                    className="w-full pl-10 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setVisible(!visible)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {visible ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                    )}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-2 space-y-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            level <= strengthScore
                              ? getStrengthColor(strengthScore)
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className={`text-xs font-medium ${
                      strengthScore <= 2 ? "text-red-500" :
                      strengthScore <= 3 ? "text-yellow-500" :
                      "text-green-500"
                    }`}>
                      {getStrengthText(strengthScore)}
                    </p>
                    
                    {/* Password Requirements */}
                    <div className="grid grid-cols-2 gap-1 mt-2">
                      {passwordChecks.map((check, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-1.5 text-xs transition-all duration-200 ${
                            check.valid ? "text-green-600" : "text-gray-400"
                          }`}
                        >
                          <CheckCircle2 className={`w-3.5 h-3.5 ${check.valid ? "fill-current" : ""}`} />
                          <span>{check.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type={confirmVisible ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    className={`w-full pl-10 pr-12 py-3.5 bg-gray-50 border rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20
                                            ${
                        formData.confirmPassword &&
                        formData.password !== formData.confirmPassword
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                          : "border-gray-200 focus:border-blue-500"
                      } transition-all duration-200`}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setConfirmVisible(!confirmVisible)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {confirmVisible ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>

                {/* Password Match Indicator */}
                {formData.confirmPassword && (
                  <div className="flex items-center gap-1 text-xs mt-1">
                    {formData.password === formData.confirmPassword ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-500" />
                        <span className="text-green-600">Passwords match</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                        <span className="text-red-500">Passwords do not match</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start gap-2 mt-3">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={() => setAgreedToTerms(!agreedToTerms)}
                  className="mt-1 accent-blue-600"
                />
                <p className="text-xs text-gray-500">
                  I agree to the{" "}
                  <span className="text-blue-600 cursor-pointer hover:underline">
                    Terms & Conditions
                  </span>{" "}
                  and{" "}
                  <span className="text-blue-600 cursor-pointer hover:underline">
                    Privacy Policy
                  </span>
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Shield className="w-5 h-5 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-xs text-gray-500 mt-6">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-600 font-medium cursor-pointer hover:underline"
              >
                Login here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}