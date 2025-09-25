// src/routes/Impact.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Impact() {
  return (
    <div className="bg-white font-sans min-h-screen">
      {/* Hero Section — with fallback background */}
      <div className="relative">
        <div 
          className="h-80 md:h-[500px] bg-cover bg-center flex items-center justify-center relative"
          style={{ backgroundImage: "url('/hero-impact.jpg')" }}
        >
          {/* Fallback background in case image fails */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary"></div>
          {/* Dark overlay for text contrast */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <h1 className="text-3xl md:text-5xl font-bold text-white font-montserrat z-10 text-center px-4">
            Our Impact
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Stats — GGCC Style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 text-center">
          {[
            { value: "500+", label: "Children Educated" },
            { value: "15+", label: "Years of Ministry" },
            { value: "95%", label: "Graduation Rate" },
            { value: "100%", label: "Christ-Centered" }
          ].map((stat, i) => (
            <div key={i} className="p-4">
              <div className="text-3xl font-bold text-secondary font-montserrat">{stat.value}</div>
              <div className="text-gray-700 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Stories CTA — GGCC Style */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-primary font-montserrat mb-4 text-center">
            Stories of Transformation
          </h2>
          <p className="text-gray-700 text-center max-w-2xl mx-auto">
            Meet students whose lives have been changed through your support.
          </p>
          <div className="mt-6 flex justify-center">
            <Link to="/stories" className="cta-button">
              Read Their Stories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}