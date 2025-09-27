// src/routes/EducationPrograms.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function EducationPrograms() {
  const navigate = useNavigate();
  const [expandedCards, setExpandedCards] = useState(new Set());

  // EXACT same animation variants as Staff.jsx
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };

  const programs = [
    {
      id: 1,
      title: "The Heart of Learning",
      description: "Education at Anointed Vessels Christian School was born out of brokenness. Many children once had no chance of attending school because of poverty or the impact of HIV/AIDS. Our program restores that lost opportunity and gives them a second chance at life.",
      features: [
        "Providing education to vulnerable children",
        "Restoring hope and opportunity",
        "Creating pathways out of poverty"
      ],
      image: "/LEARNING.JPG"
    },
    {
      id: 2,
      title: "Academic Excellence",
      description: "We provide a Christ-centered curriculum rooted in both national standards and Christian values, preparing students for academic success and spiritual growth.",
      features: [
        "Christ-centered curriculum",
        "Focus on literacy, numeracy, science, and technology",
        "Special emphasis on critical thinking and problem-solving",
        "Alignment with national education standards"
      ],
      image: "/Children%20waving.jpeg"
    },
    {
      id: 3,
      title: "Supportive Learning Environment",
      description: "We create a nurturing atmosphere where each child feels valued, supported, and empowered to reach their full potential.",
      features: [
        "Small class sizes for personal attention",
        "Teachers trained to mentor beyond academics",
        "Safe classrooms that feel like family",
        "Holistic approach to child development"
      ],
      image: "/HAPPY.JPG"
    },
    {
      id: 4,
      title: "Beyond the Classroom",
      description: "Education extends beyond academic learning to include creative arts, sports, leadership development, and practical experiences.",
      features: [
        "Music, arts, and sports programs",
        "Leadership development for future changemakers",
        "Excursions and exposure trips for practical learning",
        "Talent discovery and nurturing"
      ],
      image: "/Caregiver%20Receiving%20a%20gift.jpeg"
    }
  ];

  const toggleExpand = (id) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pt-24 pb-16">
      {/* Page Banner — identical to Staff.jsx */}
      <section className="relative bg-primary py-16 sm:py-20 text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="text-sm text-accent mb-2 font-montserrat">
              <button onClick={() => navigate('/')} className="hover:underline">
                Home
              </button> / Education Programs
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal mb-3 font-script">
              Education Programs
            </h1>
            <p className="text-base sm:text-lg opacity-90 max-w-2xl mx-auto font-poppins">
              Transforming lives through Christ-centered education and holistic development
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div
            className="text-center mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-primary mb-3 font-script">
              Our Educational Approach
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto font-poppins">
              Holistic, Christ-centered programs that nurture the whole child
            </p>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <p className="text-gray-700 mb-4 font-poppins">
              At Anointed Vessels Christian School, education goes beyond textbooks.
            </p>
            <p className="text-gray-700 font-poppins">
              We integrate spiritual formation, academic rigor, emotional support, and practical life skills to prepare students for purposeful lives in Christ.
            </p>
          </motion.div>

          {/* Alternating Program Layout — identical to Staff.jsx */}
          <div className="space-y-12 sm:space-y-16">
            {programs.map((program, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={program.id}
                  className="flex flex-col md:flex-row items-center gap-6 sm:gap-8"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                >
                  {/* Image */}
                  <div className={`md:w-2/5 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                    <div className="rounded-2xl overflow-hidden shadow-lg">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-auto object-cover"
                        onError={(e) => {
                          e.target.src = "https://source.unsplash.com/600x700/?african,school,children&sig=edu-fallback";
                        }}
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className={`md:w-3/5 text-center md:text-left ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                    <h3 className="text-xl sm:text-2xl font-semibold text-primary mb-3 font-montserrat">
                      {program.title}
                    </h3>
                    
                    <AnimatePresence>
                      {expandedCards.has(program.id) ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mb-4"
                        >
                          <p className="text-gray-700 mb-4 leading-relaxed font-poppins">
                            {program.description}
                          </p>
                          <ul className="space-y-2 text-gray-700 font-poppins">
                            {program.features.map((feature, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-secondary mr-2">•</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ) : (
                        <p className="text-gray-700 mb-4 leading-relaxed font-poppins line-clamp-3">
                          {program.description}
                        </p>
                      )}
                    </AnimatePresence>

                    <button
                      onClick={() => toggleExpand(program.id)}
                      className="text-secondary font-medium text-sm flex items-center justify-center md:justify-start hover:text-accent transition-colors font-montserrat"
                    >
                      {expandedCards.has(program.id) ? 'Show Less' : 'Read Full Program'}
                      <svg 
                        className={`ml-1 w-3 h-3 transition-transform duration-300 ${
                          expandedCards.has(program.id) ? 'rotate-180' : ''
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section — identical to Staff.jsx */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-normal mb-4 font-script"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            Support Our Educational Mission
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg mb-8 opacity-90 font-poppins"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ delay: 0.2 }}
          >
            Your partnership helps us provide quality Christ-centered education to vulnerable children
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={() => navigate("/ChildSponsorship")}
              className="inline-block bg-white text-primary hover:bg-accent hover:text-white font-semibold py-2.5 px-6 sm:px-8 rounded-full transition-all duration-300 mr-3 mb-2 sm:mb-0 font-montserrat"
            >
              Sponsor a Child
            </button>
            <button
              onClick={() => {}}
              className="inline-block bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-semibold py-2.5 px-6 sm:px-8 rounded-full transition-all duration-300 font-montserrat"
            >
              Donate Now
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}