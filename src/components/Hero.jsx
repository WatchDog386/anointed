import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

import worker from "../assets/worker.jpg";
import install from "../assets/install.jpg";
import homein from "../assets/home in.jpg";
import deep from "../assets/deep.jpg";
import logo from "../assets/logo.jpg";

// Modal Component
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
        className="relative bg-slate-800 p-4 rounded-md shadow-lg max-w-md w-[90%]"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={image.src} alt={image.alt} className="rounded-md" />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-xl font-bold hover:text-teal-400"
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
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
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
    <section className="relative min-h-screen w-full bg-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 z-0">
        <div
          className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-20"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 20%, 60% 100%, 0 100%)",
          }}
        />
      </div>

      {/* Logo */}
      <div className="absolute top-6 left-6 z-20">
        <motion.img
          initial={{ rotate: -10, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          src={logo}
          alt="Company Logo"
          className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-sm border-2 border-white/20 shadow-lg hover:rotate-6 transition-all duration-300 hover:border-teal-400"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 w-full items-center">
          {/* Text Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="order-last lg:order-first"
          >
            <motion.div variants={fadeIn} className="mb-5">
              <span className="inline-block bg-teal-500/10 text-teal-400 px-4 py-1.5 rounded-sm text-xs font-semibold tracking-widest uppercase border border-teal-400/30">
                Fiber Network Solutions
              </span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              whileHover={{ scale: 1.03, rotate: -0.5 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-4 text-white"
            >
              Knoxville Technologies
            </motion.h1>

            <motion.div
              variants={fadeIn}
              whileHover={{ scale: 1.01 }}
              className="text-base sm:text-xl font-medium text-slate-300 mb-6 leading-relaxed transition-all duration-300"
            >
              <Typewriter
                words={[
                  "Unlimited internet for your home with Knoxville Technologies – Home of Fibre Internet",
                ]}
                loop={false}
                cursor
                cursorStyle="|"
                typeSpeed={50}
                deleteSpeed={30}
                delaySpeed={1000}
              />
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-3"
            >
              <motion.button
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 20px -5px rgba(16, 185, 129, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                onClick={() => navigate("/wifiplans")}
              >
                <span>🚀</span> Get Started
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 20px -5px rgba(255, 255, 255, 0.1)",
                }}
                whileTap={{ scale: 0.98 }}
                className="border border-slate-500 text-slate-200 hover:bg-slate-800/50 px-6 py-3 rounded-sm font-medium shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2"
                onClick={() => navigate("/coverage")}
              >
                <span>🗺️</span> Coverage Map
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeIn}
              className="mt-10 grid grid-cols-3 gap-3"
            >
              {[
                { label: "Speed", value: "1.2Gbps" },
                { label: "Support", value: "24/7" },
                { label: "Uptime", value: "99.9%" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 0.2 + idx * 0.1,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
                  }}
                  className="relative text-center p-4 bg-slate-800/50 backdrop-blur-sm rounded-sm shadow-md border border-slate-700 transition-all overflow-hidden hover:border-teal-400/50"
                >
                  <div className="relative z-10 text-xl font-bold text-teal-400">
                    {stat.value}
                  </div>
                  <div className="relative z-10 text-xs text-slate-400 mt-1 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="relative flex items-center justify-center h-full"
          >
            <motion.img
              src={worker}
              alt="Worker"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: {
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                },
              }}
              className="w-[55vw] sm:w-[40vw] md:w-[32vw] max-w-md rounded-lg shadow-xl border-2 border-white/20 hover:border-teal-400/50"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.3)",
              }}
            />

            {[install, homein, deep].map((img, i) => {
              const isModal = i >= 1; // only last two
              return (
                <motion.img
                  key={i}
                  src={img}
                  alt={`Floating ${i}`}
                  onClick={isModal ? () => setModalImage({ src: img, alt: `Image ${i}` }) : undefined}
                  className={`absolute rounded-sm shadow-lg border-2 border-white/20 ${isModal ? "cursor-pointer" : "pointer-events-none"}`}
                  style={{
                    width: `${28 - i * 3}vw`,
                    top: `${60 + i * 15}%`,
                    left: `${60 + i * 5}%`,
                    transform: `translate(-50%, -50%) rotate(${i % 2 === 0 ? -8 + i * 3 : 5}deg)`,
                    zIndex: 2 + i,
                  }}
                  animate={{ ...floatAnimation }}
                />
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <ImageModal image={modalImage} onClose={() => setModalImage(null)} />
    </section>
  );
};

export default Hero;
