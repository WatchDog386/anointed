// src/routes/Impact.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Impact() {
  // EXACT same animation variants as Stories.jsx
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };

  const stats = [
    { value: "300+", label: "Children Educated" },
    { value: "7+", label: "Years of Ministry" },
    { value: "95%", label: "Graduation Rate" },
    { value: "100%", label: "Christ-Centered" }
  ];

  return (
    <div className="bg-white font-sans min-h-screen">
      {/* Hero Section — using YOUR images */}
      <section className="relative w-full h-[400px] sm:h-[450px] md:h-[500px]">
        {/* Main background: project.jpg */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/project.jpg')" 
          }}
        />
        {/* Fallback/overlay on mobile or if project.jpg fails */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-0 sm:opacity-100 pointer-events-none"
          style={{ 
            backgroundImage: "url('/support.jpg')" 
          }}
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        {/* Centered animated text */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <motion.div
            className="text-center px-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white font-script mb-2">
              Our Impact
            </h1>
            <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto font-poppins">
              Transforming lives through Christ-centered education on Mfangano Island
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats & CTA Section */}
      <section className="w-full py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Impact Stats */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="bg-gray-50 p-6 rounded-xl text-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                variants={fadeIn}
              >
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2 font-montserrat">
                  {stat.value}
                </div>
                <p className="text-gray-700 text-sm sm:text-base font-poppins">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Stories CTA */}
          <motion.div
            className="bg-light p-6 sm:p-8 rounded-xl text-center border border-gray-200"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-2xl sm:text-3xl font-normal text-primary font-script mb-3">
              Stories of Transformation
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto mb-6 font-poppins">
              Meet students whose lives have been changed through your support.
            </p>
            <Link
              to="/stories"
              className="inline-block bg-accent hover:bg-accent/90 text-white font-semibold py-2 px-4 sm:py-2.5 sm:px-6 rounded-lg transition-all duration-300 font-montserrat text-sm sm:text-base"
            >
              Read Their Stories
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}