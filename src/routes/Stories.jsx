import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const stories = [
  {
    id: 1,
    title: "Wildred's Journey of Hope",
    description: "Despite poverty and her father's illness, Wildred's love for learning drives her dream of becoming a nurse.",
    image: "/WILDRED2.JPG",
    link: "/WildredsStory" // CORRECTED: matches App.jsx route
  },
  {
    id: 2,
    title: "Jimmy Alex's Story of Resilience", 
    description: "Inspired by his parents, Jimmy seeks to rise above poverty and inspire others through teaching.",
    image: "/JimmyAlex.jpg",
    link: "/jimmys-story" // CORRECTED: matches App.jsx route
  }
];

const missionCards = [
  {
    title: "Care for Orphans & Vulnerable Children",
    description: "We prioritize orphans and vulnerable children in the Mfangano Island area, providing them with boarding, education, protection, and Christian nurture.",
    icon: "fas fa-child",
  },
  {
    title: "Christian Discipleship & Biblical Foundation",
    description: "We equip students with the Gospel of Jesus Christ, instilling Christian values and preparing them to be future Christian leaders.",
    icon: "fas fa-cross",
  },
  {
    title: "Education & Holistic Development",
    description: "We run a boarding school from primary through high school, focusing on both academics and overall character formation in a locally led way.",
    icon: "fas fa-book-open",
  },
];

export default function Stories() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % stories.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + stories.length) % stories.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    let interval;
    if (isAutoPlaying && stories.length > 1) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % stories.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Match Hero component animations exactly
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };

  return (
    <>
      {/* Inspiring Stories - Left-aligned with handwritten font */}
      <section className="w-full py-8 sm:py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Left-aligned header with handwritten font */}
          <motion.div
            className="text-left mb-6 sm:mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-primary font-script mb-2 sm:mb-3">
              Inspiring Stories
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-2xl font-poppins font-normal">
              Discover how AVCS is transforming lives through faith-based education
            </p>
          </motion.div>

          {/* Slider Container - Updated for proper image display */}
          <div className="relative max-w-6xl mx-auto h-[400px] sm:h-[450px] md:h-[500px] overflow-hidden bg-gray-100 rounded-xl">
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 z-20 w-8 h-8 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full flex items-center justify-center text-sm text-primary transition-all duration-300 font-montserrat shadow-lg"
              aria-label="Previous story"
            >
              ‹
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 z-20 w-8 h-8 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full flex items-center justify-center text-sm text-primary transition-all duration-300 font-montserrat shadow-lg"
              aria-label="Next story"
            >
              ›
            </button>

            {/* Slides - FIXED: Images will not be cut off */}
            <div className="flex h-full transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {stories.map((story) => (
                <div
                  key={story.id}
                  className="w-full flex-shrink-0 relative flex items-center justify-center bg-white"
                >
                  {/* FIXED: Image container that prevents cropping */}
                  <div className="w-full h-full flex items-center justify-center p-4">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="max-w-full max-h-full object-contain" // This prevents cropping
                      onError={(e) => {
                        e.target.src = "/default-student.jpg";
                      }}
                    />
                  </div>
                  
                  {/* Gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                  {/* Story content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white z-10">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1 sm:mb-2 font-montserrat">
                      {story.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base mb-3 sm:mb-4 opacity-90 max-w-2xl leading-relaxed font-poppins font-normal">
                      {story.description}
                    </p>
                    {/* FIXED: Correct navigation paths that match App.jsx routes */}
                    <Link
                      to={story.link}
                      className="inline-block bg-[#932528] hover:bg-[#7a1e21] text-white font-semibold py-1.5 px-3 sm:py-2 sm:px-4 rounded-lg transition-all duration-300 font-montserrat text-xs sm:text-sm"
                    >
                      Read Full Story
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots Indicator */}
            <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5 z-20">
              {stories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-[#932528] scale-125"
                      : "bg-white bg-opacity-70"
                  }`}
                  aria-label={`Go to story ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission section */}
      <section className="w-full py-6 sm:py-8 bg-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-6 sm:mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#2b473f] font-montserrat mb-2 sm:mb-3">
              OUR MISSION
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto font-poppins font-normal">
              Discover what makes our Christian educational approach unique and effective
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {missionCards.map((card, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-xl p-4 sm:p-5 text-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                variants={fadeIn}
              >
                <div className="text-[#932528] text-3xl mb-2">
                  <i className={card.icon}></i>
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-[#2b473f] font-montserrat mb-1 sm:mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-xs font-poppins font-normal">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-6 sm:mt-8 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <p className="text-xs sm:text-sm text-gray-700 font-poppins font-normal">
              Anointed Vessels Christian School (AVCS) is a Christian boarding school in Kenya. AVCS was established following the HIV/AIDS crisis when our founders received God's call to serve vulnerable and orphaned children. By offering love, nourishment, and a Christian education, we are growing faithful leaders who will carry His message throughout the world.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}