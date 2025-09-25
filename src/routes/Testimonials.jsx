import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    text: "AVCS has been a blessing to our family. The teachers truly care about our children's spiritual growth as much as their academic progress. We've seen such positive changes in our kids since they started attending.",
    author: "Mary Wanjiku",
    role: "Parent of two AVCS students",
    avatar: "https://placehold.co/60x60/2b473f/FFFFFF/png?text=Parent",
  },
  {
    id: 2,
    text: "The academic standards at AVCS are exceptional, but what really sets the school apart is the character development. My children are learning to be compassionate, responsible, and faith-filled individuals.",
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
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    let interval;
    if (isAutoPlaying && testimonials.length > 1) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <>
      {/* GGCC Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <style>{`
        body { font-family: 'Open Sans', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Montserrat', sans-serif; font-weight: 700; }
      `}</style>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              What Parents & Students Say
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Hear from families who have experienced the AVCS difference
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-full px-4">
                  <motion.div
                    className="bg-white rounded-lg p-8 border border-gray-200 relative transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                  >
                    {/* Quote mark — GGCC style */}
                    <div className="absolute top-6 right-6 text-4xl text-accent opacity-30">
                      ”
                    </div>

                    <p className="text-gray-700 italic text-lg mb-6 pl-6 relative" style={{ lineHeight: 1.8 }}>
                      {testimonial.text}
                    </p>

                    <div className="flex items-center mt-6">
                      <div
                        className="w-14 h-14 rounded-full flex-shrink-0 border-2 border-secondary"
                        style={{
                          backgroundImage: `url(${testimonial.avatar})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div>
                      <div className="ml-4">
                        <h4 className="font-bold text-gray-900">{testimonial.author}</h4>
                        <p className="text-gray-600 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Dots — GGCC style */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-accent scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}