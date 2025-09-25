// src/routes/Impact.jsx
import React from "react";

export default function Impact() {
  return (
    <div className="font-open-sans">
      <div 
        className="h-80 md:h-[500px] bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: "url('/hero-impact.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <h1 className="text-3xl md:text-5xl font-bold text-white font-montserrat z-10 text-center px-4">
          Our Impact
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 text-center">
          {[
            { value: "500+", label: "Children Educated" },
            { value: "15+", label: "Years of Ministry" },
            { value: "95%", label: "Graduation Rate" },
            { value: "100%", label: "Christ-Centered" }
          ].map((stat, i) => (
            <div key={i} className="p-4">
              <div className="text-3xl font-bold text-[#932528] font-montserrat">{stat.value}</div>
              <div className="text-gray-700 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-[#2b473f] font-montserrat mb-4 text-center">
            Stories of Transformation
          </h2>
          <p className="text-gray-700 text-center max-w-2xl mx-auto">
            Meet students whose lives have been changed through your support.
          </p>
          <div className="mt-6 flex justify-center">
            <a
              href="/stories"
              className="px-5 py-2 border-2 border-[#932528] text-[#932528] font-montserrat font-semibold rounded-full hover:bg-[#932528] hover:text-white transition-colors"
            >
              Read Their Stories
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}