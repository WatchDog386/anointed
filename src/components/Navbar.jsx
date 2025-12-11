// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronUp, X as CloseIcon } from "lucide-react";
import { useClickOutside } from "../hooks/useClickOutside";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isBannerExpanded, setIsBannerExpanded] = useState(true);
  const [bannerClosed, setBannerClosed] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  // Initialize banner on mount
  useEffect(() => {
    // Check if banner was manually closed before
    const wasClosed = localStorage.getItem('christmasBannerClosed');
    if (!wasClosed) {
      // Show banner after 1 second on initial load
      const timeout = setTimeout(() => {
        setShowBanner(true);
        setIsBannerExpanded(true);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, []);

  // Set up timer to show banner every 5 minutes
  useEffect(() => {
    if (bannerClosed) return;

    const interval = setInterval(() => {
      setShowBanner(true);
      setIsBannerExpanded(true);
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [bannerClosed]);

  // Reset timer when banner is shown
  useEffect(() => {
    if (showBanner && isBannerExpanded) {
      const timer = setTimeout(() => {
        setIsBannerExpanded(false);
      }, 10000); // Auto-collapse after 10 seconds
      return () => clearTimeout(timer);
    }
  }, [showBanner, isBannerExpanded]);

  // Close mobile menu on route change & scroll to top
  useEffect(() => {
    setIsOpen(false);
    setOpenSubmenu(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  useClickOutside(navRef, () => {
    setIsOpen(false);
    setOpenSubmenu(null);
  });

  const handleBannerClose = () => {
    setShowBanner(false);
    setIsBannerExpanded(false);
    setBannerClosed(true);
    localStorage.setItem('christmasBannerClosed', 'true');
  };

  const toggleBanner = () => {
    setIsBannerExpanded(!isBannerExpanded);
  };

  const menuItems = [
    { label: "Home", route: "/", id: "home" },
    {
      label: "About Us",
      id: "about",
      submenu: [
        { label: "Our Story", route: "/about", id: "story" },
        { label: "Our Staff", route: "/staff", id: "staff" },
        { label: "Our Partners", route: "/board", id: "board" },
        { label: "Portfolio", route: "/Gallery", id: "gallery" },
      ],
    },
    {
      label: "Our Programs",
      id: "programs",
      submenu: [
        { label: "Education Programs", route: "/eduprog", id: "eduprog" },
        { label: "Spiritual Development", route: "/SpiritualGrowth", id: "spiritual" },
        { label: "Community Outreach", route: "/CommunityOutreach", id: "outreach" },
        { label: "Health & Wellness", route: "/HealthWellness", id: "health" },
        { label: "Child Sponsorship", route: "/ChildSponsorship", id: "sponsorship" },
      ],
    },
    { label: "Get Involved", route: "/Make-An-Impact", id: "involved" },
  ];

  const NavItem = ({ item, isMobile = false }) => {
    const isSubmenuOpen = openSubmenu === item.id;

    if (item.submenu) {
      return (
        <div className={`relative ${isMobile ? "w-full" : "group"}`}>
          {isMobile ? (
            <>
              <button
                className="w-full flex justify-between items-center px-3 py-2.5 font-normal text-white text-left hover:bg-white/10 hover:text-gray-100 rounded-lg transition-all duration-200"
                onClick={() => setOpenSubmenu(isSubmenuOpen ? null : item.id)}
                aria-expanded={isSubmenuOpen}
              >
                <span className="text-sm font-poppins whitespace-nowrap">{item.label}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isSubmenuOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isSubmenuOpen && (
                <div className="pl-4 mt-1 space-y-1">
                  {item.submenu.map((subItem) => (
                    <NavLink
                      key={subItem.id}
                      to={subItem.route}
                      className={({ isActive }) =>
                        `block px-3 py-2 text-xs font-poppins rounded-lg transition-all duration-200 ${
                          isActive
                            ? "text-secondary bg-white/20"
                            : "text-gray-200 hover:text-gray-100 hover:bg-white/10"
                        }`
                      }
                      onClick={() => {
                        setIsOpen(false);
                        setOpenSubmenu(null);
                      }}
                    >
                      {subItem.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <button className="relative px-3 py-2 font-normal text-white hover:text-gray-100 flex items-center gap-1 transition-all duration-200 group-hover:bg-white/10 rounded-lg whitespace-nowrap">
                <span className="text-sm font-poppins">{item.label}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Desktop Dropdown */}
              <div className="absolute left-0 mt-1 w-56 shadow-lg bg-black/70 backdrop-blur-md border border-white/10 border-t-2 border-t-secondary opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform translate-y-2 group-hover:translate-y-0 rounded-none">
                {item.submenu.map((subItem) => (
                  <NavLink
                    key={subItem.id}
                    to={subItem.route}
                    className={({ isActive }) =>
                      `block px-4 py-2.5 text-sm font-poppins transition-all duration-200 border-b border-white/10 last:border-b-0 ${
                        isActive
                          ? "bg-white/20 text-secondary"
                          : "text-gray-200 hover:bg-white/10 hover:text-gray-100"
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {subItem.label}
                  </NavLink>
                ))}
              </div>
            </>
          )}
        </div>
      );
    }

    return (
      <NavLink
        to={item.route}
        className={({ isActive }) =>
          `relative px-3 py-2 font-normal text-sm font-poppins rounded-lg transition-all duration-200 hover:bg-white/10 hover:text-gray-100 whitespace-nowrap ${
            isActive ? "text-secondary" : "text-white"
          }`
        }
        onClick={() => setIsOpen(false)}
      >
        {item.label}
      </NavLink>
    );
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Montserrat:wght@300;400;500;600&family=Poppins:wght@300;400;500&display=swap');
        .font-script { 
          font-family: 'Pacifico', cursive; 
          font-weight: 400;
        }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
        .font-poppins { font-family: 'Poppins', sans-serif; }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes snowfall {
          0% { transform: translateY(-10px) translateX(0px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100px) translateX(20px); opacity: 0; }
        }
        
        .snowflake {
          position: absolute;
          background: white;
          border-radius: 50%;
          animation: snowfall linear infinite;
          pointer-events: none;
        }
      `}</style>

      {/* Christmas/New Year Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ 
              y: isBannerExpanded ? 0 : -40, 
              opacity: isBannerExpanded ? 1 : 0.7,
              height: isBannerExpanded ? "auto" : "40px"
            }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ 
              type: "spring", 
              damping: 20, 
              stiffness: 300 
            }}
            className="fixed top-0 left-0 right-0 z-[1000] overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #0a3d2c 0%, #1a5c3e 25%, #0a3d2c 50%, #c41e3a 75%, #b91c1c 100%)',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Snowfall Effect */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="snowflake"
                  style={{
                    width: `${Math.random() * 4 + 2}px`,
                    height: `${Math.random() * 4 + 2}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDuration: `${Math.random() * 3 + 2}s`,
                    animationDelay: `${Math.random() * 2}s`,
                    boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)'
                  }}
                />
              ))}
            </div>

            {/* Banner Content */}
            <div className="relative">
              {/* Banner Header (Always visible) */}
              <div 
                className="flex items-center justify-between px-4 py-2 cursor-pointer"
                onClick={toggleBanner}
              >
                <div className="flex items-center gap-3">
                  {/* Sparkling Icons */}
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-white font-bold text-lg">★</span>
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-sparkle" 
                         style={{ animation: 'sparkle 2s infinite' }}></div>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="font-poppins text-xs text-white/80 font-light tracking-wider uppercase">
                      Season's Greetings
                    </span>
                    <span className="font-montserrat text-white text-sm font-semibold">
                      Click to expand holiday message
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Toggle Arrow */}
                  <div className="transform transition-transform duration-300">
                    {isBannerExpanded ? (
                      <ChevronUp className="w-5 h-5 text-white/90" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/90 animate-float" 
                          style={{ animation: 'float 2s infinite' }} />
                    )}
                  </div>
                  
                  {/* Close Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBannerClose();
                    }}
                    className="p-1 hover:bg-white/20 rounded-full transition-all duration-200"
                    aria-label="Close banner"
                  >
                    <CloseIcon className="w-4 h-4 text-white/80" />
                  </button>
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {isBannerExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-6 pt-2 border-t border-white/20">
                      <div className="max-w-4xl mx-auto">
                        {/* Main Message */}
                        <div className="text-center mb-4">
                          <h2 className="font-script text-3xl md:text-4xl text-white mb-2 animate-float"
                              style={{ animation: 'float 3s infinite ease-in-out' }}>
                            Merry Christmas
                          </h2>
                          <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                            <span className="text-white/80 text-lg">🎄 ✨ 🎅</span>
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                          </div>
                          <h3 className="font-montserrat text-2xl md:text-3xl text-white font-bold mb-3">
                            & Happy New Year!
                          </h3>
                        </div>

                        {/* Message Content */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                          <p className="font-poppins text-white text-center text-lg leading-relaxed mb-4">
                            Warmest wishes from the entire community at
                          </p>
                          
                          {/* School Name with Elegant Styling */}
                          <div className="relative py-4 mb-6">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                            <h4 className="relative font-script text-3xl md:text-4xl text-center text-white">
                              Anointed Vessels Christian School
                            </h4>
                            <div className="flex justify-center mt-4 gap-6">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center shadow-lg">
                                <span className="text-white text-2xl">🎓</span>
                              </div>
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-rose-700 flex items-center justify-center shadow-lg">
                                <span className="text-white text-2xl">❤️</span>
                              </div>
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center shadow-lg">
                                <span className="text-white text-2xl">⭐</span>
                              </div>
                            </div>
                          </div>

                          <p className="font-poppins text-white/90 text-center text-base leading-relaxed mb-6">
                            May this festive season bring you joy, peace, and prosperity.<br />
                            As we celebrate the birth of Christ and welcome the New Year,<br />
                            we extend our heartfelt gratitude for your continued support and partnership.
                          </p>

                          {/* Decorative Elements */}
                          <div className="flex justify-center items-center gap-8 mt-8">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
                            <div className="px-4 py-2 bg-gradient-to-r from-red-600/30 to-green-600/30 rounded-full">
                              <span className="font-poppins text-white text-sm font-semibold">
                                2024 🎉 2025
                              </span>
                            </div>
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
                          </div>
                        </div>

                        {/* Call to Action */}
                        <div className="mt-6 text-center">
                          <p className="font-poppins text-white/80 text-sm mb-4">
                            Let's continue making a difference together in the coming year
                          </p>
                          <div className="flex justify-center gap-4">
                            <NavLink
                              to="/Make-An-Impact"
                              className="px-6 py-2 rounded-full font-poppins text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 transition-all duration-300 hover:shadow-lg"
                              onClick={() => setShowBanner(false)}
                            >
                              Get Involved
                            </NavLink>
                            <NavLink
                              to="/ChildSponsorship"
                              className="px-6 py-2 rounded-full font-poppins text-sm font-medium text-white bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 transition-all duration-300 hover:shadow-lg"
                              onClick={() => setShowBanner(false)}
                            >
                              Make a Donation
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navigation - Adjust margin based on banner visibility */}
      <nav
        ref={navRef}
        className={`fixed ${showBanner ? 'top-[40px]' : 'top-0'} left-0 w-full z-[999] font-montserrat transition-all duration-300`}
        style={{
          background: 'linear-gradient(135deg, #000000 0%, #BB0000 50%, #006600 100%)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between relative">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-white hover:bg-white/10 hover:text-gray-100 rounded-lg transition-all duration-200"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Logo */}
            <div className="lg:flex-1 flex justify-center lg:justify-start">
              <NavLink to="/" className="flex items-center space-x-3" onClick={() => setIsOpen(false)}>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/30 shadow-sm">
                  <img
                    src="/AVCS LOGO.png"
                    alt="Anointed Vessels Christian School Logo"
                    className="w-10 h-10 sm:w-11 sm:h-11 object-contain"
                  />
                </div>
                <span className="text-sm sm:text-base leading-tight">
                  <span className="font-script text-xl sm:text-2xl md:text-2xl text-white font-normal">
                    Anointed Vessels
                  </span>
                  <br />
                  <span className="font-montserrat text-xs sm:text-sm md:text-base text-white/90 font-light uppercase">
                    CHRISTIAN SCHOOL
                  </span>
                </span>
              </NavLink>
            </div>

            {/* Desktop Menu + Donate */}
            <div className="hidden lg:flex items-center justify-end flex-1">
              <div className="flex items-center gap-6 xl:gap-8 text-sm font-normal mr-6">
                {menuItems.map((item) => (
                  <NavItem key={item.id} item={item} isMobile={false} />
                ))}
              </div>
              {/* Donate Button */}
              <NavLink
                to="/ChildSponsorship"
                className="px-6 py-2.5 text-sm rounded-full font-normal text-white bg-secondary hover:bg-yellow-400 transition-all duration-300 hover:-translate-y-0.5 shadow-md font-montserrat whitespace-nowrap"
                onClick={() => setIsOpen(false)}
              >
                Donate
              </NavLink>
            </div>

            {/* Spacer for mobile */}
            <div className="lg:hidden w-10 h-10"></div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: 1,
                  height: "auto",
                  transition: {
                    opacity: { duration: 0.2 },
                    height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  transition: {
                    opacity: { duration: 0.1 },
                    height: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="lg:hidden overflow-hidden bg-black/70 backdrop-blur-md border-t border-white/10 mt-3"
              >
                <div className="flex flex-col gap-1 pb-4 pt-4 px-4">
                  {menuItems.map((item) => (
                    <div key={item.id} className="border-b border-white/10 pb-3 last:border-b-0">
                      <NavItem item={item} isMobile={true} />
                    </div>
                  ))}
                  <div className="pt-3">
                    <NavLink
                      to="/ChildSponsorship"
                      className="block w-full text-center bg-secondary hover:bg-yellow-400 text-white py-3 rounded-lg font-normal text-sm transition-all duration-300 font-montserrat"
                      onClick={() => setIsOpen(false)}
                    >
                      Donate
                    </NavLink>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
}