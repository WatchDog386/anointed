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
      className="relative pt-8 pb-6 px-4 text-sm bg-[#1a2f28] text-white overflow-hidden"
    >
      {/* Unique Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {/* African Continent Silhouette with Gradient */}
        <div 
          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 h-3/4"
          style={{
            background: `radial-gradient(circle at 70% 50%, 
              rgba(140, 169, 180, 0.3) 0%,
              rgba(43, 71, 63, 0.2) 30%,
              rgba(26, 47, 40, 0.1) 50%,
              transparent 70%
            )`,
            maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cpath d='M400,100 Q450,80 500,120 Q550,180 520,250 Q480,320 450,350 Q420,380 380,400 Q340,420 300,410 Q260,400 240,360 Q220,320 230,280 Q240,240 270,210 Q300,180 330,160 Q360,140 400,140 Z' fill='black'/%3E%3C/svg%3E")`,
            maskRepeat: 'no-repeat',
            maskPosition: 'right center',
            maskSize: 'contain',
            WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cpath d='M400,100 Q450,80 500,120 Q550,180 520,250 Q480,320 450,350 Q420,380 380,400 Q340,420 300,410 Q260,400 240,360 Q220,320 230,280 Q240,240 270,210 Q300,180 330,160 Q360,140 400,140 Z' fill='black'/%3E%3C/svg%3E")`,
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'right center',
            WebkitMaskSize: 'contain'
          }}
        />
        
        {/* Geometric Pattern Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(30deg, rgba(140, 169, 180, 0.1) 12%, transparent 12.5%, transparent 87%, rgba(140, 169, 180, 0.1) 87.5%, rgba(140, 169, 180, 0.1)),
              linear-gradient(150deg, rgba(140, 169, 180, 0.1) 12%, transparent 12.5%, transparent 87%, rgba(140, 169, 180, 0.1) 87.5%, rgba(140, 169, 180, 0.1)),
              linear-gradient(30deg, rgba(140, 169, 180, 0.1) 12%, transparent 12.5%, transparent 87%, rgba(140, 169, 180, 0.1) 87.5%, rgba(140, 169, 180, 0.1)),
              linear-gradient(150deg, rgba(140, 169, 180, 0.1) 12%, transparent 12.5%, transparent 87%, rgba(140, 169, 180, 0.1) 87.5%, rgba(140, 169, 180, 0.1)),
              linear-gradient(60deg, rgba(140, 169, 180, 0.1) 25%, transparent 25.5%, transparent 75%, rgba(140, 169, 180, 0.1) 75%, rgba(140, 169, 180, 0.1)),
              linear-gradient(60deg, rgba(140, 169, 180, 0.1) 25%, transparent 25.5%, transparent 75%, rgba(140, 169, 180, 0.1) 75%, rgba(140, 169, 180, 0.1))
            `,
            backgroundSize: '80px 140px',
            backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px'
          }}
        />
        
        {/* Floating Elements */}
        <div className="absolute right-20 top-1/4 w-8 h-8 rounded-full bg-[#8CA9B4] opacity-10 animate-pulse"></div>
        <div className="absolute right-40 bottom-1/3 w-12 h-12 rounded-full bg-[#932528] opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute right-60 top-1/3 w-6 h-6 rounded-full bg-[#8CA9B4] opacity-15 animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full" style={{opacity: 0.05}}>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8CA9B4" />
              <stop offset="100%" stopColor="#932528" />
            </linearGradient>
          </defs>
          <path
            d="M100,400 Q300,350 500,380 Q700,400 750,300"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M50,500 Q250,450 450,480 Q650,500 700,400"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
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
                    <p className="text-gray-300 text-xs">PO Box 403019<br />Mbita, Mfangano</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#8CA9B4] w-6 h-6 rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                    <i className="fas fa-building text-white text-xs"></i>
                  </div>
                  <div>
                    <h5 className="text-white text-sm font-medium">Office Address</h5>
                    <p className="text-gray-300 text-xs">Mbita<br />Mfangano, Along Mfangano Ringroad, Kaswanga- Anointed Vessels Christian School</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#8CA9B4] w-6 h-6 rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                    <i className="fas fa-phone-alt text-white text-xs"></i>
                  </div>
                  <div>
                    <h5 className="text-white text-sm font-medium">Call Us</h5>
                    <p className="text-gray-300 text-xs">(785) 517-1077</p>
                    <p className="text-gray-300 text-xs">(+254) 708-512-397</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#8CA9B4] w-6 h-6 rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                    <i className="fas fa-envelope text-white text-xs"></i>
                  </div>
                  <div>
                    <h5 className="text-white text-sm font-medium">Email Us</h5>
                    <a href="mailto:carterjimmy2017@gmail.com" 
                      className="text-gray-300 hover:text-[#8CA9B4] transition-colors text-xs" >carterjimmy2017@gmail.com</a>
                      <h5> OR </h5>
                    <a href="mailto:info@anointedvessels.org" 
                      className="text-gray-300 hover:text-[#8CA9B4] transition-colors text-xs" >info@anointedvessels.org </a>




                  </div>
                </div>
              </div>
              
              {/* Social Icons */}
              <div className="flex space-x-2 pt-2">
                <a href="https://www.facebook.com/profile.php?id=61580364328064" className="social-link">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/in/anointed-vessels-christian-school-43b08327a/" className="social-link">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://www.youtube.com/shorts/iRdsUJB1-2s" className="social-link" target="_blank" rel="noopener noreferrer">
  <i className="fab fa-youtube"></i>
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
                  className="inline-block border border-[#8CA9B4] hover:bg-[#8CA9B4] hover:text-[#1a2f28] text-[#8CA9B4] font-semibold py-2 px-4 rounded-full transition text-sm w-full text-center"
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
              className="border border-[#8CA9B4] hover:bg-[#8CA9B4] hover:text-[#1a2f28] text-[#8CA9B4] font-semibold py-2 px-4 rounded-full transition text-sm"
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
          className="text-center md:text-left border-t border-[#2a453b] pt-4"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0">
            <div className="text-gray-300 text-xs md:text-sm">
              <p>Anointed Vessels Christian School</p>
              <p>Empowering children through faith-based education in Kenya</p>
            </div>
            <div className="text-gray-400 text-xs">
              <p>Contact: <a href="mailto:info@anointedvessels.org" className="hover:text-[#8CA9B4] transition-colors">info@anointedvessels.org</a></p>
              <p>Email: <a href="mailto:carterjimmy2017@gmail.com" className="hover:text-[#8CA9B4] transition-colors">carterjimmy2017@gmail.com</a></p>
              
              <p>Phone: (785) 517-1077 | (+254) 708-512-397</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar - Simplified */}
      <div className="max-w-7xl mx-auto mt-4 pt-4 border-t border-[#2a453b] text-center text-gray-400 text-xs relative z-10">
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
        
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        
        .animate-pulse {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </motion.footer>
  );
}