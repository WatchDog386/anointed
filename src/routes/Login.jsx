import React, { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ✅ Safe, cross-compatible environment variable handling
let API_BASE_URL = "http://localhost:5000";
try {
  if (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) {
    API_BASE_URL = import.meta.env.VITE_API_URL;
  } else if (typeof process !== "undefined" && process.env?.REACT_APP_API_URL) {
    API_BASE_URL = process.env.REACT_APP_API_URL;
  }
} catch (e) {
  console.warn("Using fallback API_BASE_URL:", e);
}

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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#f6f4ee] to-white flex items-center justify-center p-3 sm:p-4">
      {/* Enhanced floating shapes - smaller on mobile */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#2b473f]/5 blur-lg sm:blur-xl"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#932528]/10 blur-lg sm:blur-xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{ 
          duration: 7, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Main card with responsive sizing */}
      <motion.div 
        className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl flex flex-col lg:flex-row relative z-10 border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left: Form Section - Responsive text and spacing */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-[#f9f8f5]">
          <motion.div 
            className="mb-6 sm:mb-8 text-center lg:text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Enhanced logo section with responsive sizing */}
            <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="bg-[#2b473f] w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm sm:text-base md:text-lg">AVCS</span>
              </div>
              <div>
                <h1 className="text-base sm:text-lg md:text-xl font-bold text-[#2b473f] font-montserrat">Anointed Vessels</h1>
                <p className="text-xs sm:text-sm text-gray-600">Christian School</p>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2b473f] mb-2 sm:mb-3 font-montserrat">Admin Login</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-md mx-auto lg:mx-0 leading-relaxed">
              Sign in to manage student sponsorships and school administration
            </p>
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div 
                className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl text-red-700 flex items-start gap-2 sm:gap-3"
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
              >
                <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-white text-xs">!</span>
                </div>
                <p className="text-xs sm:text-sm flex-1">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-[#2b473f] mb-2 sm:mb-3">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8CA9B4] focus:border-[#2b473f] transition-all duration-200 outline-none bg-white text-gray-800 placeholder-gray-500 text-xs sm:text-sm"
                placeholder="admin@anointed.edu"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-[#2b473f] mb-2 sm:mb-3">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 pr-10 sm:pr-12 rounded-lg sm:rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8CA9B4] focus:border-[#2b473f] transition-all duration-200 outline-none bg-white text-gray-800 placeholder-gray-500 text-xs sm:text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#2b473f] transition-colors p-1 rounded-lg hover:bg-gray-100"
                >
                  {showPassword ? <EyeOff size={16} className="sm:w-5 sm:h-5" /> : <Eye size={16} className="sm:w-5 sm:h-5" />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full py-3 sm:py-3.5 md:py-4 bg-[#932528] text-white font-semibold rounded-lg sm:rounded-xl shadow-md sm:shadow-lg hover:bg-[#7a1e21] transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-xs sm:text-sm">Signing In...</span>
                </>
              ) : (
                <>
                  <LogIn size={16} className="sm:w-5 sm:h-5" /> 
                  <span className="text-xs sm:text-sm">Sign In to Dashboard</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Back to website link */}
          <div className="mt-6 sm:mt-8 text-center lg:text-left">
            <motion.button 
              onClick={() => navigate("/")}
              className="text-xs sm:text-sm text-[#2b473f] hover:text-[#932528] font-medium flex items-center justify-center lg:justify-start gap-1 sm:gap-2 mx-auto lg:mx-0 group transition-colors"
              whileHover={{ x: -2 }}
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to School Website
            </motion.button>
          </div>
        </div>

        {/* Right: Logo Section - Responsive scaling */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#2b473f] to-[#1a2f28] relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20 z-10"></div>
          
          {/* Logo Display */}
          <div className="relative z-20 flex flex-col items-center justify-center w-full h-full p-6 lg:p-8 xl:p-10">
            <motion.div 
              className="text-center max-w-sm xl:max-w-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {/* School Logo */}
              <div className="mb-6 lg:mb-8">
                <img 
                  src="/logo.jpg" 
                  alt="Anointed Vessels Christian School Logo" 
                  className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 mx-auto rounded-xl lg:rounded-2xl object-cover shadow-lg lg:shadow-2xl border-4 border-white/20"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 24 24'%3E%3Cpath fill='%23f6f4ee' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E";
                  }}
                />
              </div>
              
              {/* Inspirational Quote */}
              <motion.div
                className="text-white text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <blockquote className="text-lg sm:text-xl lg:text-2xl xl:text-2xl italic mb-3 lg:mb-4 leading-tight font-light">
                  "Train up a child in the way he should go..."
                </blockquote>
                <p className="font-semibold text-[#8CA9B4] text-sm sm:text-base lg:text-lg">— Proverbs 22:6</p>
                
                {/* Stats */}
                <div className="mt-6 lg:mt-8 flex items-center justify-center">
                  <div className="flex -space-x-2 lg:-space-x-3">
                    {[...Array(3)].map((_, i) => (
                      <motion.div 
                        key={i}
                        className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-[#f6f4ee] border-2 border-[#2b473f] shadow-md lg:shadow-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1 + i * 0.1 }}
                      />
                    ))}
                  </div>
                  <span className="ml-2 sm:ml-3 lg:ml-4 text-xs sm:text-sm lg:text-sm text-white/90 font-medium">
                    Supporting 300+ children
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5 z-0">
            <div className="w-full h-full bg-gradient-to-br from-white to-transparent"></div>
          </div>
        </div>

        {/* Mobile-friendly logo display */}
        <div className="lg:hidden bg-[#2b473f] py-4 sm:py-6 px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <img 
              src="/logo.jpg" 
              alt="School Logo" 
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl object-cover border-2 border-white/20"
              onError={(e) => {
                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24'%3E%3Cpath fill='%23f6f4ee' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E";
              }}
            />
            <div className="text-white">
              <p className="text-xs sm:text-sm italic">"Train up a child in the way he should go..."</p>
              <p className="text-xs text-[#8CA9B4] mt-1">— Proverbs 22:6</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Success Modal */}
      <AnimatePresence>
        {success && (
          <motion.div 
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-3 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl text-center max-w-xs sm:max-w-sm w-full border border-gray-100"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <motion.div 
                className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#932528] to-[#7a1e21] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#2b473f] mb-2 sm:mb-3 font-montserrat">Welcome Back!</h3>
              <p className="text-gray-600 mb-2 text-sm sm:text-base">Login successful</p>
              <p className="text-xs sm:text-sm text-gray-500">Redirecting to admin dashboard...</p>
              
              {/* Loading bar */}
              <div className="mt-4 sm:mt-6 w-full bg-gray-200 rounded-full h-1.5">
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