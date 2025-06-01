import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaMoon, FaSun } from "react-icons/fa";

export default function Footer() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className={`relative pt-10 px-6 text-sm transition-all duration-500 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Dark mode toggle */}
      <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? (
          <FaSun className="text-yellow-300 hover:scale-110 transition" />
        ) : (
          <FaMoon className="text-blue-500 hover:scale-110 transition" />
        )}
      </div>

      {/* Grid content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">
        {/* About */}
        <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <h4 className="text-2xl font-bold text-blue-600 mb-3">Knoxville Technologies</h4>
          <p>
            Providing reliable fiber internet across Kenya. We connect rural and urban areas with
            affordable, high-speed solutions.
          </p>
        </motion.div>

        {/* Links */}
        <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
          <h4 className="text-xl font-semibold text-green-700 mb-3">Quick Links</h4>
          <ul className="space-y-2">
            {["/", "/about", "/services", "/faq", "/contact"].map((path, i) => (
              <li key={i}>
                <NavLink to={path} className="hover:text-blue-500 transition">
                  {path === "/" ? "Home" : path.replace("/", "").toUpperCase()}
                </NavLink>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
          <h4 className="text-xl font-semibold text-green-700 mb-3">Contact</h4>
          <p>Email: <a href="mailto:support@knoxfill.co.ke" className="text-blue-600 hover:underline">support@knoxville.co.ke</a></p>
          <p>Phone: <a href="tel:+254700000000" className="text-blue-600 hover:underline">+254 726818938</a></p>
          <p>Location: Nairobi, Kenya</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-blue-600 hover:text-green-600 transition"><FaFacebookF /></a>
            <a href="#" className="text-blue-600 hover:text-green-600 transition"><FaTwitter /></a>
            <a href="#" className="text-blue-600 hover:text-green-600 transition"><FaLinkedinIn /></a>
          </div>
        </motion.div>
      </div>

      {/* Wave animation */}
      <div className="overflow-hidden h-16 relative">
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill={darkMode ? "#000" : "#e0f2fe"}
            fillOpacity="1"
            d="M0,96L30,106.7C60,117,120,139,180,133.3C240,128,300,96,360,90.7C420,85,480,107,540,117.3C600,128,660,128,720,122.7C780,117,840,107,900,117.3C960,128,1020,160,1080,181.3C1140,203,1200,213,1260,197.3C1320,181,1380,139,1410,117.3L1440,96L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Bottom Text */}
      <div className={`py-4 text-center border-t ${darkMode ? "border-gray-700 text-white" : "border-gray-300 text-green-700"}`}>
        &copy; {new Date().getFullYear()} Knoxville Technologies. All rights reserved.
      </div>
    </motion.footer>
  );
}
