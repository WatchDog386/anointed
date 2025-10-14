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
      image:"/Leah.JPG"
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
      name: "Mr. Albert",
      role: "Senior Teacher",
      category: "leadership",
      bio: "As our Senior Teacher, Mr. Albert mentors junior staff and leads curriculum development initiatives. With a Master's in Education and specialized training in child psychology, he creates learning environments that cater to diverse learning styles and abilities.",
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
      image:"/OKUKU.JPG"
    },
    {
      id: 6,
      name: "Md. Ann",
      role: "Chef",
      category: "support",
      bio: "Md. Ann ensures that our students receive nutritious, balanced meals that support their growth and learning. With formal training in nutrition and child dietary requirements, she creates menus that are both healthy and appealing to young palates.",
      image:"/Ann.JPG"
    },
    {
  id: 7,
  name: "Md. Nanzala",
  role: "P1 Teacher",
  category: "teaching",
  bio: "Md. Nanzala is a committed P1 teacher who creates engaging and learner-centered lessons that promote understanding and confidence among pupils. With a passion for holistic development, she inspires learners to think critically and apply knowledge in real-life situations.",
  image: "/Nanzala.JPG"
},
{
  id: 8,
  name: "Md. Quinter Titus",
  role: "ECD Teacher",
  category: "teaching",
  bio: "Md. Quinter is a nurturing ECD teacher dedicated to building strong learning foundations in young children. She uses play-based learning and interactive activities to promote creativity, social skills, and early literacy and numeracy development.",
  image: "/QUEENTERTITUS.JPG"
},
{
  id: 9,
  name: "Md. Syprine",
  role: "ECD Teacher",
  category: "teaching",
  bio: "Md. Syprine is an enthusiastic ECD teacher who fosters a warm and inclusive classroom atmosphere. Her approach emphasizes hands-on learning and emotional growth, ensuring that every child feels valued and supported in their learning journey.",
  image: "/Syprine.JPG"
},
{
  id: 10,
  name: "Mr. Patrick",
  role: "ECD Teacher",
  category: "teaching",
  bio: "Mr. Patrick is a passionate ECD educator who focuses on developing young learners’ curiosity and confidence through creative teaching methods. He integrates storytelling, art, and play to make learning enjoyable and meaningful for every child.",
  image: "/Patrick.JPG"
},
{
  id: 11,
  name: "Md. Mercy",
  role: "ECD Teacher",
  category: "teaching",
  bio: "Md. Mercy is a caring and creative ECD teacher who believes in nurturing the whole child—academically, socially, and emotionally. Through fun, interactive lessons, she helps children discover the joy of learning and develop essential early life skills.",
  image: "/Mercy.JPG"
},

{
      id: 12,
name: "Md. Ephy",
role: "Teacher",
category: "teaching",
bio: "Md. Ephy is a dedicated P1 teacher specializing in Mathematics and Science. She plans and delivers engaging lessons that promote critical thinking, problem-solving, and practical application of knowledge. Passionate about nurturing curiosity and excellence, she creates a positive and inclusive learning environment that supports every learner’s growth.",
image: "/Ephy.JPG"

    },
{
  id: 13,
  name: "Mr. Constantine",
  role: "P1 Teacher",
  category: "teaching",
  bio: "Mr. Constantine is a devoted P1 teacher who brings energy and creativity into the classroom. He focuses on building strong academic foundations while nurturing discipline, confidence, and a love for learning among his pupils through interactive and learner-centered teaching methods.",
  image: "/Obunga.JPG"
},

{
  id: 14,
  name: "Md. Sheila",
  role: "Chef",
  category: "support",
  bio: "Md. Sheila is a skilled and passionate chef dedicated to preparing nutritious and well-balanced meals for both learners and staff. She ensures hygiene, quality, and variety in every meal, creating a warm dining experience that supports the school’s commitment to health and wellness.",
  image: "/Sheila.JPG"
},

{
  id: 15,
  name: "Benard",
  role: "Computer and Digital Literacy Tutor",
  category: "teaching",
  bio: "Benard is a skilled Computer and Digital Literacy tutor who equips learners with essential 21st-century technological skills. His lessons combine practical learning and creativity, enabling students to confidently use computers and digital tools for research, communication, and problem-solving.",
  image: "/Benard.JPG"
},

