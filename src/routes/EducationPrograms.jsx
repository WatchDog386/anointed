// src/routes/EducationPrograms.jsx
import React from 'react';
import { 
  FaHeart, 
  FaGraduationCap, 
  FaHandsHelping, 
  FaGlobeAfrica, 
  FaCheckCircle 
} from 'react-icons/fa';

export default function EducationPrograms() {
  const programs = [
    {
      title: "The Heart of Learning",
      description: "Education at Anointed Vessels Christian School was born out of brokenness. Many children once had no chance of attending school because of poverty or the impact of HIV/AIDS. Our program restores that lost opportunity and gives them a second chance at life.",
      features: [
        "Providing education to vulnerable children",
        "Restoring hope and opportunity",
        "Creating pathways out of poverty"
      ],
      icon: <FaHeart className="text-4xl text-secondary" />,
      image: "/LEARNING.JPG",
      reverse: false
    },
    {
      title: "Academic Excellence",
      description: "We provide a Christ-centered curriculum rooted in both national standards and Christian values, preparing students for academic success and spiritual growth.",
      features: [
        "Christ-centered curriculum",
        "Focus on literacy, numeracy, science, and technology",
        "Special emphasis on critical thinking and problem-solving",
        "Alignment with national education standards"
      ],
      icon: <FaGraduationCap className="text-4xl text-secondary" />,
      image: "/Children%20waving.jpeg",
      reverse: true
    },
    {
      title: "Supportive Learning Environment",
      description: "We create a nurturing atmosphere where each child feels valued, supported, and empowered to reach their full potential.",
      features: [
        "Small class sizes for personal attention",
        "Teachers trained to mentor beyond academics",
        "Safe classrooms that feel like family",
        "Holistic approach to child development"
      ],
      icon: <FaHandsHelping className="text-4xl text-secondary" />,
      image: "/HAPPY.JPG",
      reverse: false
    },
    {
      title: "Beyond the Classroom",
      description: "Education extends beyond academic learning to include creative arts, sports, leadership development, and practical experiences.",
      features: [
        "Music, arts, and sports programs",
        "Leadership development for future changemakers",
        "Excursions and exposure trips for practical learning",
        "Talent discovery and nurturing"
      ],
      icon: <FaGlobeAfrica className="text-4xl text-secondary" />,
      image: "/Caregiver%20Receiving%20a%20gift.jpeg",
      reverse: true
    }
  ];

  return (
    <div className="font-montserrat bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Hero Section */}
      <div 
        className="h-80 md:h-[500px] bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: "url('/education-hero.jpg')" }}
      >
        {/* GGCC-style overlay: dark green tint instead of black */}
        <div className="absolute inset-0 bg-[#005A32] bg-opacity-60"></div>
        <h1 className="text-3xl md:text-5xl font-bold text-white z-10 text-center px-4 drop-shadow-lg">
          Education <span className="text-secondary">Programs</span>
        </h1>
      </div>

      {/* Programs Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <p className="text-gray-700 text-lg text-center max-w-3xl mx-auto mb-16">
          Transforming lives through Christ-centered education and holistic development
        </p>

        <div className="space-y-16">
          {programs.map((program, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                program.reverse ? 'md:flex-row-reverse' : 'md:flex-row'
              } gap-8 items-center`}
            >
              {/* Image */}
              <div className="md:w-1/2 rounded-xl overflow-hidden shadow-lg">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-64 md:h-80 object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="md:w-1/2 bg-white p-6 rounded-xl shadow-md">
                <div className="mb-4">{program.icon}</div>
                <h2 className="text-2xl font-bold text-primary mb-4">{program.title}</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">{program.description}</p>
                <ul className="space-y-2">
                  {program.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <FaCheckCircle className="text-secondary mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}