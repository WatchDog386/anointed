// src/routes/CommunityOutreach.jsx
import React from "react";

export default function CommunityOutreach() {
  return (
    <div className="font-open-sans">
      <div 
        className="h-80 md:h-[500px] bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: "url('/hero-outreach.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <h1 className="text-3xl md:text-5xl font-bold text-white font-montserrat z-10 text-center px-4">
          Community Outreach
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <p className="text-gray-700 text-center mb-10 max-w-3xl mx-auto">
          We believe in serving our neighbors as Christ served us. Our students and staff engage in regular outreach to uplift the local community.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            { title: "Food Drives", desc: "Monthly distributions to vulnerable families." },
            { title: "Clean Water Projects", desc: "Installing wells and filters in rural homes." },
            { title: "Medical Camps", desc: "Free health check-ups and medicine for locals." }
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg text-[#2b473f] font-montserrat mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="/Make-An-Impact"
            className="inline-block px-6 py-3 bg-[#932528] text-white font-montserrat font-semibold rounded-full hover:bg-[#8CA9B4] transition-all duration-300 hover:scale-105"
          >
            Join an Outreach Trip
          </a>
        </div>
      </div>
    </div>
  );
}