import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Sun, Moon, Globe, Menu, X } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { throttle } from "lodash-es";
import { useClickOutside } from "../hooks/useClickOutside";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { darkMode, toggleDarkMode } = useTheme();
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
    { label: t("home"), route: "/", id: "home" },
    { 
      label: t("About us"), route: "/About", id: "About" },
      
    { label: t("knoxville services"), route: "/services", id: "services" },
    { label: t("WIFIplans"), route: "/wifiplans", id: "wifiplans" },
    { 
      label: t("knoxville support"), 
      id: "support",
      submenu: [
        { label: t("FAQs"), route: "/faq", id: "faq" },
        { label: t("lets talk"), route: "/contact", id: "contact" },
        { label: t("need help? message us"), route: "/technicians", id: "technicians" },
      ]
    },
    { label: t("resources"), route: "/articles", id: "articles" },
  ], [t]);

  const NavItem = ({ item }) => {
    const commonClasses = "relative pb-1.5 px-1 font-medium transition-all duration-300 group flex items-center justify-center";

    return (
      <div className="relative group">
        {item.submenu ? (
          <>
            <button
              className={`${commonClasses} ${
                item.submenu.some(sub => sub.id === currentPath)
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
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
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 transition-all duration-300 group-hover:w-full" />
            </button>
            
            <div className="absolute left-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              {item.submenu.map((subItem) => (
                <NavLink
                  key={subItem.id}
                  to={subItem.route}
                  className={({ isActive }) => 
                    `block px-4 py-2 text-sm ${
                      isActive 
                        ? "bg-purple-50 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
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
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 dark:bg-purple-400 transition-transform duration-300 ${
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
          ? "bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur-xl border-b border-gray-200 dark:border-gray-800"
          : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <NavLink 
          to="/" 
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
        >
      
        </NavLink>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {menuItems.map((item) => (
            <NavItem key={item.id} item={item} />
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>
          
          <button
            onClick={toggleLanguage}
            className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
            aria-label="Toggle language"
          >
            <Globe className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            <span className="font-medium text-gray-700 dark:text-gray-200 text-sm">
              {language.toUpperCase()}
            </span>
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-gray-700 dark:text-gray-200" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
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
            <div className="flex flex-col gap-4 pb-4 border-t border-gray-200 dark:border-gray-800 mt-3 pt-4">
              {menuItems.map((item) => (
                <div key={item.id}>
                  {item.submenu ? (
                    <div className="flex flex-col">
                      <button
                        className="flex justify-between items-center w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300"
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
                                  ? "text-purple-600 dark:text-purple-400"
                                  : "text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
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
                            ? "text-purple-600 dark:text-purple-400"
                            : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                        }`
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  )}
                </div>
              ))}
              
              <div className="flex gap-3 pt-2">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {darkMode ? (
                    <Sun className="h-5 w-5 text-yellow-400" />
                  ) : (
                    <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  )}
                </button>
                
                <button
                  onClick={toggleLanguage}
                  className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  <Globe className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  <span className="font-medium text-gray-700 dark:text-gray-200 text-sm">
                    {language.toUpperCase()}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}