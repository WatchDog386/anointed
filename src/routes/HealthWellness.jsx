// src/routes/HealthWellness.jsx
import React from "react";

export default function HealthWellness() {
  return (
    <div className="font-open-sans">
      <div 
        className="h-80 md:h-[500px] bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: "url('/hero-health.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <h1 className="text-3xl md:text-5xl font-bold text-white font-montserrat z-10 text-center px-4">
          Health & Wellness
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2b473f] font-montserrat mb-4">
              Caring for the Whole Child
            </h2>
            <p className="text-gray-700 mb-4">
              We provide nutritious meals, clean water, regular health screenings, and a safe environment for every child.
            </p>
            <p className="text-gray-700">
              Our on-site nurse and partnerships with local clinics ensure students receive timely care.
            </p>
          </div>
          <div className="bg-[#f6f4ee] p-6 rounded-lg">
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-[#932528] mr-2">✓</span>
                <span>Daily balanced meals</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#932528] mr-2">✓</span>
                <span>Annual medical & dental check-ups</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#932528] mr-2">✓</span>
                <span>Mental health support</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#932528] mr-2">✓</span>
                <span>Hygiene & sanitation education</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}