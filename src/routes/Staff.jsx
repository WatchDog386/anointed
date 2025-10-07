// src/routes/Staff.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Staff = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedCards, setExpandedCards] = useState(new Set());

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.7, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: { 
      transition: { 
        staggerChildren: 0.15, 
        delayChildren: 0.3 
      } 
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const staffMembers = [
    {
      id: 1,
      name: "MD. Leah Onam",
      role: "Headteacher",
      category: "leadership",
      bio: "MD. Leah Onam provides visionary leadership to Anointed Vessels Christian School, bringing over 15 years of educational experience and a deep commitment to holistic child development. Her innovative approaches to curriculum design and student engagement have consistently elevated academic performance while nurturing spiritual growth.",
      image:"/LEAH.JPG"
    },
    {
      id: 2,
      name: "Mr. Erick",
      role: "Deputy Headteacher",
      category: "leadership",
      bio: "Mr. Erick supports the Headteacher in daily school operations with exceptional organizational skills and dedication. His background in educational administration ensures smooth functioning across all departments while maintaining the school's Christian values and academic standards.",
      image:"/ERICK.JPG"
    },
    {
      id: 3,
      name: "Mr. Omodia",
      role: "Senior Teacher",
      category: "leadership",
      bio: "As our Senior Teacher, Mr. Omodia mentors junior staff and leads curriculum development initiatives. With a Master's in Education and specialized training in child psychology, he creates learning environments that cater to diverse learning styles and abilities.",
      image:"/ALBERT.JPG"
    },
    {
      id: 4,
      name: "Md. Elizabeth",
      role: "Financial Officer & Accountant",
      category: "support",
      bio: "Md. Elizabeth manages the school's financial resources with precision and integrity. Her CPA certification and decade of experience in educational finance ensure optimal resource allocation while maintaining transparency and accountability in all financial matters.",
      image:"/ELIZABETH.JPG"
    },
    {
      id: 5,
      name: "Mr. Alphonce Okuku",
      role: "School Chairperson",
      category: "support",
      bio: "Mr. Alphonce provides strategic leadership and governance oversight, bringing extensive experience in educational policy and community development. His visionary guidance has been instrumental in shaping the school's long-term growth and community impact.",
      image:"/VINCENT.JPG"
    },
    {
      id: 6,
      name: "Md. Ann",
      role: "Chef",
      category: "support",
      bio: "Md. Ann ensures that our students receive nutritious, balanced meals that support their growth and learning. With formal training in nutrition and child dietary requirements, she creates menus that are both healthy and appealing to young palates.",
      image:"/NANZALA.JPG"
    },
    {
      id: 7,
      name: "Md. Sheryl",
      role: "Chef",
      category: "support",
      bio: "Md. Sheryl works alongside our kitchen team to maintain the highest standards of food safety and quality. Her creative approach to meal preparation ensures variety and nutritional excellence in our school feeding program.",
      image:"/SHARON.JPG",
    },
    {
      id: 8,
      name: "Md. Nanzalla",
      role: "Teacher",
      category: "teaching",
      bio: "Md. Nanzalla creates engaging classroom environments that foster curiosity and critical thinking. Her specialized training in early childhood education and innovative teaching methodologies make learning both effective and enjoyable for our youngest students.",
      image:"/NANZALA.JPG"
    },
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
    <div className="min-h-screen bg-gradient-to-br from-gray-25 to-gray-100 font-sans pt-24 pb-16">
      {/* Enhanced Page Banner */}
      <section className="relative bg-gradient-to-r from-primary via-primary-dark to-secondary py-20 sm:py-24 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="text-sm text-accent-light mb-3 font-montserrat font-medium tracking-wide">
              <button onClick={() => navigate('/')} className="hover:underline transition-all duration-300">
                Home &gt; Our Staff
              </button> 
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light mb-4 font-script tracking-tight">
              Our Dedicated Staff
            </h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-lg sm:text-xl opacity-95 max-w-2xl mx-auto font-poppins leading-relaxed">
              Meet the passionate educators and professionals who nurture our students' spiritual, physical, and cognitive development
            </p>
          </motion.div>
        </div>
      </section>

      {/* Staff Intro */}
      <section className="py-16 sm:py-20 bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-primary mb-4 font-script tracking-tight">
              Our Educational Team
            </h2>
            <div className="w-20 h-0.5 bg-secondary mx-auto mb-6"></div>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto font-poppins leading-relaxed">
              Committed professionals guiding our students' holistic development with excellence and compassion
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto text-center mb-16 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-soft"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <p className="text-gray-700 mb-6 text-lg leading-relaxed font-poppins">
              At Anointed Vessels Christian School, our staff are the heart of our mission. Each team member brings unique gifts and professional expertise to create a nurturing environment where children flourish spiritually, academically, and socially.
            </p>
            <p className="text-gray-600 leading-relaxed font-poppins">
              Our commitment to excellence in education is reflected in our carefully selected team of dedicated professionals who embody our Christian values and educational philosophy.
            </p>
          </motion.div>

          {/* Enhanced Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 font-montserrat border-2 shadow-soft hover:shadow-lg ${
                  activeCategory === category.id
                    ? 'bg-secondary border-secondary text-white shadow-lg scale-105'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-secondary hover:text-secondary'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Enhanced Staff Layout */}
          {filteredStaff.length === 0 ? (
            <motion.div 
              className="text-center py-20 bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <p className="text-gray-600 text-lg font-poppins">No staff members found in this category.</p>
            </motion.div>
          ) : (
            <div className="grid gap-8 sm:gap-12">
              {filteredStaff.map((member, index) => {
                const isExpanded = expandedCards.has(member.id);
                return (
                  <motion.div
                    key={member.id}
                    className={`bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-soft hover:shadow-lg transition-all duration-500 ${
                      isExpanded ? 'ring-2 ring-secondary/20' : ''
                    }`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={cardVariants}
                    whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  >
                    <div className="flex flex-col lg:flex-row items-stretch min-h-96">
                      {/* Image Section */}
                      <div className="lg:w-2/5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                          onError={(e) => {
                            e.target.src = "https://source.unsplash.com/600x700/?african,professional,educator&sig=" + member.id;
                          }}
                        />
                        <div className="absolute bottom-6 left-6 z-20">
                          <h3 className="text-2xl font-bold text-white mb-1 font-montserrat tracking-tight">
                            {member.name}
                          </h3>
                          <span className="text-accent-light font-semibold text-sm font-montserrat tracking-wide">
                            {member.role}
                          </span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="lg:w-3/5 p-8 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-4 lg:hidden">
                            <div className="w-2 h-8 bg-secondary rounded-full"></div>
                            <div>
                              <h3 className="text-xl font-bold text-primary font-montserrat">
                                {member.name}
                              </h3>
                              <span className="text-secondary font-semibold text-sm font-montserrat">
                                {member.role}
                              </span>
                            </div>
                          </div>
                          
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={isExpanded ? 'expanded' : 'collapsed'}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                              className="mb-6"
                            >
                              <p className={`text-gray-700 leading-relaxed font-poppins ${
                                !isExpanded ? 'line-clamp-4' : ''
                              }`}>
                                {member.bio}
                              </p>
                            </motion.div>
                          </AnimatePresence>
                        </div>

                        <button
                          onClick={() => toggleExpand(member.id)}
                          className="flex items-center gap-2 text-secondary font-semibold text-sm hover:text-accent transition-all duration-300 font-montserrat group w-fit"
                        >
                          {isExpanded ? 'Show Less' : 'Read Full Bio'}
                          <motion.svg 
                            className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                          </motion.svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary-dark to-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.03] bg-[size:40px_40px]"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl relative z-10">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-light mb-6 font-script tracking-tight"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            Join Our Mission
          </motion.h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
          <motion.p
            className="text-xl mb-10 opacity-95 font-poppins leading-relaxed max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ delay: 0.2 }}
          >
            Support our dedicated staff as they nurture the next generation of Christian leaders and global citizens
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              onClick={() => navigate("/ChildSponsorship")}
              className="bg-white text-primary hover:bg-accent hover:text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl font-montserrat min-w-48"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Sponsor a Child
            </motion.button>
            <motion.button
              onClick={() => {}}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-bold py-4 px-8 rounded-2xl transition-all duration-300 font-montserrat min-w-48"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Donate Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Staff;