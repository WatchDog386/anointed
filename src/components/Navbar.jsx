import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { throttle } from "lodash-es";
import { useClickOutside } from "../hooks/useClickOutside";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef(null);

  const handleScroll = useCallback(
    throttle(() => setScrolled(window.scrollY > 50), 100),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  useClickOutside(navRef, () => setIsOpen(false));

  const currentPath = location.pathname === "/" ? "home" : location.pathname.slice(1);

  const menuItems = useMemo(() => [
    { label: "Home", route: "/", id: "home" },
    { label: "About us", route: "/about", id: "about" },
    { label: "Services", route: "/services", id: "services" },
    { label: "WIFI Plans", route: "/wifiplans", id: "wifiplans" },
    { 
      label: "Support", 
      id: "support",
      submenu: [
        { label: "FAQs", route: "/faq", id: "faq" },
        { label: "Contact Us", route: "/contact", id: "contact" },
        { label: "Technical Support", route: "/technicians", id: "technicians" },
      ]
    },
    { label: "Resources", route: "/articles", id: "articles" },
  ], []);

  const NavItem = ({ item }) => {
    const commonClasses = "relative pb-1.5 px-1 font-medium transition-all duration-300 group flex items-center justify-center";

    return (
      <div className="relative group">
        {item.submenu ? (
          <>
            <button
              className={`${commonClasses} ${
                item.submenu.some(sub => sub.id === currentPath)
                  ? "text-purple-600"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              <div className="flex items-center gap-1">
                {item.label}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mt-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full" />
            </button>
            
            <div className="absolute left-0 mt-2 w-48 rounded-lg shadow-lg bg-white border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              {item.submenu.map((subItem) => (
                <NavLink
                  key={subItem.id}
                  to={subItem.route}
                  className={({ isActive }) => 
                    `block px-4 py-2 text-sm ${
                      isActive 
                        ? "bg-purple-50 text-purple-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  {subItem.label}
                </NavLink>
              ))}
            </div>
          </>
        ) : (
          <NavLink
            to={item.route}
            className={({ isActive }) =>
              `${commonClasses} ${
                isActive || (item.id === "home" && currentPath === "home")
                  ? "text-purple-600"
                  : "text-gray-700 hover:text-purple-600"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transition-transform duration-300 ${
                    isActive || (item.id === "home" && currentPath === "home")
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </>
            )}
          </NavLink>
        )}
      </div>
    );
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-[999] px-4 py-3 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 shadow-lg backdrop-blur-xl border-b border-gray-200"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <NavLink 
          to="/" 
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
        >
          Knoxville
        </NavLink>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {menuItems.map((item) => (
            <NavItem key={item.id} item={item} />
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              transition: {
                opacity: { duration: 0.2 },
                height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
              }
            }}
            exit={{
              opacity: 0,
              height: 0,
              transition: {
                opacity: { duration: 0.1 },
                height: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
              }
            }}
            className="md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-4 pb-4 border-t border-gray-200 mt-3 pt-4">
              {menuItems.map((item) => (
                <div key={item.id}>
                  {item.submenu ? (
                    <div className="flex flex-col">
                      <button
                        className="flex justify-between items-center w-full px-4 py-2 text-left text-gray-700"
                        onClick={() => navigate(item.submenu[0].route)}
                      >
                        {item.label}
                      </button>
                      <div className="pl-4">
                        {item.submenu.map((subItem) => (
                          <NavLink
                            key={subItem.id}
                            to={subItem.route}
                            className={({ isActive }) =>
                              `block px-4 py-2 text-sm ${
                                isActive
                                  ? "text-purple-600"
                                  : "text-gray-600 hover:text-purple-600"
                              }`
                            }
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <NavLink
                      to={item.route}
                      className={({ isActive }) =>
                        `block px-4 py-2 ${
                          isActive
                            ? "text-purple-600"
                            : "text-gray-700 hover:text-purple-600"
                        }`
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}