// src/routes/HealthWellness.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HealthWellness() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Health program data
  const healthPrograms = [
    {
      id: 1,
      title: "Nutrition & Meals",
      description: "Daily balanced meals prepared with fresh, locally-sourced ingredients.",
      icon: "🥗",
      delay: 0.1
    },
    {
      id: 2,
      title: "Medical Care",
      description: "Annual check-ups, vaccinations, and on-site nurse for immediate care.",
      icon: "🩺",
      delay: 0.2
    },
    {
      id: 3,
      title: "Mental Wellness",
      description: "Counseling services and emotional support programs for all students.",
      icon: "🧠",
      delay: 0.3
    },
    {
      id: 4,
      title: "Hygiene Education",
      description: "Workshops on sanitation, handwashing, and healthy habits.",
      icon: "🧼",
      delay: 0.4
    }
  ];

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-slate-100 font-sans min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[600px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/hero-health.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-slate-900/80 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white font-montserrat mb-4"
          >
            Health & Wellness
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-emerald-100 max-w-2xl"
          >
            Nurturing healthy minds and bodies through comprehensive care
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Introduction Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-slate-800 mb-6">
            Caring for the Whole Child
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            We provide nutritious meals, clean water, regular health screenings, and a safe environment for every child. 
            Our on-site nurse and partnerships with local clinics ensure students receive timely, compassionate care.
          </p>
        </motion.div>

        {/* Animated Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <AnimatePresence>
            {healthPrograms.map((program) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.5, delay: program.delay }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-xl border border-emerald-100"
              >
                <div className="p-6">
                  <div className="text-4xl mb-4">{program.icon}</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{program.title}</h3>
                  <p className="text-slate-600">{program.description}</p>
                </div>
                <div className="h-1 bg-gradient-to-r from-emerald-500 to-slate-500" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="bg-white rounded-3xl p-8 shadow-lg border border-emerald-100"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "100%", label: "Students with Daily Meals" },
              { value: "24/7", label: "On-Site Medical Support" },
              { value: "98%", label: "Vaccination Rate" },
              { value: "12+", label: "Wellness Programs" }
            ].map((stat, index) => (
              <div key={index} className="py-4">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-slate-700 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-slate-600 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Join Our Wellness Initiative</h3>
          <button className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-slate-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            Support Health Programs
          </button>
        </motion.div>
      </div>
    </div>
  );
}