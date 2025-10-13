import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    text: "The best thing that happened to me while at AVCS is receiving God's Gift of salvation which has brought peace, healing, hope and complete change in my life.",
    author: "Nicole Onam",
    role: "Student 0648",
    avatar: "https://placehold.co/60x60/2b473f/FFFFFF/png?text=Student",
  },
  {
    id: 2,
    text: "AVCS helped me discover my purpose through Christ. The teachers didn't just teach curriculum — they mentored souls.",
    author: "Alphonce Okuku",
    role: "Parent of two AVCS students",
    avatar: "https://placehold.co/60x60/2b473f/FFFFFF/png?text=Parent",
  },
  {
    id: 3,
    text: "My child came home every day excited to share what they learned — not just academically, but spiritually. That's the AVCS difference.",
    author: "Mary Magdaline",
    role: "AVCS Parent",
    avatar: "https://placehold.co/60x60/2b473f/FFFFFF/png?text=Parent",
  },
];

// Animation variants for better performance and reusability
const slideVariants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0); // 0 for next, 1 for previous

  // Use useCallback to prevent unnecessary re-renders
  const nextSlide = useCallback(() => {
    setDirection(0);
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  }, [testimonials.length]);

  const goToSlide = useCallback((index) => {
    setDirection(index > currentSlide ? 0 : 1);
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  }, [currentSlide]);

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length <= 1) return;

    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, testimonials.length]);

  // Resume auto-play after 5s of inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAutoPlaying) {
        setIsAutoPlaying(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentSlide, isAutoPlaying]);

  const current = testimonials[currentSlide];

  return (
    <motion.section 
      className="py-16 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Heading */}
        <motion.h2 
          className="text-2xl md:text-3xl font-bold mb-8 text-center text-red-800"
          variants={containerVariants}
        >
          In Their Own Words
        </motion.h2>

        {/* Testimonial Container */}
        <div className="relative flex flex-col items-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="text-center mb-6"
            >
              {/* Quote Icon */}
              <div className="mb-4 text-red-800">
                <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
                </svg>
              </div>
              
              <p className="text-gray-500 italic text-lg md:text-xl leading-relaxed max-w-3xl mx-auto px-4">
                "{current.text}"
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Author Info */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p className="text-gray-700 font-serif text-base md:text-lg italic">
              {current.author} — {current.role}
            </p>
          </motion.div>

          {/* Navigation Arrows */}
          <div className="flex justify-between w-full max-w-xs mb-6">
            <motion.button
              onClick={prevSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label="Previous testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <motion.button
              onClick={nextSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label="Next testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Dot Indicators */}
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                whileHover={{ scale: 1.2 }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-red-600 scale-125"
                    : "bg-gray-400 hover:bg-gray-500"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === currentSlide ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}