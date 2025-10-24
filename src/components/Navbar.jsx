// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useClickOutside } from "../hooks/useClickOutside";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const location = useLocation();
  const navRef = useRef(null);

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
      `}</style>

      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-[999] font-montserrat"
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