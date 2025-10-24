import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [showBalloons, setShowBalloons] = useState(false);
  const navigate = useNavigate();
  
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
      { label: "Community Outreach", route: "/CommunityOutreach" },
      { label: "Health & Wellness", route: "/HealthWellness" },
    ]
  };

  // Show balloons on component mount
  useEffect(() => {
    setShowBalloons(true);
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
    setEmail("");
    alert("Thank you for subscribing to our newsletter!");
  };

  const handleSponsorClick = () => {
    navigate("/ChildSponsorship");
  };

  // Enhanced balloon data with gradient colors and random properties
  const balloons = [
    { 
      id: 1, 
      colors: ["#8CA9B4", "#6B8A99", "#A8C6D4"],
      delay: 0, 
      position: { x: "10%", y: "20%" },
      size: "w-10 h-12",
      duration: 15,
      message: "PP2"
    },
    { 
      id: 2, 
      colors: ["#932528", "#B83235", "#FF6B6B"],
      delay: 2, 
      position: { x: "25%", y: "60%" },
      size: "w-12 h-14",
      duration: 18,
      message: "2025"
    },
    { 
      id: 3, 
      colors: ["#2a453b", "#3A6557", "#4A8A72"],
      delay: 4, 
      position: { x: "40%", y: "40%" },
      size: "w-9 h-11",
      duration: 16,
      message: "Grade 3"
    },
    { 
      id: 4, 
      colors: ["#8CA9B4", "#A8C6D4", "#6B8A99"],
      delay: 6, 
      position: { x: "60%", y: "30%" },
      size: "w-11 h-13",
      duration: 17,
      message: "Congrats!"
    },
    { 
      id: 5, 
      colors: ["#932528", "#FF6B6B", "#B83235"],
      delay: 8, 
      position: { x: "75%", y: "50%" },
      size: "w-10 h-12",
      duration: 14,
      message: "Well Done!"
    },
    { 
      id: 6, 
      colors: ["#2a453b", "#4A8A72", "#3A6557"],
      delay: 10, 
      position: { x: "90%", y: "70%" },
      size: "w-12 h-14",
      duration: 19,
      message: "Proud!"
    },
    { 
      id: 7, 
      colors: ["#8CA9B4", "#6B8A99", "#A8C6D4"],
      delay: 12, 
      position: { x: "15%", y: "80%" },
      size: "w-9 h-11",
      duration: 16,
      message: "2025"
    },
    { 
      id: 8, 
      colors: ["#932528", "#B83235", "#FF6B6B"],
      delay: 14, 
      position: { x: "85%", y: "25%" },
      size: "w-11 h-13",
      duration: 15,
      message: "PP2"
    }
  ];

  // Generate random movement path
  const generateRandomPath = (startX, startY) => {
    const points = [];
    const numPoints = 8;
    
    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: startX + (Math.random() * 60 - 30) + "%",
        y: startY + (Math.random() * 40 - 20) + "%",
        scale: 0.8 + Math.random() * 0.4
      });
    }
    
    // Return to near start position
    points.push({
      x: startX + (Math.random() * 20 - 10) + "%",
      y: startY + (Math.random() * 20 - 10) + "%",
      scale: 0.8 + Math.random() * 0.4
    });
    
    return points;
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="relative pt-8 pb-6 px-4 text-sm bg-[#1a2f28] text-white overflow-hidden"
    >
      {/* Enhanced Animated Balloons */}
      {showBalloons && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
          {balloons.map((balloon) => {
            const path = generateRandomPath(
              parseInt(balloon.position.x),
              parseInt(balloon.position.y)
            );
            
            return (
              <motion.div
                key={balloon.id}
                className={`absolute ${balloon.size} rounded-full flex items-center justify-center`}
                style={{
                  left: balloon.position.x,
                  top: balloon.position.y,
                }}
                animate={{
                  x: path.map(p => p.x),
                  y: path.map(p => p.y),
                  scale: path.map(p => p.scale),
                  rotate: [0, 5, -5, 3, -3, 0],
                }}
                transition={{
                  duration: balloon.duration,
                  delay: balloon.delay,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  times: path.map((_, i) => i / (path.length - 1)),
                }}
              >
                {/* Color-changing balloon with gradient */}
                <motion.div 
                  className="w-full h-full rounded-full relative shadow-lg"
                  animate={{
                    background: [
                      `radial-gradient(circle at 30% 30%, ${balloon.colors[0]} 0%, ${balloon.colors[1]} 70%, ${balloon.colors[2]} 100%)`,
                      `radial-gradient(circle at 70% 30%, ${balloon.colors[1]} 0%, ${balloon.colors[2]} 70%, ${balloon.colors[0]} 100%)`,
                      `radial-gradient(circle at 30% 70%, ${balloon.colors[2]} 0%, ${balloon.colors[0]} 70%, ${balloon.colors[1]} 100%)`,
                      `radial-gradient(circle at 70% 70%, ${balloon.colors[0]} 0%, ${balloon.colors[1]} 70%, ${balloon.colors[2]} 100%)`,
                    ]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                >
                  {/* Balloon shine effect */}
                  <motion.div 
                    className="absolute top-3 left-3 w-3 h-3 rounded-full bg-white opacity-40"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Balloon string with subtle movement */}
                  <motion.div 
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-gray-600 to-transparent"
                    animate={{
                      rotate: [-2, 2, -2],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
                
                {/* Floating message tag */}
                <motion.div
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 text-[#1a2f28] px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap shadow-lg border border-white/20"
                  animate={{
                    y: [0, -5, 0],
                    opacity: [0, 1, 1, 0],
                    scale: [0.8, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    delay: balloon.delay + 2,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 5 + 3
                  }}
                >
                  {balloon.message}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Enhanced Celebration Banner */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 15,
          delay: 0.5 
        }}
        className="relative bg-gradient-to-r from-[#8CA9B4] via-[#932528] to-[#2a453b] rounded-2xl p-6 mb-8 mx-auto max-w-2xl text-center shadow-2xl border border-white/10 z-30 backdrop-blur-sm"
      >
        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#8CA9B4] via-[#932528] to-[#2a453b] opacity-75"
          animate={{
            background: [
              "linear-gradient(45deg, #8CA9B4, #932528, #2a453b)",
              "linear-gradient(135deg, #2a453b, #8CA9B4, #932528)",
              "linear-gradient(225deg, #932528, #2a453b, #8CA9B4)",
              "linear-gradient(315deg, #8CA9B4, #932528, #2a453b)",
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            zIndex: -1,
            filter: "blur(8px)",
          }}
        />
        
        <div className="relative z-10">
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block mb-3"
          >
            <span className="text-2xl">🎓</span>
          </motion.div>
          
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 drop-shadow-lg">
            Congratulations Class of 2025!
          </h3>
          <p className="text-white/95 text-base md:text-lg font-medium">
            To our PP2 and Grade 3 students on your promotion to the next class. 
            <span className="block mt-1 text-[#8CA9B4] font-semibold">
              We are proud of you!
            </span>
          </p>
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-sm"
                style={{
                  left: `${(i * 8) % 100}%`,
                  top: `${20 + (i * 6) % 60}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, Math.random() * 10 - 5, 0],
                  rotate: [0, 180, 360],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
              >
                {["🎉", "✨", "🌟", "⭐"][i % 4]}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Rest of your existing footer code remains the same */}
      <button
        onClick={handleSponsorClick}
        className="fixed bottom-8 right-8 z-50 bg-transparent border-2 border-blue-600 text-blue-600 font-semibold py-3 px-5 rounded-full shadow-md hover:shadow-blue-500/30 transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/40 backdrop-blur-sm"
        aria-label="Empower a Child, Change a Nation"
      >
        Empower a Child, Change a Nation
      </button>

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
        
        {/* Rest of your existing background elements... */}
        <div className="absolute right-20 top-1/4 w-8 h-8 rounded-full bg-[#8CA9B4] opacity-10 animate-pulse"></div>
        <div className="absolute right-40 bottom-1/3 w-12 h-12 rounded-full bg-[#932528] opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute right-60 top-1/3 w-6 h-6 rounded-full bg-[#8CA9B4] opacity-15 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Your existing footer content structure remains exactly the same */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* All your existing footer sections remain unchanged */}
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
                    <p className="text-gray-300 text-xs">PO Box 3-40319<br />Mbita, Mfangano</p>
                  </div>
                </div>
                
                {/* Rest of contact info... */}
              </div>
              
              {/* Social Icons */}
              <div className="flex space-x-2 pt-2">
                {/* Your social icons... */}
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
            {/* Get Involved Section */}
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

        {/* Mobile Get Involved Section */}
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

        {/* Contact Info */}
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

      {/* Bottom Bar */}
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

        /* Brand hover colors */
        .social-link:hover .fa-facebook-f {
          color: #1877F2;
        }
        .social-link:hover .fa-twitter {
          color: #1DA1F2;
        }
        .social-link:hover .fa-instagram {
          color: #E1306C;
        }
        .social-link:hover .fa-linkedin-in {
          color: #0A66C2;
        }
        .social-link:hover .fa-youtube {
          color: #FF0000;
        }
        .social-link:hover .fa-tiktok {
          color: #000000;
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