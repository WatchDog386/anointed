import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Sun, Moon, Globe, Menu, X } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { throttle } from "lodash-es";
import { useClickOutside } from "../hooks/useClickOutside";

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

  const currentPath =
    location.pathname === "/" ? "home" : location.pathname.slice(1);

  const menuItems = useMemo(
    () => [
      { label: t("navbar.home"), route: "/", id: "home" },
      {
        label: t("navbar.about"),
        route: "/",
        scrollToId: "about",
        id: "about",
      },
      {
        label: t("navbar.services"),
        route: "/",
        scrollToId: "services",
        id: "services",
      },
      { label: t("navbar.faq"), route: "/faq", id: "faq" },
      {
        label: t("navbar.contact"),
        route: "/",
        scrollToId: "contact",
        id: "contact",
      },
      { label: t("navbar.plans"), route: "/wifiplans", id: "wifiplans" },
      {
        label: t("navbar.technicians"),
        route: "/technicians",
        id: "technicians",
      },
      { label: t("navbar.articles"), route: "/articles", id: "articles" },
    ],
    [t]
  );

  const handleScrollLink = (targetId) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const NavItem = ({ item }) => {
    const commonClasses =
      "relative pb-1.5 px-1 font-medium transition-colors duration-300 group flex items-center justify-center";

    if (item.scrollToId) {
      return (
        <button
          onClick={() => {
            if (location.pathname !== "/") {
              navigate("/");
              setTimeout(() => handleScrollLink(item.scrollToId), 100);
            } else {
              handleScrollLink(item.scrollToId);
            }
            setIsOpen(false);
          }}
          className={`${commonClasses} text-black dark:text-white hover:text-purple-500`}
        >
          {item.label}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full" />
        </button>
      );
    }

    return (
      <NavLink
        to={item.route}
        className={({ isActive }) =>
          `${commonClasses} ${
            isActive || (item.id === "home" && currentPath === "home")
              ? "text-purple-500 dark:text-purple-400"
              : "text-black dark:text-white hover:text-purple-500"
          }`
        }
        onClick={() => setIsOpen(false)}
      >
        {item.label}
        <span
          className={`absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 transition-transform duration-300 ${
            item.id === "home" && currentPath === "home"
              ? "scale-x-100"
              : "scale-x-0 group-hover:scale-x-100"
          }`}
        />
      </NavLink>
    );
  };

  const ThemeToggle = () => (
    <button
      onClick={toggleDarkMode}
      className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      aria-label={darkMode ? t("navbar.light") : t("navbar.dark")}
    >
      {darkMode ? (
        <Sun size={20} className="text-yellow-400" />
      ) : (
        <Moon size={20} className="text-gray-600 dark:text-gray-300" />
      )}
    </button>
  );

  const LanguageToggle = () => (
    <button
      onClick={toggleLanguage}
      className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      aria-label={t("navbar.toggle_language")}
    >
      <Globe size={18} className="text-gray-600 dark:text-gray-300" />
      <span className="font-medium text-gray-700 dark:text-gray-200 text-sm">
        {language.toUpperCase()}
      </span>
    </button>
  );

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 px-4 py-3 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur-xl border-b border-gray-100 dark:border-gray-800"
          : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <NavLink
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight hover:from-blue-500 hover:to-purple-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-lg dark:focus:ring-offset-gray-900"
        >
          KNOXVILLE
        </NavLink>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {menuItems.map((item) => (
            <NavItem key={item.id} item={item} />
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <LanguageToggle />
        </div>

        <button
          className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? t("navbar.close_menu") : t("navbar.open_menu")}
        >
          {isOpen ? (
            <X size={24} className="text-gray-700 dark:text-gray-200" />
          ) : (
            <Menu size={24} className="text-gray-700 dark:text-gray-200" />
          )}
        </button>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ease-out ${
          isOpen
            ? "max-h-screen opacity-100 mt-4 visible"
            : "max-h-0 opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col gap-5 pb-4 border-t border-gray-100 dark:border-gray-800 mt-3 pt-4">
          {menuItems.map((item) => (
            <NavItem key={item.id} item={item} />
          ))}
          <div className="flex justify-center gap-3">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
