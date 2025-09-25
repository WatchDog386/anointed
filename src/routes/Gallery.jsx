// src/routes/Gallery.jsx
import React from "react";

export default function Gallery() {
  return (
    <div className="font-open-sans">
      <div 
        className="h-80 md:h-[500px] bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: "url('/hero-gallery.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <h1 className="text-3xl md:text-5xl font-bold text-white font-montserrat z-10 text-center px-4">
          Gallery & Videos
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <p className="text-gray-700 text-center mb-10 max-w-3xl mx-auto">
          Explore moments of joy, learning, worship, and community at Anointed Vessels Christian School.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <img
                src={`/gallery-${i + 1}.jpg`}
                alt={`Gallery item ${i + 1}`}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="px-6 py-3 bg-[#932528] text-white font-montserrat font-semibold rounded-full hover:bg-[#8CA9B4] transition-all duration-300 hover:scale-105">
            Watch Our Story Video
          </button>
        </div>
      </div>
    </div>
  );
}