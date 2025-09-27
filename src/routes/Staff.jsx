// src/routes/Staff.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Staff = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedCards, setExpandedCards] = useState(new Set());

  // Animation variants (match Stories.jsx)
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };

  const getUnsplashImage = (keyword, id) => {
    const keywords = keyword.toLowerCase().replace(/\s+/g, '+').replace(/&/g, 'and');
    return `https://source.unsplash.com/600x700/?african,${keywords},professional&sig=${id}`;
  };

  const staffMembers = [
    // ... (same as before — keep your full list)
    {
      id: 1,
      name: "MD. Leah Onam",
      role: "Headteacher",
      category: "leadership",
      bio: "MD. Leah Onam provides visionary leadership to Anointed Vessels Christian School...",
      image: getUnsplashImage("African woman educator", 1)
    },
    {
      id: 2,
      name: "Mr. Erick",
      role: "Deputy Headteacher",
      category: "leadership",
      bio: "Mr. Erick supports the Headteacher in daily school operations...",
      image: getUnsplashImage("Kenyan male teacher", 2)
    },
    {
      id: 3,
      name: "Mr. Omodia",
      role: "Senior Teacher",
      category: "leadership",
      bio: "As our Senior Teacher, Mr. Omodia mentors junior staff...",
      image: getUnsplashImage("African male educator", 3)
    },
    {
      id: 4,
      name: "Md. Elizabeth",
      role: "Financial Officer & Accountant",
      category: "support",
      bio: "Md. Elizabeth manages the school's financial resources...",
      image: getUnsplashImage("African woman professional", 4)
    },
    {
      id: 5,
      name: "Mr. Alphonce Okuku",
      role: "School Chairperson",
      category: "support",
      bio: "Mr. Alphonce provides strategic leadership...",
      image: getUnsplashImage("African elder leader", 5)
    },
    {
      id: 6,
      name: "Md. Ann",
      role: "Chef",
      category: "support",
      bio: "Md. Ann ensures that our students receive nutritious meals...",
      image: getUnsplashImage("African woman cooking", 6)
    },
    {
      id: 7,
      name: "Md. Sheryl",
      role: "Chef",
      category: "support",
      bio: "Md. Sheryl works alongside our kitchen team...",
      image: getUnsplashImage("African chef", 7)
    },
    {
      id: 8,
      name: "Md. Nanzalla",
      role: "Teacher",
      category: "teaching",
      bio: "Md. Nanzalla creates engaging classroom environments...",
      image: getUnsplashImage("African female teacher", 8)
    },
    // Add the rest as needed (or keep your full list)
  ];

  const filteredStaff = activeCategory === 'all' 
    ? staffMembers 
    : staffMembers.filter(member => member.category === activeCategory);

  const toggleExpand = (id) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const categories = [
    { id: 'all', name: 'All Staff' },
    { id: 'leadership', name: 'Leadership' },
    { id: 'teaching', name: 'Teaching Staff' },
    { id: 'support', name: 'Support Staff' }
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pt-24 pb-16">
      {/* Page Banner */}
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
              </button> / Our Staff
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal mb-3 font-script">
              Our Dedicated Staff
            </h1>
            <p className="text-base sm:text-lg opacity-90 max-w-2xl mx-auto font-poppins">
              Meet the passionate educators who nurture our students' spiritual, physical, and cognitive development
            </p>
          </motion.div>
        </div>
      </section>

      {/* Staff Intro */}
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
              Our Educational Team
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto font-poppins">
              Committed professionals guiding our students' holistic development
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
              At Anointed Vessels Christian School, our staff are the heart of our mission.
            </p>
            <p className="text-gray-700 font-poppins">
              Each brings unique gifts to create a nurturing environment where children flourish spiritually, academically, and socially.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 md:px-6 md:py-2.5 rounded-full font-medium text-sm md:text-base transition-all duration-300 font-montserrat ${
                  activeCategory === category.id
                    ? 'bg-secondary text-white'
                    : 'bg-white text-secondary border border-secondary hover:bg-accent hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>

          {/* Alternating Staff Layout */}
          {filteredStaff.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 font-poppins">No staff members found in this category.</p>
            </div>
          ) : (
            <div className="space-y-12 sm:space-y-16">
              {filteredStaff.map((member, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={member.id}
                    className="flex flex-col md:flex-row items-center gap-6 sm:gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                  >
                    {/* Image Side */}
                    <div className={`md:w-2/5 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                      <div className="rounded-2xl overflow-hidden shadow-lg">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-auto object-cover"
                          onError={(e) => {
                            e.target.src = "https://source.unsplash.com/600x700/?african,professional&sig=fallback";
                          }}
                        />
                      </div>
                    </div>

                    {/* Info Side */}
                    <div className={`md:w-3/5 text-center md:text-left ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                      <h3 className="text-xl sm:text-2xl font-semibold text-primary mb-1 font-montserrat">
                        {member.name}
                      </h3>
                      <span className="text-secondary font-medium block mb-3 font-montserrat">
                        {member.role}
                      </span>
                      
                      <AnimatePresence>
                        {expandedCards.has(member.id) ? (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-gray-700 mb-4 leading-relaxed font-poppins"
                          >
                            {member.bio}
                          </motion.p>
                        ) : (
                          <p className="text-gray-700 mb-4 leading-relaxed font-poppins line-clamp-3">
                            {member.bio}
                          </p>
                        )}
                      </AnimatePresence>

                      <button
                        onClick={() => toggleExpand(member.id)}
                        className="text-secondary font-medium text-sm flex items-center justify-center md:justify-start hover:text-accent transition-colors font-montserrat"
                      >
                        {expandedCards.has(member.id) ? 'Show Less' : 'Read Full Bio'}
                        <svg 
                          className={`ml-1 w-3 h-3 transition-transform duration-300 ${
                            expandedCards.has(member.id) ? 'rotate-180' : ''
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
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-normal mb-4 font-script"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            Join Our Educational Mission
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg mb-8 opacity-90 font-poppins"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ delay: 0.2 }}
          >
            Support our dedicated staff as they nurture the next generation of Christian leaders
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
};

export default Staff;