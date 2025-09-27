// src/routes/CTA.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section
      className="py-20"
      style={{
        background: "linear-gradient(135deg, #2b473f 0%, #932528 100%)",
        color: "white",
      }}
    >
      {/* ✅ Centered container with horizontal padding on all screen sizes */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Us in Making a Difference
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Your support helps us provide quality Christian education to
            children in our community. Together, we can shape future leaders
            grounded in faith and knowledge.
          </p>

          {/* Centered buttons with consistent sizing */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/ChildSponsorship"
              className="bg-[#932528] hover:bg-[#a83a3d] text-white font-semibold py-3 px-8 rounded-md transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
            >
              Sponsor a Child
            </Link>
            <Link
              to="/donate"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#2b473f] font-semibold py-3 px-8 rounded-md transition-all duration-300"
            >
              Donate Now
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}