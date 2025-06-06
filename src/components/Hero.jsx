import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaFacebookSquare, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { Helmet } from "react-helmet";

const ImageModal = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative bg-white p-4 rounded-md shadow-lg max-w-md w-[90%]"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={image.src} alt={image.alt} className="rounded-md" />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black text-xl font-bold hover:text-red-600"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  const [modalImage, setModalImage] = useState(null);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const floatAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  };

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden bg-white text-gray-900"
      style={{
        backgroundImage: "url('/fibre2.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Helmet>
        <title>Knoxville Internet | Unlimited Home Fibre</title>
        <meta
          name="description"
          content="Knoxville Internet - Reliable and fast fibre internet for your home and business. Explore our packages today."
        />
      </Helmet>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-bl from-black/60 via-black/30 to-transparent z-0" />

      {/* Fixed & visible logo */}
      <div className="fixed top-4 left-4 z-50">
        <motion.img
          initial={{ rotate: -10, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          src="/logo4.webp"
          alt="Knoxville Internet Logo"
          className="w-20 sm:w-24 md:w-28 h-auto object-contain rounded-full border-2 border-blue-800 shadow-lg hover:rotate-6 transition-all duration-300 bg-white"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col justify-center h-full">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="text-center lg:text-left"
          >
            <motion.span
              variants={fadeIn}
              className="inline-block bg-blue-800 text-white px-4 py-1.5 rounded text-xs font-semibold uppercase tracking-widest shadow"
            >
              Fiber Network Solutions
            </motion.span>

            <motion.h1
              variants={fadeIn}
              whileHover={{ scale: 1.03, rotate: -0.5 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight bg-gradient-to-r from-blue-800 via-blue-600 to-blue-200 bg-clip-text text-transparent"
            >
              Knoxville Internet
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="mt-4 text-base sm:text-lg md:text-xl text-green-600 font-medium"
            >
              Unlimited internet for your home with Knoxville Internet – Home of Fibre Internet
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={fadeIn}
              className="mt-6 flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
            >
              <button
                onClick={() => navigate("/wifiplans")}
                className="bg-gradient-to-r from-blue-800 to-blue-500 hover:from-blue-900 hover:to-blue-600 text-white px-6 py-3 rounded-sm font-medium shadow-md"
              >
                🚀 Get Started
              </button>
              <button
                onClick={() => navigate("/coverage")}
                className="border border-blue-800 text-blue-900 bg-blue-100 hover:bg-blue-200 px-6 py-3 rounded-sm font-medium shadow-sm"
              >
                🗺️ View Coverage
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeIn}
              className="mt-10 grid grid-cols-3 gap-3 max-w-sm mx-auto lg:mx-0"
            >
              {[
                { label: "Speed", value: "1.2Gbps" },
                { label: "Support", value: "24/7" },
                { label: "Uptime", value: "99.9%" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="text-center p-4 bg-blue-100 rounded-lg shadow-md border border-blue-800 transition hover:scale-105"
                >
                  <div className="text-xl font-bold text-blue-800">{stat.value}</div>
                  <div className="text-xs text-blue-900 mt-1 uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social links */}
            <motion.div variants={fadeIn} className="mt-10">
              <p className="text-gray-900 text-lg font-semibold uppercase tracking-wide mb-4">Follow Us</p>
              <div className="flex gap-6 justify-center lg:justify-start">
                {[
                  {
                    icon: <FaFacebookSquare className="text-blue-600" />,
                    link: "https://www.facebook.com/share/1E5h7zsjFR/",
                  },
                  {
                    icon: <FaTiktok className="text-black" />,
                    link: "https://www.tiktok.com/@knoxville.home.fi?_t=ZM-8wp8uGRB36k&_r=1",
                  },
                  {
                    icon: <FaWhatsapp className="text-green-600" />,
                    link: "https://wa.me/254726818938",
                  },
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-4 rounded-full border-4 border-blue-800 shadow-lg hover:scale-110 transition"
                  >
                    <div className="text-3xl">{item.icon}</div>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visuals */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="relative flex items-center justify-center"
          >
            <motion.img
              src="/worker.webp"
              alt="Worker"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-[65vw] sm:w-[50vw] md:w-[36vw] max-w-md rounded-lg shadow-xl border-2 border-blue-800 hover:border-blue-900"
              whileHover={{ scale: 1.02 }}
            />
            {["/install.webp", "/fibre3.webp", "/image.webp"].map((img, i) => (
              <motion.img
                key={i}
                src={img}
                alt={`Floating ${i}`}
                onClick={() => setModalImage({ src: img, alt: `Image ${i}` })}
                className="absolute rounded-lg shadow-lg border-2 border-blue-800 cursor-pointer"
                style={{
                  width: `${28 - i * 3}vw`,
                  top: `${60 + i * 15}%`,
                  left: `${60 + i * 5}%`,
                  transform: `translate(-50%, -50%) rotate(${i % 2 === 0 ? -8 + i * 3 : 5}deg)`,
                  zIndex: 2 + i,
                }}
                animate={floatAnimation}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="overflow-hidden h-40 relative">
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#1e3a8a"
            fillOpacity="1"
            d="M0,160L40,149.3C80,139,160,117,240,128C320,139,400,181,480,181.3C560,181,640,139,720,128C800,117,880,139,960,144C1040,149,1120,139,1200,128C1280,117,1360,107,1400,101.3L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Image Modal */}
      <ImageModal image={modalImage} onClose={() => setModalImage(null)} />
    </section>
  );
};

export default Hero;
