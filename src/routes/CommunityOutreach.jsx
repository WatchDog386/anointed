// src/routes/CommunityOutreach.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function CommunityOutreach() {
  return (
    <div className="bg-white font-sans min-h-screen">
      {/* Hero Section */}
      <div
        className="h-80 md:h-[500px] bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: "url('/HAPPY.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <h1 className="text-3xl md:text-5xl font-bold text-white font-montserrat z-10 text-center px-4">
          Community Outreach
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <p className="text-gray-700 text-center mb-16 max-w-3xl mx-auto">
          We believe in serving our neighbors as Christ served us. Our students and staff engage in regular outreach to uplift the local community.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { title: "Food Drives", desc: "Monthly distributions to vulnerable families." },
            { title: "Clean Water Projects", desc: "Installing wells and filters in rural homes." },
            { title: "Medical Camps", desc: "Free health check-ups and medicine for locals." }
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="font-bold text-lg text-primary font-montserrat mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/Make-An-Impact" className="cta-button">
            Join an Outreach Trip
          </Link>
        </div>
      </div>
    </div>
  );
}