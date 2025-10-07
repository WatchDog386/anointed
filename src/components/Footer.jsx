import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function Footer() {
  const [email, setEmail] = useState("");
  
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

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
    alert("Thank you for subscribing to our newsletter!");
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
        {/* Main Content - 3 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-6">
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

          {/* Connect Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-[#8CA9B4]">Connect</h3>
            <div className="space-y-3">
              {/* Contact Information */}
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="bg-[#8CA9B4] w-6 h-6 rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                    <i className="fas fa-map-marker-alt text-white text-xs"></i>
                  </div>
                  <div>
                    <h5 className="text-white text-sm font-medium">Mailing Address</h5>
                    <p className="text-gray-300 text-xs">PO Box 713<br />Matthews, NC 28106</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#8CA9B4] w-6 h-6 rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                    <i className="fas fa-building text-white text-xs"></i>
                  </div>
                  <div>
                    <h5 className="text-white text-sm font-medium">Office Address</h5>
                    <p className="text-gray-300 text-xs">10800 Independence Pointe Parkway<br />Suite C, Matthews, NC 28105</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#8CA9B4] w-6 h-6 rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                    <i className="fas fa-phone-alt text-white text-xs"></i>
                  </div>
                  <div>
                    <h5 className="text-white text-sm font-medium">Call Us</h5>
                    <p className="text-gray-300 text-xs">(704) 844-1020</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#8CA9B4] w-6 h-6 rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                    <i className="fas fa-envelope text-white text-xs"></i>
                  </div>
                  <div>
                    <h5 className="text-white text-sm font-medium">Email Us</h5>
                    <a 
                      href="mailto:benardmusereke@gmail.com" 
                      className="text-gray-300 hover:text-[#8CA9B4] transition-colors text-xs"
                    >
                      benardmusereke@gmail.com
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Social Icons */}
              <div className="flex space-x-2 pt-2">
                <a href="#" className="social-link">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Newsletter & Get Involved Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-[#8CA9B4]">Stay Updated</h3>
            
            {/* Newsletter Form */}
            <div className="space-y-3">
              <p className="text-gray-300 text-sm">Subscribe to our newsletter for updates</p>
              <form onSubmit={handleNewsletterSubmit} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 px-3 py-2 bg-[#233A33] text-white placeholder-gray-400 rounded-l text-sm focus:outline-none focus:ring-1 focus:ring-[#8CA9B4]"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#8CA9B4] hover:bg-[#7a98a3] text-white px-3 py-2 rounded-r text-sm transition-colors"
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
            
            {/* Get Involved Section - Hidden on mobile, shown on desktop */}
            <div className="hidden md:block space-y-3 pt-2">
              <h3 className="text-lg font-bold text-[#8CA9B4]">Get Involved</h3>
              <div className="space-y-2">
                <NavLink
                  to="/ChildSponsorship"
                  className="inline-block bg-[#932528] hover:bg-[#8CA9B4] text-white font-semibold py-2 px-4 rounded-full transition text-sm w-full text-center"
                >
                  Sponsor a Child
                </NavLink>
                <NavLink
                  to="/Make-An-Impact"
                  className="inline-block border border-[#8CA9B4] hover:bg-[#8CA9B4] hover:text-[#2b473f] text-[#8CA9B4] font-semibold py-2 px-4 rounded-full transition text-sm w-full text-center"
                >
                  Donate
                </NavLink>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile Get Involved Section - Visible only on mobile */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="md:hidden text-center space-y-3 mb-6"
        >
          <h3 className="text-lg font-bold text-[#8CA9B4]">Get Involved</h3>
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
          transition={{ delay: 0.7 }}
          className="text-center md:text-left border-t border-[#233A33] pt-4"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0">
            <div className="text-gray-300 text-xs md:text-sm">
              <p>Anointed Vessels Christian School</p>
              <p>Empowering children through faith-based education in Kenya</p>
            </div>
            <div className="text-gray-400 text-xs">
              <p>Contact: <a href="mailto:info@anointedvessels.org" className="hover:text-[#8CA9B4] transition-colors">info@anointedvessels.org</a></p>
              <p>Email: <a href="mailto:benardmusereke@gmail.com" className="hover:text-[#8CA9B4] transition-colors">benardmusereke@gmail.com</a></p>
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

      {/* Add Font Awesome CSS for icons */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      
      {/* Custom styles for social links */}
      <style jsx>{`
        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.1);
          color: #fff;
          transition: all 0.3s ease;
        }
        
        .social-link:hover {
          background-color: #8CA9B4;
          transform: translateY(-2px);
        }
      `}</style>
    </motion.footer>
  );
}