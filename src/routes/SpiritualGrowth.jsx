// src/routes/SpiritualGrowth.jsx
import React from "react";

export default function SpiritualGrowth() {
  return (
    <div className="bg-white font-sans min-h-screen">
      {/* Hero Section */}
      <div
        className="h-80 md:h-[500px] bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: "url('/hero-spiritual.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <h1 className="text-3xl md:text-5xl font-bold text-white font-montserrat z-10 text-center px-4">
          Spiritual Development
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary font-montserrat mb-4">
              Rooted in Christ
            </h2>
            <p className="text-gray-700 mb-4">
              Every student at AVCS is discipled in the Word of God. Through daily devotions, Bible classes, and weekly chapel services, we help children build a personal relationship with Jesus.
            </p>
            <p className="text-gray-700">
              Our spiritual mentorship program pairs each student with a caring adult who walks with them in faith.
            </p>
          </div>
          <div className="bg-light rounded-lg p-6">
            <blockquote className="text-xl italic text-primary font-['Ernest_Emily',_serif]">
              “Train up a child in the way he should go...”
            </blockquote>
            <p className="text-right mt-2 text-gray-600">— Proverbs 22:6</p>
          </div>
        </div>

        <div className="bg-light rounded-xl p-8 text-center">
          <h3 className="text-xl font-montserrat font-bold text-primary mb-4">
            Weekly Spiritual Activities
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {["Chapel Service", "Bible Study", "Prayer Groups", "Worship Team", "Outreach Ministry"].map((act, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-white rounded-full text-sm font-montserrat text-secondary border border-accent"
              >
                {act}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}