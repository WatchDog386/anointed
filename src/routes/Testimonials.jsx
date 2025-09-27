import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    text: "The best thing that happened to me while at GGCC is receiving God's Gift of salvation which has brought peace, healing, hope and complete change in my life.",
    author: "Finidi George Michael",
    role: "Student 0648",
    avatar: "https://placehold.co/60x60/2b473f/FFFFFF/png?text=Student",
  },
  {
    id: 2,
    text: "AVCS helped me discover my purpose through Christ. The teachers didn’t just teach curriculum — they mentored souls.",
    author: "Mary Wanjiku",
    role: "Parent of two AVCS students",
    avatar: "https://placehold.co/60x60/2b473f/FFFFFF/png?text=Parent",
  },
  {
    id: 3,
    text: "My child came home every day excited to share what they learned — not just academically, but spiritually. That’s the AVCS difference.",
    author: "James Ochieng",
    role: "AVCS Parent",
    avatar: "https://placehold.co/60x60/2b473f/FFFFFF/png?text=Parent",
  },
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false); // Pause auto-play on user interaction
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  // Auto-advance slides
  useEffect(() => {
    let interval;
    if (isAutoPlaying && testimonials.length > 1) {
      interval = setInterval(nextSlide, 6000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Resume auto-play after 5s of inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAutoPlaying) {
        setIsAutoPlaying(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  const current = testimonials[currentSlide];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-red-800">
          In Their Own Words
        </h2>

        {/* Testimonial Container */}
        <div className="relative flex flex-col items-center">
          {/* Quote */}
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6"
          >
            <p className="text-gray-500 italic text-lg md:text-xl leading-relaxed max-w-3xl mx-auto px-4">
              "{current.text}"
            </p>
          </motion.div>

          {/* Author */}
          <div className="text-center mb-8">
            <p className="text-gray-700 font-serif text-base md:text-lg italic">
              {current.author} — {current.role}
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-between w-full max-w-xs mb-6">
            <button
              onClick={prevSlide}
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
            </button>

            <button
              onClick={nextSlide}
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
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-blue-400 scale-125"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === currentSlide ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}