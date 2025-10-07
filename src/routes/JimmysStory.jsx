import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Jimmy Alex's story data
const jimmyStory = {
  id: 3,
  name: "Jimmy Alex",
  birthDate: "18th November 2018",
  grade: "Grade One",
  familyPosition: "Third-born",
  personality: "Energetic and cheerful",
  passions: ["football", "athletics"],
  academicStrengths: ["Environmental Studies", "CRE", "Mathematics"],
  performance: "Average performer with clear potential",
  description: "An energetic learner with a cheerful personality that shines both in class and during playtime.",
  dream: "Becoming a teacher to uplift others and make a positive impact in his community",
  familyBackground: {
    father: "Primary school teacher",
    mother: "ECD teacher and casual laborer"
  },
  challenges: [
    {
      id: 1,
      title: "Financial Struggles",
      description: "Family faces financial difficulties despite both parents being educators",
      icon: "💰"
    },
    {
      id: 2,
      title: "Poor Living Conditions",
      description: "Sleeps on a mat and manages with only two meals a day during holidays",
      icon: "🛏️"
    },
    {
      id: 3,
      title: "Limited Concentration",
      description: "Challenges limit his concentration and growth, preventing him from reaching full potential",
      icon: "🎯"
    }
  ],
  needs: [
    "School Materials",
    "Nutrition Support", 
    "School Fees",
    "Basic Bedding"
  ],
  images: [
    {
      id: 1,
      url: "/JimmyAlex.jpg",
      alt: "Jimmy Alex"
    }
  ]
};

export default function JimmyStory() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % jimmyStory.images.length);
    setIsAutoPlaying(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + jimmyStory.images.length) % jimmyStory.images.length);
    setIsAutoPlaying(false);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
    setIsAutoPlaying(false);
  };

  // Auto-advance images
  useEffect(() => {
    let interval;
    if (isAutoPlaying && jimmyStory.images.length > 1) {
      interval = setInterval(nextImage, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentImageIndex]);

  const currentImage = jimmyStory.images[currentImageIndex];

  return (
    <section className="py-12 bg-gradient-to-br from-[#f9f8f5] to-[#e9ecef] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link
            to="/stories"
            className="inline-flex items-center text-sm text-[#2b473f] hover:text-[#932528] transition-colors duration-300 font-semibold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Stories
          </Link>
        </motion.div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-[#2b473f] font-montserrat">
            Jimmy Alex's Story of Resilience
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto font-poppins">
            Inspired by his parents, Jimmy seeks to rise above poverty and inspire others through teaching
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Image Carousel - Fixed to prevent cropping */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-xl overflow-hidden shadow-lg bg-white p-4">
              <motion.img
                key={currentImage.id}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                src={currentImage.url}
                alt={currentImage.alt}
                className="w-full h-64 md:h-80 object-contain mx-auto" // Changed to object-contain to prevent cropping
                onError={(e) => {
                  e.target.src = "/default-student.jpg";
                }}
              />
            </div>

            {/* Navigation Arrows - Only show if multiple images */}
            {jimmyStory.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2b473f]"
                  aria-label="Previous image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#2b473f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2b473f]"
                  aria-label="Next image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#2b473f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Dot Indicators - Only show if multiple images */}
            {jimmyStory.images.length > 1 && (
              <div className="flex justify-center space-x-2 mt-4">
                {jimmyStory.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? "bg-[#2b473f] scale-125"
                        : "bg-gray-400 hover:bg-gray-500"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* Story Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Basic Info */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200/50">
              <h2 className="text-xl font-bold mb-3 text-[#2b473f] font-montserrat">About Jimmy</h2>
              <div className="space-y-2 text-sm text-gray-700 font-poppins">
                <p><span className="font-semibold text-[#2b473f]">Born:</span> {jimmyStory.birthDate}</p>
                <p><span className="font-semibold text-[#2b473f]">Grade:</span> {jimmyStory.grade}</p>
                <p><span className="font-semibold text-[#2b473f]">Family:</span> {jimmyStory.familyPosition} in his family</p>
                <p><span className="font-semibold text-[#2b473f]">Personality:</span> {jimmyStory.personality}</p>
                <p><span className="font-semibold text-[#2b473f]">Passions:</span> {jimmyStory.passions.join(", ")}</p>
                <p><span className="font-semibold text-[#2b473f]">Academic Strengths:</span> {jimmyStory.academicStrengths.join(", ")}</p>
                <p><span className="font-semibold text-[#2b473f]">Performance:</span> {jimmyStory.performance}</p>
              </div>
              <p className="mt-3 text-sm text-gray-600 italic font-poppins">{jimmyStory.description}</p>
            </div>

            {/* Family Background */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-[#f6f4ee] rounded-xl p-5 shadow-sm border border-[#e9ecef]"
            >
              <h3 className="text-lg font-bold mb-2 text-[#2b473f] font-montserrat">Family Background</h3>
              <div className="space-y-2 text-sm text-gray-700 font-poppins">
                <p><span className="font-semibold text-[#2b473f]">Father:</span> {jimmyStory.familyBackground.father}</p>
                <p><span className="font-semibold text-[#2b473f]">Mother:</span> {jimmyStory.familyBackground.mother}</p>
              </div>
              <p className="mt-3 text-xs text-[#932528] italic font-poppins">
                Despite both parents being educators, the family struggles financially
              </p>
            </motion.div>

            {/* Dream Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-gradient-to-r from-[#2b473f] to-[#3a5c52] rounded-xl p-5 text-white shadow-lg"
            >
              <h3 className="text-lg font-bold mb-2 font-montserrat">His Dream</h3>
              <p className="text-sm font-poppins">"{jimmyStory.dream}"</p>
              <p className="mt-2 text-[#8CA9B4] text-xs font-poppins">
                Inspired by his parents' example in education
              </p>
            </motion.div>

            {/* Challenges Section */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200/50">
              <h3 className="text-xl font-bold mb-3 text-[#2b473f] font-montserrat">Challenges He Faces</h3>
              <div className="space-y-3">
                {jimmyStory.challenges.map((challenge, index) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 * index }}
                    className="flex items-start space-x-3 p-3 bg-[#f6f4ee] rounded-lg hover:bg-[#e9ecef] transition-colors duration-300"
                  >
                    <span className="text-xl flex-shrink-0">{challenge.icon}</span>
                    <div>
                      <h4 className="font-semibold text-[#2b473f] text-sm font-montserrat">{challenge.title}</h4>
                      <p className="text-gray-600 text-xs font-poppins">{challenge.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Support Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-[#f6f4ee] rounded-xl p-5 shadow-sm border border-[#e9ecef]"
            >
              <h3 className="text-xl font-bold mb-3 text-[#2b473f] font-montserrat">How You Can Help</h3>
              <p className="text-gray-700 text-sm mb-3 font-poppins">
                Jimmy needs support to stabilize his education so his dream of becoming a teacher doesn't fade away.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {jimmyStory.needs.map((need, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="bg-[#932528] text-white px-3 py-1 rounded-full text-xs font-medium font-poppins"
                  >
                    {need}
                  </motion.span>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-[#932528] hover:bg-[#7a1e21] text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#932528] focus:ring-offset-2 text-sm font-montserrat"
              >
                Support Jimmy's Education
              </motion.button>
            </motion.div>

            {/* CTA to Sponsor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="text-center"
            >
              <Link
                to="/ChildSponsorship"
                className="inline-block bg-[#2b473f] hover:bg-[#3a5c52] text-white font-semibold py-2.5 px-6 rounded-lg transition-colors duration-300 text-sm font-montserrat"
              >
                Sponsor Another Child
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}