// src/components/Login.jsx
import React, { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ✅ Dynamically determine API base URL
const getApiBaseUrl = () => {
  if (import.meta.env.PROD) {
    return "https://anointed-3v54.onrender.com";
  }
  return "http://localhost:5000";
};

const API_BASE_URL = getApiBaseUrl();

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.msg || "Invalid email or password");
      if (!data.token) throw new Error("Authentication succeeded but no token received");

      localStorage.setItem("token", data.token);
      setSuccess(true);
      setTimeout(() => navigate("/admin/dashboard"), 1500);
    } catch (err) {
      if (err.name === "TypeError" && err.message.includes("fetch")) {
        setError("Network error: Could not reach the server. Is it running?");
      } else {
        setError(err.message || "An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      {/* Floating decorative elements - scale down on mobile */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-[#2b473f]/5 blur"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-[#932528]/10 blur"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Main Card - responsive layout */}
      <motion.div 
        className="w-full max-w-4xl bg-white rounded-xl overflow-hidden shadow-xl border border-gray-100 relative z-10 flex flex-col lg:flex-row"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* LEFT: Form Section */}
        <div className="w-full lg:w-1/2 p-5 sm:p-6 md:p-7 lg:p-8">
          <motion.div 
            className="mb-6 text-center lg:text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <div className="bg-[#2b473f] w-9 h-9 rounded-md flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xs">AVCS</span>
              </div>
              <div>
                <h1 className="text-base font-bold text-[#2b473f]">Anointed Vessels</h1>
                <p className="text-xs text-gray-600">Christian School</p>
              </div>
            </div>

            <h2 className="text-xl font-bold text-[#2b473f] mb-2">Admin Login</h2>
            <p className="text-gray-600 text-sm max-w-md mx-auto lg:mx-0 leading-relaxed">
              Sign in to manage student sponsorships and school administration
            </p>
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div 
                className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-start gap-2"
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
              >
                <div className="flex-shrink-0 w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-white text-[10px]">!</span>
                </div>
                <p className="text-sm flex-1">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#2b473f] mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#8CA9B4]/50 focus:border-[#2b473f] transition-all duration-200 outline-none bg-white text-gray-800 placeholder-gray-500 text-sm"
                placeholder="admin@anointed.edu"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#2b473f] mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#8CA9B4]/50 focus:border-[#2b473f] transition-all duration-200 outline-none bg-white text-gray-800 placeholder-gray-500 text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#2b473f] transition-colors p-1 rounded"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full py-2.5 bg-[#932528] text-white font-medium rounded-lg shadow hover:bg-[#7a1e21] transition-all duration-300 flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <LogIn size={16} /> 
                  <span>Sign In to Dashboard</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Back to website */}
          <div className="mt-6 text-center lg:text-left">
            <motion.button 
              onClick={() => navigate("/")}
              className="text-sm text-[#2b473f] hover:text-[#932528] font-medium flex items-center justify-center lg:justify-start gap-1.5 mx-auto lg:mx-0 group transition-colors"
              whileHover={{ x: -2 }}
            >
              <svg className="w-3 h-3 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to School Website
            </motion.button>
          </div>
        </div>

        {/* RIGHT: Branded Panel - hidden on mobile, visible from lg */}
        <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-[#2b473f] to-[#1a2f28] relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
            <motion.div 
              className="max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="mb-5">
                <img 
                  src="/logo.jpg" 
                  alt="Anointed Vessels Christian School Logo" 
                  className="w-24 h-24 mx-auto rounded-xl object-cover shadow-lg border-2 border-white/20"
                  onError={(e) => {
                    e.target.src = "image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 24 24'%3E%3Cpath fill='%23f6f4ee' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E";
                  }}
                />
              </div>
              
              <blockquote className="text-white text-base italic mb-2 font-light">
                "Train up a child in the way he should go..."
              </blockquote>
              <p className="font-medium text-[#8CA9B4] text-sm">— Proverbs 22:6</p>
              
              <div className="mt-6 flex items-center justify-center">
                <div className="flex -space-x-1.5">
                  {[...Array(3)].map((_, i) => (
                    <motion.div 
                      key={i}
                      className="w-7 h-7 rounded-full bg-[#f6f4ee] border border-[#2b473f] shadow"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                    />
                  ))}
                </div>
                <span className="ml-3 text-xs text-white/90 font-medium">
                  Supporting 300+ children
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* MOBILE/TABLET: Bottom Brand Bar */}
        <div className="lg:hidden bg-[#2b473f] py-3 px-5 flex items-center justify-center gap-3">
          <img 
            src="/logo.jpg" 
            alt="School Logo" 
            className="w-9 h-9 rounded-md object-cover border border-white/20"
            onError={(e) => {
              e.target.src = "image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 24 24'%3E%3Cpath fill='%23f6f4ee' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E";
            }}
          />
          <div className="text-white">
            <p className="text-xs italic">"Train up a child..."</p>
            <p className="text-[10px] text-[#8CA9B4] mt-0.5">— Proverbs 22:6</p>
          </div>
        </div>
      </motion.div>

      {/* Success Modal */}
      <AnimatePresence>
        {success && (
          <motion.div 
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-xl text-center max-w-xs w-full border border-gray-100"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <motion.div 
                className="w-14 h-14 bg-gradient-to-br from-[#932528] to-[#7a1e21] rounded-full flex items-center justify-center mx-auto mb-3 shadow"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h3 className="text-lg font-bold text-[#2b473f] mb-1.5">Welcome Back!</h3>
              <p className="text-gray-600 mb-1.5 text-sm">Login successful</p>
              <p className="text-xs text-gray-500">Redirecting to admin dashboard...</p>
              
              <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
                <motion.div 
                  className="bg-[#932528] h-1.5 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "linear" }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;