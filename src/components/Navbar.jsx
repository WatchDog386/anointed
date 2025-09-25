// src/components/Navbar.jsx
import React, { useState, useRef } from "react";
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
  React.useEffect(() => {
    setIsOpen(false);
    setOpenSubmenu(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  useClickOutside(navRef, () => {
    setIsOpen(false);
    setOpenSubmenu(null);
  });

  const currentPath = location.pathname;

  const menuItems = [
    { label: "Home", route: "/", id: "home" },
    {
      label: "About Us",
      id: "about",
      submenu: [
        { label: "Our Story", route: "/about", id: "story" },
        { label: "Our Staff", route: "/staff", id: "staff" },
        { label: "Our Board Members", route: "/board", id: "board" },
        { label: "Gallery/Videos", route: "/gallery", id: "gallery" },
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
    { label: "Impact", route: "/impacts", id: "impact" },
    { label: "Get Involved", route: "/Make-An-Impact", id: "involved" },
    { label: "Contact", route: "/cta", id: "contact" },
  ];

  const NavItem = ({ item, isMobile = false }) => {
    const isSubmenuOpen = openSubmenu === item.id;

    if (item.submenu) {
      return (
        <div className={`relative ${isMobile ? "w-full" : "group"}`}>
          {isMobile ? (
            <>
              <button
                className="w-full flex justify-between items-center px-3 py-2.5 font-medium text-gray-800 text-left hover:bg-white/20 rounded-lg transition-all duration-200"
                onClick={() => setOpenSubmenu(isSubmenuOpen ? null : item.id)}
                aria-expanded={isSubmenuOpen}
              >
                <span className="text-sm">{item.label}</span>
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
                        `block px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                          isActive
                            ? "text-[#932528] bg-white/30"
                            : "text-gray-700 hover:text-[#8CA9B4] hover:bg-white/20"
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
              <button className="relative pb-1.5 px-2 font-medium text-gray-800 hover:text-[#8CA9B4] flex items-center gap-1 transition-all duration-200 group-hover:bg-white/20 rounded-lg py-1">
                <span className="text-sm">{item.label}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 mt-0.5 transition-transform duration-200 group-hover:rotate-180"
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
              <div className="absolute left-0 mt-1 w-56 rounded-lg shadow-lg bg-white/95 backdrop-blur-md border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform translate-y-2 group-hover:translate-y-0">
                {item.submenu.map((subItem) => (
                  <NavLink
                    key={subItem.id}
                    to={subItem.route}
                    className={({ isActive }) =>
                      `block px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-[#f0f9ff] text-[#932528]"
                          : "text-gray-700 hover:bg-white/50 hover:text-[#8CA9B4]"
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
          `relative pb-1.5 px-2 font-medium text-sm rounded-lg transition-all duration-200 hover:bg-white/20 py-1 ${
            isActive ? "text-[#932528]" : "text-gray-800 hover:text-[#8CA9B4]"
          }`
        }
        onClick={() => setIsOpen(false)}
      >
        {item.label}
      </NavLink>
    );
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-[999] bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20 font-montserrat"
    >
      <div className="max-w-7xl mx-auto px-4 py-2 sm:py-3 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-3" onClick={() => setIsOpen(false)}>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f9fafb] flex items-center justify-center border border-white/30">
            <img
              src="/Logo.jpg"
              alt="Anointed Vessels Christian School Logo"
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
            />
          </div>
          <span className="text-sm font-bold text-gray-800 hidden sm:block leading-tight">
            ANOINTED VESSELS<br />
            CHRISTIAN SCHOOL
          </span>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-3 text-sm font-medium">
          {menuItems.map((item) => (
            <NavItem key={item.id} item={item} isMobile={false} />
          ))}
        </div>

        {/* CTA Button - Desktop */}
        <div className="hidden md:block">
          <NavLink
            to="/ChildSponsorship"
            className="px-4 py-1.5 text-sm rounded-full font-semibold bg-[#932528] text-white hover:bg-[#8CA9B4] transition-all duration-200 hover:scale-105"
            onClick={() => setIsOpen(false)}
          >
            Sponsor a Child
          </NavLink>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-gray-800 hover:bg-white/20 rounded-lg transition-all duration-200"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
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
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-md"
          >
            <div className="flex flex-col gap-1 pb-4 border-t border-white/20 mt-2 pt-4 px-4">
              {menuItems.map((item) => (
                <div key={item.id} className="border-b border-white/20 pb-3">
                  <NavItem item={item} isMobile={true} />
                </div>
              ))}
              <div className="pt-3">
                <NavLink
                  to="/ChildSponsorship"
                  className="block w-full text-center bg-[#932528] hover:bg-[#8CA9B4] text-white py-2.5 rounded-lg font-medium text-sm transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Sponsor a Child
                </NavLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}