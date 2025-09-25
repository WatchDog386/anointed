// src/routes/Staff.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa';

const Staff = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedCards, setExpandedCards] = useState(new Set());

  // Fallback image path (ensure /placeholder-avatar.png exists in public/)
  const getSafeImageUrl = (imageName) => {
    // If it's already a full path (e.g., "/EAH%202.JPG"), use as-is
    if (imageName.startsWith('/')) return imageName;
    // Otherwise, assume it's in public/assets/images/staff/
    return `/assets/images/staff/${imageName}`;
  };

  const staffMembers = [
    {
      id: 1,
      name: "MD. Leah Onam",
      role: "Headteacher",
      category: "leadership",
      bio: "MD. Leah Onam provides visionary leadership to Anointed Vessels Christian School, ensuring that our educational programs align with our mission of holistic child development. With over 15 years of experience in education leadership, she brings wisdom and dedication to creating a nurturing learning environment. Her approach combines academic excellence with spiritual formation, ensuring that students receive a well-rounded education that prepares them for future success while grounding them in Christian values.",
      image: "/EAH%202.JPG"
    },
    {
      id: 2,
      name: "Mr. Erick",
      role: "Deputy Headteacher",
      category: "leadership",
      bio: "Mr. Erick supports the Headteacher in daily school operations and provides instructional leadership to our teaching staff. With expertise in curriculum development and student assessment, he ensures that our academic programs meet the highest standards. He is particularly passionate about creating inclusive learning environments where every child can thrive regardless of their background or learning style.",
      image: "/ERICK.JPG"
    },
    {
      id: 3,
      name: "Mr. Omodia",
      role: "Senior Teacher",
      category: "leadership",
      bio: "As our Senior Teacher, Mr. Omodia mentors junior staff and leads our professional development initiatives. He specializes in innovative teaching methodologies that engage students and promote deep learning. With a background in educational psychology, he understands how to create learning experiences that cater to different learning styles and abilities.",
      image: "/LBERT.JPG"
    },
    {
      id: 4,
      name: "Md. Elizabeth",
      role: "Financial Officer & Accountant",
      category: "support",
      bio: "Md. Elizabeth manages the school's financial resources with integrity and precision. Her careful stewardship ensures that funds are allocated effectively to support our educational mission and maintain our facilities. She works closely with the board to develop budgets that prioritize student needs while maintaining financial sustainability for the school's future.",
      image: "/LIZABETH.JPG"
    },
    {
      id: 5,
      name: "Mr. Alphonce Okuku",
      role: "School Chairperson",
      category: "support",
      bio: "Mr. Alphonce provides strategic leadership and governance oversight for the school. He works closely with the administration to ensure the school's mission is carried out effectively and sustainably. His commitment to Christian education and community development has been instrumental in the school's growth and impact.",
      image: "/ENARD.jpeg"
    },
    {
      id: 6,
      name: "Md. Ann",
      role: "Chef",
      category: "support",
      bio: "Md. Ann ensures that our students receive nutritious, well-balanced meals that support their growth and learning. Her culinary expertise and care for the children make meal times a cherished part of the school day. She takes pride in preparing meals that not only nourish the body but also reflect our commitment to holistic child development.",
      image: "/NN.JPG"
    },
    {
      id: 7,
      name: "Md. Sheryl",
      role: "Chef",
      category: "support",
      bio: "Md. Sheryl works alongside our kitchen team to prepare delicious and nutritious meals for our students. Her attention to dietary needs and food safety ensures that every child receives meals that support their health and well-being. She believes that good nutrition is fundamental to effective learning and overall child development.",
      image: "/HARON.JPG"
    },
    {
      id: 8,
      name: "Md. Nanzalla",
      role: "Teacher",
      category: "teaching",
      bio: "Md. Nanzalla creates engaging classroom environments where students feel safe to explore, question, and grow. She specializes in literacy development and uses creative approaches to instill a love of reading in her students. Her classroom is known for its warm, welcoming atmosphere where each child's unique talents are recognized and nurtured.",
      image: "/ANZALA.JPG"
    },
    {
      id: 9,
      name: "Md. Ephy",
      role: "Teacher",
      category: "teaching",
      bio: "Md. Ephy brings energy and creativity to her teaching practice. She specializes in hands-on learning experiences that help students connect classroom concepts to real-world applications. She is particularly skilled at differentiating instruction to meet the diverse needs of learners in her classroom.",
      image: "/PHY.JPG"
    },
    {
      id: 10,
      name: "Mr. Obunga",
      role: "Teacher",
      category: "teaching",
      bio: "Mr. Obunga specializes in mathematics and science education, making complex concepts accessible and exciting for students. He believes that every child can excel in STEM subjects with the right support and encouragement. His patient approach and clear explanations help build student confidence in these critical subject areas.",
      image: "/BUNGA.JPEG"
    },
    {
      id: 11,
      name: "Mr. Benard",
      role: "Computer Studies & Digital Literacy Tutor",
      category: "teaching",
      bio: "Mr. Benard prepares our students for the digital age through comprehensive technology education. He teaches essential computer skills, coding fundamentals, and digital citizenship. As the school's web developer and designer, he also maintains our online presence and develops digital resources to enhance learning.",
      image: "/ENARD.jpeg"
    },
    {
      id: 12,
      name: "Md. Queenter",
      role: "P1 Teacher",
      category: "teaching",
      bio: "Md. Queenter specializes in early childhood education, creating foundational learning experiences for our youngest students. Her patient and nurturing approach helps children develop essential skills while fostering a love for learning. She creates a classroom environment where children feel secure, valued, and excited to explore new concepts.",
      image: "/UEENTER.JPEG"
    },
    {
      id: 13,
      name: "Md. Queenter Ochieng'",
      role: "P1 Teacher",
      category: "teaching",
      bio: "Md. Queenter Ochieng' brings creativity and innovation to her teaching practice. She designs interactive lessons that engage young learners and build strong foundational skills. Her commitment to each child's individual growth ensures that students receive the support they need to succeed academically and socially.",
      image: "/UEENTER_OCHIENG.JPG"
    },
    {
      id: 14,
      name: "Md. Queenter Titus",
      role: "ECD",
      category: "teaching",
      bio: "Md. Queenter Titus specializes in early childhood development, creating engaging learning experiences that support holistic growth. Her approach balances structured learning with play-based activities that foster creativity and curiosity. She is passionate about helping young children develop the social, emotional, and cognitive skills needed for lifelong learning.",
      image: "/UEENTER_TITUS.JPG"
    },
    {
      id: 15,
      name: "Md. Cyprine",
      role: "ECD",
      category: "teaching",
      bio: "Md. Cyprine creates nurturing learning environments where our youngest students can thrive. Her gentle approach and understanding of child development help children build confidence and foundational skills. She believes that early childhood education should be a joyful experience that instills a lifelong love of learning.",
      image: "/YPRINE.JPG"
    },
    {
      id: 16,
      name: "Mr. Patrick Nyakwaka",
      role: "ECD",
      category: "teaching",
      bio: "Mr. Patrick Nyakwaka brings energy and enthusiasm to early childhood education. His interactive teaching style helps young learners develop essential skills while having fun. He is particularly skilled at creating inclusive classroom environments where every child feels valued and supported in their learning journey.",
      image: "/ATRICK.JPG"
    },
    {
      id: 17,
      name: "Md. Mercy",
      role: "ECD",
      category: "teaching",
      bio: "Md. Mercy creates warm, nurturing classroom environments where young children can explore and learn. Her patient approach and understanding of child development help students build strong foundations for future learning. She is committed to helping each child discover their unique talents and abilities in a supportive Christian environment.",
      image: "/MERCY.JPG"
    },
    {
      id: 18,
      name: "Mr. Vincent",
      role: "Scouting Teacher",
      category: "teaching",
      bio: "Mr. Vincent leads our scouting program, teaching students practical outdoor skills while fostering teamwork, leadership, and self-reliance. Through scouting activities, students develop character and learn to appreciate nature. His program emphasizes the importance of service to others and community engagement.",
      image: "/VINCENT.JPG"
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
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans pt-24 pb-16">
      {/* Page Banner */}
      <section className="relative bg-primary py-20 text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm text-accent mb-2 font-montserrat">
              <button 
                onClick={() => navigate('/')} 
                className="hover:underline focus:outline-none"
              >
                Home
              </button> / Our Staff
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 font-montserrat">
              Our Dedicated Staff
            </h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto font-sans">
              Meet the passionate educators who nurture our students' spiritual, physical, and cognitive development
            </p>
          </motion.div>
        </div>
      </section>

      {/* Staff Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3 font-montserrat">
              Our Educational Team
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto font-sans">
              Committed professionals guiding our students' holistic development
            </p>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-700 mb-3 font-sans">
              At Anointed Vessels Christian School, our staff members are the heart of our educational mission. Each educator brings unique gifts and dedication to creating a nurturing environment where children can flourish spiritually, academically, and socially.
            </p>
            <p className="text-gray-700 font-sans">
              Our team works collaboratively to ensure that every child receives personalized attention and support, helping them discover their God-given potential while developing strong character, critical thinking skills, and a lifelong love for learning.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 md:px-6 md:py-2.5 rounded-full font-medium text-sm md:text-base transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-secondary text-white'
                    : 'bg-white text-secondary border border-secondary'
                } hover:bg-accent hover:text-white font-montserrat`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>

          {/* Staff Grid */}
          {filteredStaff.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No staff members found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredStaff.map((member) => (
                <motion.div
                  key={member.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div 
                    className="h-56 bg-gray-200 bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url(${getSafeImageUrl(member.image)})`
                    }}
                  />
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-primary mb-1 font-montserrat">
                      {member.name}
                    </h3>
                    <span className="text-secondary font-medium text-sm block mb-3 font-montserrat">
                      {member.role}
                    </span>
                    
                    <AnimatePresence>
                      {expandedCards.has(member.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-gray-700 text-sm leading-relaxed mb-4 font-sans">
                            {member.bio}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <button
                      onClick={() => toggleExpand(member.id)}
                      className="text-secondary font-medium text-sm flex items-center hover:text-accent transition-colors font-montserrat"
                    >
                      {expandedCards.has(member.id) ? 'Show Less' : 'Read Bio'}
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
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.h2
            className="text-2xl md:text-3xl font-bold mb-4 font-montserrat"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Join Our Educational Mission
          </motion.h2>
          <motion.p
            className="text-lg mb-6 opacity-90 font-sans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Support our dedicated staff as they nurture the next generation of Christian leaders
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={() => navigate("/ChildSponsorship")}
              className="bg-white text-primary hover:bg-accent hover:text-white font-semibold py-2.5 px-6 md:px-8 rounded-full transition-all duration-300 mr-3 mb-2 md:mb-0 font-montserrat"
            >
              Sponsor a Child
            </button>
            <button
              onClick={() => {}}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-semibold py-2.5 px-6 md:px-8 rounded-full transition-all duration-300 font-montserrat"
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