{
  id: 19,
  name: "Md. Quinter",
  role: "P1 Teacher",
  category: "teaching",
  bio: "Md. Quinter is a dedicated P1 teacher who fosters a supportive and engaging learning environment. She is passionate about helping learners build strong academic foundations through interactive lessons that inspire confidence, creativity, and a love for learning.",
  image: "/QINTER.JPG"
}



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
    <div className="min-h-screen bg-white font-sans pt-24 pb-16">
      {/* Clean Page Banner */}
      <section className="relative bg-gradient-to-r from-primary to-primary-dark py-16 sm:py-20 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="text-sm text-accent-light mb-3 font-montserrat font-medium">
              <button onClick={() => navigate('/')} className="hover:underline transition-all duration-300">
                Home &gt; Our Staff
              </button> 
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal mb-4 font-script">
              Our Dedicated Staff
            </h1>
            <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-lg opacity-95 max-w-2xl mx-auto font-poppins leading-relaxed">
              Meet the passionate educators and professionals who nurture our students' holistic development
            </p>
          </motion.div>
        </div>
      </section>

      {/* Staff Intro */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-primary mb-4 font-script">
              Our Educational Team
            </h2>
            <div className="w-16 h-0.5 bg-secondary mx-auto mb-6"></div>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto font-poppins leading-relaxed">
              Committed professionals guiding our students' holistic development
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto text-center mb-16 bg-gray-50 rounded-2xl p-8 border border-gray-100"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <p className="text-gray-700 mb-4 text-lg leading-relaxed font-poppins">
              At Anointed Vessels Christian School, our staff are the heart of our mission. Each team member brings unique gifts and professional expertise to create a nurturing environment where children flourish spiritually, academically, and socially.
            </p>
          </motion.div>

          {/* Category Filter */}
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
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 font-montserrat border ${
                  activeCategory === category.id
                    ? 'bg-secondary border-secondary text-white shadow-md'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-secondary hover:text-secondary'
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {category.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Compact Staff Layout */}
          {filteredStaff.length === 0 ? (
            <motion.div 
              className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <p className="text-gray-600 text-lg font-poppins">No staff members found in this category.</p>
            </motion.div>
          ) : (
            <div className="grid gap-6 sm:gap-8">
              {filteredStaff.map((member) => {
                const isExpanded = expandedCards.has(member.id);
                return (
                  <motion.div
                    key={member.id}
                    className={`bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 ${
                      isExpanded ? 'ring-2 ring-secondary/20 shadow-lg' : 'shadow-md hover:shadow-lg'
                    }`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={cardVariants}
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Compact Image Section */}
                      <div className="md:w-1/3 lg:w-1/4 relative">
                        <div className="aspect-[3/4] relative overflow-hidden bg-gray-100">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-contain p-2"
                            onError={(e) => {
                              e.target.src = "https://source.unsplash.com/400x500/?portrait,professional,educator&sig=" + member.id;
                            }}
                          />
                        </div>
                        {/* Name and Role overlay for mobile */}
                        <div className="md:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <h3 className="text-lg font-bold text-white mb-1 font-montserrat">
                            {member.name}
                          </h3>
                          <span className="text-accent-light font-semibold text-sm font-montserrat">
                            {member.role}
                          </span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="md:w-2/3 lg:w-3/4 p-6 md:p-8 flex flex-col">
                        <div className="flex-1">
                          {/* Name and Role for desktop */}
                          <div className="hidden md:flex items-center gap-3 mb-4">
                            <div className="w-1.5 h-6 bg-secondary rounded-full"></div>
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
                              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                              className="mb-4"
                            >
                              <p className={`text-gray-700 leading-relaxed font-poppins ${
                                !isExpanded ? 'line-clamp-3' : ''
                              }`}>
                                {member.bio}
                              </p>
                            </motion.div>
                          </AnimatePresence>
                        </div>

                        <button
                          onClick={() => toggleExpand(member.id)}
                          className="flex items-center gap-2 text-secondary font-semibold text-sm hover:text-accent transition-all duration-300 font-montserrat group w-fit mt-2"
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

      {/* Clean Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-normal mb-6 font-script"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            Join Our Mission
          </motion.h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-8"></div>
          <motion.p
            className="text-lg mb-8 opacity-95 font-poppins leading-relaxed max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ delay: 0.2 }}
          >
            Support our dedicated staff as they nurture the next generation of Christian leaders
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
              className="bg-white text-primary hover:bg-accent hover:text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg font-montserrat"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sponsor a Child
            </motion.button>
            <motion.button
              onClick={() => {}}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-bold py-3 px-6 rounded-xl transition-all duration-300 font-montserrat"
              whileHover={{ scale: 1.05 }}
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