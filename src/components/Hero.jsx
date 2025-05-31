import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

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
        className="relative bg-blue-900 p-4 rounded-md shadow-lg max-w-md w-[90%]"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={image.src} alt={image.alt} className="rounded-md" />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-xl font-bold hover:text-blue-900"
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
  const backgroundImages = ["/fibre.jpg", "/fibre2.jpg", "/fibre3.jpg"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, [isHovered]);

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
      className="relative min-h-screen w-full text-white overflow-hidden bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
          filter: "brightness(50%)",
        }}
      />

      <div className="absolute top-6 left-6 z-20">
        <motion.img
          initial={{ rotate: -10, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          src="/logo4.jpg"
          alt="Company Logo"
          className="w-28 h-auto object-contain rounded-full border-2 border-blue-800 shadow-lg hover:rotate-6 transition-all duration-300 hover:border-blue-900"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 w-full items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="order-last lg:order-first"
          >
            <motion.div variants={fadeIn} className="mb-5">
              <span className="inline-block bg-blue-800 text-white px-4 py-1.5 rounded-sm text-xs font-semibold tracking-widest uppercase shadow-md">
                Fiber Network Solutions
              </span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              whileHover={{ scale: 1.03, rotate: -0.5 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-4 bg-gradient-to-r from-blue-800 via-blue-600 to-blue-200 bg-clip-text text-transparent"
            >
              Knoxville Technologies
            </motion.h1>

            <motion.div
              variants={fadeIn}
              whileHover={{ scale: 1.01 }}
              className="text-base sm:text-xl font-medium text-green-600 mb-6 leading-relaxed transition-all duration-300"
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

            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-3">
              <motion.button
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 20px -5px rgba(59,130,246, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-blue-800 to-blue-500 hover:from-blue-900 hover:to-blue-600 text-white px-6 py-3 rounded-sm font-medium shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => navigate("/wifiplans")}
              >
                🚀 Get Started
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 20px -5px rgba(59,130,246,0.2)",
                }}
                whileTap={{ scale: 0.98 }}
                className="border border-blue-800 text-blue-900 bg-blue-100 hover:bg-blue-200 px-6 py-3 rounded-sm font-medium shadow-sm hover:shadow-md"
                onClick={() => navigate("/coverage")}
              >
                🗺️ View Coverage
              </motion.button>
            </motion.div>

            <motion.div variants={fadeIn} className="mt-10 grid grid-cols-3 gap-3">
              {[{ label: "Speed", value: "1.2Gbps" }, { label: "Support", value: "24/7" }, { label: "Uptime", value: "99.9%" }].map(
                (stat, idx) => (
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
                      boxShadow: "0 10px 25px -5px rgba(59,130,246,0.3)",
                    }}
                    className="relative text-center p-4 bg-blue-100 backdrop-blur-sm rounded-lg shadow-md border border-blue-800 transition-all overflow-hidden"
                  >
                    <div className="relative z-10 text-xl font-bold text-blue-800">
                      {stat.value}
                    </div>
                    <div className="relative z-10 text-xs text-blue-900 mt-1 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </motion.div>
                )
              )}
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            className="relative flex items-center justify-center h-full"
          >
            <motion.img
              src="/worker.jpg"
              alt="Worker"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              }}
              className="w-[55vw] sm:w-[40vw] md:w-[32vw] max-w-md rounded-lg shadow-xl border-2 border-blue-800 hover:border-blue-900"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 40px -10px rgba(59,130,246,0.3)",
              }}
            />

            {["/install.jpg", "/internet1.jpg", "/image.jpg"].map((img, i) => {
              const isModal = i >= 1;
              return (
                <motion.img
                  key={i}
                  src={img}
                  alt={`Floating ${i}`}
                  onClick={isModal ? () => setModalImage({ src: img, alt: `Image ${i}` }) : undefined}
                  className={`absolute rounded-lg shadow-lg border-2 border-blue-800 ${isModal ? "cursor-pointer" : "pointer-events-none"}`}
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

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
        {backgroundImages.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full border-2 ${
              currentImageIndex === idx ? "bg-blue-800 border-blue-800" : "bg-white/30 border-white"
            }`}
            onClick={() => setCurrentImageIndex(idx)}
          />
        ))}
      </div>

      <ImageModal image={modalImage} onClose={() => setModalImage(null)} />
    </section>
  );
};

export default Hero;
