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
    { label: t("navbar.home"), route: "/", id: "home" },
    { label: t("navbar.about"), route: "/", scrollToId: "about", id: "about" },
    { label: t("navbar.services"), route: "/", scrollToId: "services", id: "services" },
    { label: t("navbar.faq"), route: "/faq", id: "faq" },
    { label: t("navbar.contact"), route: "/", scrollToId: "contact", id: "contact" },
    { label: t("navbar.plans"), route: "/wifiplans", id: "wifiplans" },
    { label: t("navbar.technicians"), route: "/technicians", id: "technicians" },
    { label: t("navbar.articles"), route: "/articles", id: "articles" },
  ], [t]);

  const handleScrollLink = (targetId) => {
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const NavItem = ({ item }) => {
    const commonClasses = "relative pb-1.5 px-1 font-medium transition-all duration-300 group flex items-center justify-center";

    if (item.scrollToId) {
      return (
        <motion.button
          onClick={() => {
            if (location.pathname !== "/") {
              navigate("/");
              setTimeout(() => handleScrollLink(item.scrollToId), 100);
            } else {
              handleScrollLink(item.scrollToId);
            }
            setIsOpen(false);
          }}
          className={`${commonClasses} ${
            currentPath === item.id
              ? "text-purple-600 dark:text-purple-400"
              : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {item.label}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 transition-all duration-300 group-hover:w-full" />
        </motion.button>
      );
    }

    return (
      <NavLink
        to={item.route}
        className={({ isActive }) =>
          `${commonClasses} ${
            isActive || (item.id === "home" && currentPath === "home")
              ? "text-purple-600 dark:text-purple-400"
              : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
          }`
        }
        onClick={() => setIsOpen(false)}
      >
        {({ isActive }) => (
          <motion.div className="relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {item.label}
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 dark:bg-purple-400 transition-transform duration-300 ${
                isActive || (item.id === "home" && currentPath === "home")
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-100"
              }`}
            />
          </motion.div>
        )}
      </NavLink>
    );
  };

  const ThemeToggle = () => (
    <motion.button
      onClick={toggleDarkMode}
      className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      aria-label={darkMode ? t("navbar.light") : t("navbar.dark")}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600 dark:text-gray-300" />}
    </motion.button>
  );

  const LanguageToggle = () => (
    <motion.button
      onClick={toggleLanguage}
      className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      aria-label={t("navbar.toggle_language")}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Globe size={18} className="text-gray-600 dark:text-gray-300" />
      <span className="font-medium text-gray-700 dark:text-gray-200 text-sm">
        {language.toUpperCase()}
      </span>
    </motion.button>
  );

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
        <NavLink to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight hover:from-blue-500 hover:to-purple-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-lg dark:focus:ring-offset-gray-900">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            KNOXVILLE
          </motion.div>
        </NavLink>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {menuItems.map((item) => (
            <NavItem key={item.id} item={item} />
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <LanguageToggle />
        </div>

        <motion.button
          className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? t("navbar.close_menu") : t("navbar.open_menu")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? <X size={24} className="text-gray-700 dark:text-gray-200" /> : <Menu size={24} className="text-gray-700 dark:text-gray-200" />}
        </motion.button>
      </div>

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
                <NavItem key={item.id} item={item} />
              ))}
              <div className="flex justify-center gap-3 pt-2">
                <ThemeToggle />
                <LanguageToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
