// src/routes/ChildSponsorship.jsx
import React from "react";

export default function ChildSponsorship() {
  return (
    <div className="font-open-sans bg-white">
      {/* Hero Banner */}
      <div 
        className="relative h-96 md:h-[500px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/hero-sponsor.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-white font-montserrat mb-4">
            Sponsor a Child
          </h1>
          <p className="text-lg text-white font-open-sans">
            Transform a life through education, love, and the Gospel.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2b473f] font-montserrat mb-4">
              Give Hope Through Sponsorship
            </h2>
            <p className="text-gray-700 mb-4">
              Your monthly gift of $35 provides a child with meals, education, uniforms, 
              spiritual mentorship, and a safe home at Anointed Vessels Christian School.
            </p>
            <p className="text-gray-700 mb-6">
              You’ll receive updates, letters, and photos from your sponsored child — 
              building a life-changing relationship.
            </p>
            <a
              href="#sponsor-form"
              className="inline-block px-6 py-3 bg-[#932528] text-white font-montserrat font-semibold rounded-full hover:bg-[#8CA9B4] transition-all duration-300 hover:scale-105"
            >
              Start Sponsoring Today
            </a>
          </div>
          <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
            <img
              src="/sponsor-child.jpg"
              alt="Happy student at AVCS"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Impact Stats */}
        <div className="bg-[#f6f4ee] rounded-xl p-8 text-center mb-12">
          <h3 className="text-xl font-montserrat font-bold text-[#2b473f] mb-2">
            Your Impact
          </h3>
          <div className="flex flex-wrap justify-center gap-6 mt-4">
            <div>
              <div className="text-3xl font-bold text-[#932528] font-montserrat">$35</div>
              <div className="text-sm text-gray-700">Monthly Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#932528] font-montserrat">100%</div>
              <div className="text-sm text-gray-700">Goes to the Child</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#932528] font-montserrat">500+</div>
              <div className="text-sm text-gray-700">Lives Transformed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}