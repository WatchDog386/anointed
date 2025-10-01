import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const stories = [
  {
    id: 1,
    title: "Wildred's Journey of Hope",
    description: "Despite poverty and her father’s illness, Wildred’s love for learning drives her dream of becoming a nurse.",
    image: "/PRAYING.JPG",
  },
  {
    id: 2,
    title: "Michael's Academic Success", 
    description: "Despite facing numerous challenges, Michael excelled academically and spiritually at AVCS, earning a scholarship to university.",
    image: "/orphans.jpg",
  },
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
      <section className="w-full py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Left-aligned header with handwritten font */}
          <motion.div
            className="text-left mb-8 sm:mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-primary font-script mb-3 sm:mb-4">
              Inspiring Stories
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl font-poppins font-normal">
              Discover how AVCS is transforming lives through faith-based education
            </p>
          </motion.div>

          {/* Slider Container */}
          <div className="relative max-w-6xl mx-auto h-[400px] sm:h-[450px] md:h-[500px] overflow-hidden bg-gray-100">
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full flex items-center justify-center text-lg text-primary transition-all duration-300 font-montserrat shadow-lg"
              aria-label="Previous story"
            >
              ‹
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full flex items-center justify-center text-lg text-primary transition-all duration-300 font-montserrat shadow-lg"
              aria-label="Next story"
            >
              ›
            </button>

            {/* Slides */}
            <div className="flex h-full transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {stories.map((story) => (
                <div
                  key={story.id}
                  className="w-full flex-shrink-0 relative"
                  style={{
                    backgroundImage: `url(${story.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12 text-white z-10">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 sm:mb-3 font-montserrat">
                      {story.title}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 opacity-90 max-w-2xl leading-relaxed font-poppins font-normal">
                      {story.description}
                    </p>
                    <Link
                      to="/stories"
                      className="inline-block bg-accent hover:bg-accent/90 text-white font-semibold py-2 px-4 sm:py-2.5 sm:px-6 rounded-lg transition-all duration-300 font-montserrat text-sm sm:text-base"
                    >
                      Read Full Story
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {stories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-accent scale-125"
                      : "bg-white bg-opacity-70"
                  }`}
                  aria-label={`Go to story ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission - Original mission section restored */}
      <section className="w-full py-8 sm:py-12 bg-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-8 sm:mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary font-montserrat mb-3 sm:mb-4">
              OUR MISSION
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-poppins font-normal">
              Discover what makes our Christian educational approach unique and effective
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {missionCards.map((card, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-xl p-4 sm:p-6 text-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                variants={fadeIn}
              >
                <div className="text-secondary text-4xl mb-3">
                  <i className={card.icon}></i>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-primary font-montserrat mb-2 sm:mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm font-poppins font-normal">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-8 sm:mt-12 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <p className="text-xs sm:text-sm md:text-base text-gray-700 font-poppins font-normal">
              Anointed Vessels Christian School (AVCS) is a Christian boarding school in Kenya. AVCS was established following the HIV/AIDS crisis when our founders received God's call to serve vulnerable and orphaned children. By offering love, nourishment, and a Christian education, we are growing faithful leaders who will carry His message throughout the world.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}