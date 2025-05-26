import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ✅ Updated image imports
import worker from "../assets/worker.jpg";
import install from "../assets/install.jpg";
import homein from "../assets/home in.jpg";
import deep from "../assets/deep.jpg";
import logo from "../assets/logo.jpg"; // ✅ Updated logo

const Hero = () => {
  const navigate = useNavigate();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <section className="relative min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-white overflow-hidden">
      {/* ✅ Logo placed at top-left corner */}
      <div className="absolute top-6 left-6 z-20">
        <img
          src={logo}
          alt="Company Logo"
          className="w-20 h-20 object-contain rounded-full border-4 border-white shadow-lg"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 w-full items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="order-last lg:order-first"
          >
            <motion.div variants={fadeIn} className="mb-8">
              <span className="inline-block bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                Fiber Network Solutions
              </span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                Knoxville
              </span>{" "}
              Technologies
              <span className="block text-xl sm:text-2xl text-gray-300 font-light mt-4">
                Empowering Homesteads with Ultra-Fast Fiber Optics
              </span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-lg text-gray-300 mb-8 max-w-2xl"
            >
              Deliver next-generation internet connectivity to your property
              with our enterprise-grade fiber infrastructure and smart home
              solutions.
            </motion.p>

            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium transition duration-300"
                onClick={() => navigate("/wifiplans")}
              >
                Get Started
              </button>
              <button
                className="border-2 border-blue-500 text-blue-500 hover:bg-blue-100 px-8 py-4 rounded-lg font-medium transition duration-300"
                onClick={() => navigate("/coverage")}
              >
                View Coverage Map
              </button>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="mt-12 grid grid-cols-3 gap-4"
            >
              <div className="text-center p-4 bg-white/10 backdrop-blur rounded-xl shadow">
                <div className="text-2xl font-bold text-blue-400">1.2Gbps</div>
                <div className="text-sm text-gray-200">Average Speed</div>
              </div>
              <div className="text-center p-4 bg-white/10 backdrop-blur rounded-xl shadow">
                <div className="text-2xl font-bold text-blue-400">24/7</div>
                <div className="text-sm text-gray-200">Support</div>
              </div>
              <div className="text-center p-4 bg-white/10 backdrop-blur rounded-xl shadow">
                <div className="text-2xl font-bold text-blue-400">99.9%</div>
                <div className="text-sm text-gray-200">Uptime</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative flex items-center justify-center"
          >
            <motion.img
              src={worker}
              alt="Worker"
              loading="lazy"
              className="w-full max-w-md rounded-2xl shadow-2xl border border-gray-200"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
            <motion.img
              src={install}
              alt="Install"
              className="absolute w-full max-w-md rounded-2xl shadow-xl border border-gray-100"
              style={{
                top: "60%",
                left: "55%",
                transform: "translate(-50%, -50%) rotate(-4deg)",
                width: "85%",
                zIndex: 1,
              }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              whileHover={{ scale: 1.05 }}
            />
            <motion.img
              src={homein}
              alt="Home Interior"
              className="absolute w-full max-w-md rounded-2xl shadow-xl border border-gray-100"
              style={{
                top: "75%",
                left: "60%",
                transform: "translate(-50%, -50%) rotate(2deg)",
                width: "75%",
                zIndex: 2,
              }}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              whileHover={{ scale: 1.05 }}
            />
            <motion.img
              src={deep}
              alt="Deep Connectivity"
              className="absolute w-full max-w-md rounded-2xl shadow-xl border border-gray-100"
              style={{
                top: "90%",
                left: "65%",
                transform: "translate(-50%, -50%) rotate(-6deg)",
                width: "65%",
                zIndex: 3,
              }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity }}
              whileHover={{ scale: 1.05 }}
            />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-8 h-8 border-2 border-blue-400 rounded-full flex items-center justify-center"
        >
          <div className="w-2 h-2 bg-blue-400 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
