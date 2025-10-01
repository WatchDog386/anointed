import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
      url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      alt: "Jimmy playing football"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1503454536315-27eec21d2b3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      alt: "Jimmy in classroom"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1516627145497-ae69578cfc42?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      alt: "Jimmy dreaming of teaching"
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

  // Resume auto-play after inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAutoPlaying) {
        setIsAutoPlaying(true);
      }
    }, 8000);
    return () => clearTimeout(timer);
  }, [currentImageIndex]);

  const currentImage = jimmyStory.images[currentImageIndex];

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-orange-900">
            Jimmy Alex's Story
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            An energetic Grade One learner with a passion for sports and dreams of becoming a teacher
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <motion.img
                key={currentImage.id}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                src={currentImage.url}
                alt={currentImage.alt}
                className="w-full h-80 md:h-96 object-cover"
              />
            </div>

            {/* Navigation Arrows */}
            {jimmyStory.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  aria-label="Previous image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  aria-label="Next image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Dot Indicators */}
            {jimmyStory.images.length > 1 && (
              <div className="flex justify-center space-x-3 mt-4">
                {jimmyStory.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? "bg-orange-500 scale-125"
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
            className="space-y-8"
          >
            {/* Basic Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
              <h2 className="text-2xl font-bold mb-4 text-orange-800">About Jimmy</h2>
              <div className="space-y-3 text-gray-700">
                <p><span className="font-semibold">Born:</span> {jimmyStory.birthDate}</p>
                <p><span className="font-semibold">Grade:</span> {jimmyStory.grade}</p>
                <p><span className="font-semibold">Family:</span> {jimmyStory.familyPosition} in his family</p>
                <p><span className="font-semibold">Personality:</span> {jimmyStory.personality}</p>
                <p><span className="font-semibold">Passions:</span> {jimmyStory.passions.join(", ")}</p>
                <p><span className="font-semibold">Academic Strengths:</span> {jimmyStory.academicStrengths.join(", ")}</p>
                <p><span className="font-semibold">Performance:</span> {jimmyStory.performance}</p>
              </div>
              <p className="mt-4 text-gray-600 italic">{jimmyStory.description}</p>
            </div>

            {/* Family Background */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-amber-50 rounded-2xl p-6 shadow-lg border border-amber-200"
            >
              <h3 className="text-xl font-bold mb-3 text-amber-800">Family Background</h3>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-semibold">Father:</span> {jimmyStory.familyBackground.father}</p>
                <p><span className="font-semibold">Mother:</span> {jimmyStory.familyBackground.mother}</p>
              </div>
              <p className="mt-3 text-sm text-amber-700 italic">
                Despite both parents being educators, the family struggles financially
              </p>
            </motion.div>

            {/* Dream Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 text-white shadow-lg"
            >
              <h3 className="text-xl font-bold mb-3">His Dream</h3>
              <p className="text-lg">"{jimmyStory.dream}"</p>
              <p className="mt-2 text-orange-100 text-sm">
                Inspired by his parents' example in education
              </p>
            </motion.div>

            {/* Challenges Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-100">
              <h3 className="text-2xl font-bold mb-4 text-red-700">Challenges He Faces</h3>
              <div className="space-y-4">
                {jimmyStory.challenges.map((challenge, index) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 * index }}
                    className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-300"
                  >
                    <span className="text-2xl">{challenge.icon}</span>
                    <div>
                      <h4 className="font-semibold text-red-800">{challenge.title}</h4>
                      <p className="text-gray-600 text-sm">{challenge.description}</p>
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
              className="bg-green-50 rounded-2xl p-6 shadow-lg border border-green-200"
            >
              <h3 className="text-2xl font-bold mb-4 text-green-800">How You Can Help</h3>
              <p className="text-gray-700 mb-4">
                Jimmy needs support to stabilize his education so his dream of becoming a teacher doesn't fade away.
              </p>
              <div className="flex flex-wrap gap-3 mb-4">
                {jimmyStory.needs.map((need, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md"
                  >
                    {need}
                  </motion.span>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Support Jimmy's Education
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}