// src/routes/EducationPrograms.jsx
import React from "react";

export default function EducationPrograms() {
  return (
    <div className="font-open-sans">
      <div 
        className="h-80 md:h-[500px] bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: "url('/hero-edu.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <h1 className="text-3xl md:text-5xl font-bold text-white font-montserrat z-10 text-center px-4">
          Education Programs
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-gray-700">
            At Anointed Vessels Christian School, we provide a holistic education that nurtures the mind, body, and spirit.
          </p>
        </div>

        <div className="space-y-10">
          {[
            { title: "Academic Excellence", desc: "Rigorous curriculum aligned with national standards, taught by passionate educators." },
            { title: "Character Development", desc: "Biblical values integrated into daily learning to build integrity, compassion, and leadership." },
            { title: "Arts & Creativity", desc: "Music, drama, and visual arts programs that allow students to express God’s creativity." },
            { title: "STEM & Innovation", desc: "Hands-on science and technology labs to inspire future innovators and problem-solvers." }
          ].map((item, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-16 h-16 rounded-full bg-[#f6f4ee] flex items-center justify-center flex-shrink-0">
                <span className="text-[#932528] font-bold text-xl">{i + 1}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#2b473f] font-montserrat mb-2">{item.title}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}