import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function Footer() {
  // Simplified footer links
  const footerLinks = {
    about: [
      { label: "Our Story", route: "/about" },
      { label: "Our Staff", route: "/staff" },
      { label: "Gallery", route: "/gallery" },
    ],
    programs: [
      { label: "Education", route: "/eduprog" },
      { label: "Spiritual Growth", route: "/SpiritualGrowth" },
      { label: "Child Sponsorship", route: "/ChildSponsorship" },
    ]
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="relative pt-8 pb-6 px-4 text-sm bg-[#2b473f] text-white overflow-hidden"
      style={{
        backgroundImage: `url('https://ggcckenya.org/wp-content/uploads/2021/01/GGCC_Map.png')`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right center',
        backgroundSize: 'contain',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Content - 2 columns on mobile, 3 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-6">
          {/* About Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <h3 className="text-lg font-bold text-[#8CA9B4]">About Us</h3>
            <ul className="space-y-1">
              {footerLinks.about.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.route}
                    className="text-gray-300 hover:text-[#8CA9B4] transition-colors duration-200 text-xs md:text-sm"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Programs Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <h3 className="text-lg font-bold text-[#8CA9B4]">Programs</h3>
            <ul className="space-y-1">
              {footerLinks.programs.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.route}
                    className="text-gray-300 hover:text-[#8CA9B4] transition-colors duration-200 text-xs md:text-sm"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA Section - Hidden on mobile, shown on desktop */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="hidden md:block space-y-4"
          >
            <h3 className="text-lg font-bold text-[#8CA9B4]">Get Involved</h3>
            <div className="space-y-3">
              <NavLink
                to="/ChildSponsorship"
                className="inline-block bg-[#932528] hover:bg-[#8CA9B4] text-white font-semibold py-2 px-4 rounded-full transition text-sm"
              >
                Sponsor a Child
              </NavLink>
              <NavLink
                to="/Make-An-Impact"
                className="inline-block border border-[#8CA9B4] hover:bg-[#8CA9B4] hover:text-[#2b473f] text-[#8CA9B4] font-semibold py-2 px-4 rounded-full transition text-sm ml-2"
              >
                Donate
              </NavLink>
            </div>
          </motion.div>
        </div>

        {/* Mobile CTA Section - Visible only on mobile */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="md:hidden text-center space-y-3 mb-6"
        >
          <div className="flex justify-center space-x-3">
            <NavLink
              to="/ChildSponsorship"
              className="bg-[#932528] hover:bg-[#8CA9B4] text-white font-semibold py-2 px-4 rounded-full transition text-sm"
            >
              Sponsor a Child
            </NavLink>
            <NavLink
              to="/Make-An-Impact"
              className="border border-[#8CA9B4] hover:bg-[#8CA9B4] hover:text-[#2b473f] text-[#8CA9B4] font-semibold py-2 px-4 rounded-full transition text-sm"
            >
              Donate
            </NavLink>
          </div>
        </motion.div>

        {/* Contact Info - Single row on mobile, spaced on desktop */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center md:text-left border-t border-[#233A33] pt-4"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0">
            <div className="text-gray-300 text-xs md:text-sm">
              <p>Anointed Vessels Christian School</p>
              <p>Empowering children through faith-based education in Kenya</p>
            </div>
            <div className="text-gray-400 text-xs">
              <p>Contact: info@anointedvessels.org</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar - Simplified */}
      <div className="max-w-7xl mx-auto mt-4 pt-4 border-t border-[#233A33] text-center text-gray-400 text-xs">
        <p>
          © {new Date().getFullYear()} Anointed Vessels Christian School. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
}