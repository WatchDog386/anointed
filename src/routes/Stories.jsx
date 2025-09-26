import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const stories = [
  {
    id: 1,
    title: "Grace's Journey of Hope",
    description:
      "From a struggling orphan to a confident student leader, Grace's transformation showcases the power of faith-based education.",
    image: "/ERICK.JPG",
  },
  {
    id: 2,
    title: "Michael's Academic Success",
    description:
      "Despite facing numerous challenges, Michael excelled academically and spiritually at AVCS, earning a scholarship to university.",
    image: "/orphans.jpg",
  },
];

const missionCards = [
  {
    title: "Care for Orphans & Vulnerable Children",
    description:
      "We prioritize orphans and vulnerable children in the Mfangano Island area, providing them with boarding, education, protection, and Christian nurture.",
    icon: "fas fa-child",
  },
  {
    title: "Christian Discipleship & Biblical Foundation",
    description:
      "We equip students with the Gospel of Jesus Christ, instilling Christian values and preparing them to be future Christian leaders.",
    icon: "fas fa-cross",
  },
  {
    title: "Education & Holistic Development",
    description:
      "We run a boarding school from primary through high school, focusing on both academics and overall character formation in a locally led way.",
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
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  return (
    <>
      {/* Inspiring Stories — GGCC-style full-width slider */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary font-montserrat">
              Inspiring Stories
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto font-poppins">
              Discover how AVCS is transforming lives through faith-based education
            </p>
          </motion.div>

          {/* Slider Container — GGCC uses sharp corners, no rounded, no shadow */}
          <div className="relative max-w-6xl mx-auto h-[500px] overflow-hidden">
            {/* Navigation Arrows — GGCC style: white with subtle opacity */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-white bg-opacity-60 hover:bg-opacity-90 rounded-full flex items-center justify-center font-bold text-lg text-primary transition-all duration-300 font-montserrat"
              aria-label="Previous story"
            >
              {"<"}
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-white bg-opacity-60 hover:bg-opacity-90 rounded-full flex items-center justify-center font-bold text-lg text-primary transition-all duration-300 font-montserrat"
              aria-label="Next story"
            >
              {">"}
            </button>

            {/* Slides */}
            <div
              className="flex h-full transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
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
                  {/* GGCC-style gradient overlay: dark at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-10 text-white z-10">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 font-montserrat">{story.title}</h3>
                    <p className="text-lg mb-6 opacity-90 max-w-2xl leading-relaxed font-poppins">
                      {story.description}
                    </p>
                    <Link
                      to="/stories"
                      className="cta-button font-montserrat"
                    >
                      Read Full Story
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots — GGCC uses small, accent color on active */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {stories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
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

      {/* Our Mission — GGCC-style cards */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary font-montserrat">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto font-poppins">
              Discover what makes our Christian educational approach unique and effective
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {missionCards.map((card, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-lg p-6 text-center border border-gray-200 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                variants={fadeIn}
              >
                <div className="text-secondary text-4xl mb-4">
                  <i className={card.icon}></i>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3 font-montserrat">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm font-poppins">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}