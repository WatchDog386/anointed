// src/components/Board.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaUserTie,
  FaHistory,
  FaImages,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaGraduationCap,
  FaUtensils,
  FaHandsHelping,
  FaBookReader,
} from "react-icons/fa";

const Board = () => {
  const navigate = useNavigate();

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

  const boardMembers = [
    {
      id: 1,
      name: "Jimmy Carter Owuato",
      role: "Director/Founder/CEO",
      image: "JIMMY%20CARTER%20OWUATO.jpg",
      bio: [
        "Jimmy Carter Owuato is the founder and CEO of Anointed Vessels Christian School, a testament to his unwavering commitment to education and community development.",
        "Jimmy's educational journey began at Lanet Teachers College, where he earned a Certificate in Primary Education. He later pursued a Bachelor of Education in Early Childhood Development at Mount Kenya University, followed by a Master's in Education Leadership and Policy from the same institution. His academic pursuits also include a Master of Arts in Biblical Studies from Pan Africa Christian University.",
        "With over 15 years of experience in the education sector, Jimmy has served in various capacities, including as a teacher, headteacher, and education consultant. His passion for holistic education led him to establish Anointed Vessels Christian School, where he combines his educational expertise with his deep Christian faith to create a nurturing learning environment."
      ]
    },
    {
      id: 2,
      name: "Tonya Ivy",
      role: "Co-Founder Director",
      image: "TONYA%20IVY.jpg",
      bio: [
        "Director Tonya Ivy, Finance Director and Co-Founder of Anointed Vessels Christian School is a dedicated leader and passionate advocate for education and empowerment. 'Empowering young minds to shine for God's glory' is her guiding principle.",
        "With a dental hygiene background and extensive experience in financial management, Tonya has played a pivotal role in shaping the school's vision and programs. As the co-creator of the school's financial strategy, she has driven growth and sustainability, enabling the school to expand its reach and impact, and providing quality education and support to over 1,500 children in Kenya.",
        "Tonya's leadership has fueled the school's mission, and her expertise has secured critical funding and partnerships, enabling the school to continue its life-changing work. Her commitment to excellence and unwavering faith have earned her recognition as a trailblazer in her field. She is a sought-after speaker and mentor, inspiring others to embrace their purpose and make a meaningful difference.",
        "As Finance Director, Tonya oversees the school's financial operations, ensuring strategic resource allocation and sustainable growth. Her financial expertise propels the school's sustainable growth, and her passion for education and empowerment drives the school's mission forward.",
        "Tonya's leadership and expertise have been instrumental in shaping our school's vision and programs. Her dedication to our mission is inspiring, and her financial acumen has enabled us to reach even more children in Kenya.",
        "Join Tonya and the Anointed Vessels Christian School team in their mission to educate, empower, and inspire future generations. Together, we can make a lasting impact and bring hope to a world in need."
      ]
    },
    {
      id: 3,
      name: "Lotaya Julie Atieno",
      role: "Director Of Mental Health",
      image: "Latoya%20Julie%20Atieno.jpg",
      bio: [
        "Director Latoya Julie Atieno is a compassionate and visionary leader who dedicates her life to empowering others. With a warm smile and a heart full of love, she continues to touch the lives of countless individuals through her work in hospitality, caregiving, and advocacy.",
        "Latoya's journey in the service industry began at Salumeria, where she honed her skills in customer service and hospitality. She then moved on to Osteria del Chianti, followed by Tangeri, and later became the Manager at Majlis Resort in Lamu, overseeing the day-to-day operations and ensuring exceptional guest experiences.",
        "Her final stop in Kenya was Mediterraneo, where she further refined her expertise in hospitality management. Seeking new challenges, Latoya relocated to Germany, where she currently works as a caregiver assistant, providing compassionate support to individuals in need.",
        "In addition to her caregiving work, Latoya also worked at Einfach Hubertus, a restaurant in Germany, where she continued to apply her hospitality skills and connect with people from diverse backgrounds.",
        "Currently, Latoya serves as the Asylum Migration and Integration Fund (AMIF) program manager, working tirelessly to support refugees and asylum seekers navigating the complex process of integration. She is also the liaison for the Africans for Mental Health Advocacy program, advocating for increased awareness and support for mental health initiatives within African communities."
      ]
    },
    {
      id: 4,
      name: "Rogers Thiga Manyanki",
      role: "Director of Digital Marketing",
      image: "Rogers%20Thiga%20Manyanki.jpg",
      bio: [
        "Meet Rogers Thiga Manyanki, our talented Director of Digital Marketing at Anointed Vessels Christian School. With a strong background in science and research, Rogers brings a unique perspective to our marketing efforts.",
        "Originally from Kibera Slums, Rogers earned his Bachelor’s degree in Biotechnology and Research Science from Jomo Kenyatta University of Agriculture and Technology (JKUAT). He began his career in research science at Kenya Medical Research Institute as an intern and later led projects at Share the Love community-based organization, including the impactful Shoes for Schools Project.",
        "Rogers is passionate about harnessing the power of digital marketing to enhance the educational experience. He believes in leveraging innovative strategies to engage our community and showcase our students' talents. Our Headteacher, Leah Nunda, puts it best: \"Rogers has been instrumental in transforming our school's online presence. His expertise and creativity have significantly increased our engagement and outreach.\"",
        "Outside of work, Rogers enjoys traveling, photography, and volunteering with local non-profits. His diverse personality and commitment to giving back to the community make him a beloved member of our school family.",
        "Rogers' digital marketing efforts have made a significant impact on our school community, increasing student engagement by 50% and improving the overall online experience. Follow him on social media to stay up-to-date on his latest digital marketing efforts and insights, and discover how you can get involved in our school community!"
      ]
    },
    {
      id: 5,
      name: "Edith Oulo",
      role: "Director in Charge of Kenyans Operations",
      image: "EDITH%20OULO.jpg",
      bio: [
        "At Anointed Vessels Christian School, we are proud to be led by Director Edith Oulo, a dedicated and experienced educator passionate about empowering the next generation.",
        "Director Oulo holds a teaching qualification from Kamagambo Teachers' College. She has a strong background in education, having worked with Pamoja RDO and the Teachers Service Commission before joining our school.",
        "As Director of Anointed Vessels Christian School, Edith Oulo has shaped our vision and mission. Her experience in school administration has been invaluable in driving growth and excellence in our school community.",
        "Under Director Oulo's leadership, Anointed Vessels Christian School has continued to thrive, providing quality education and holistic development to our students. We are committed to empowering our students to reach their full potential and make a positive impact in their communities."
      ]
    }
  ];

  const partners = [
    { name: "GoFundMe", image: "GOFUNDME.png", style: { height: "40px" } },
    { name: "World Food Programme", image: "WFP.png", style: { height: "40px" } },
    { name: "Global Empowerment Mission", image: "GLOBAL%20EMP%20MISSION.png", style: { height: "40px" } },
    { name: "Village Enterprise", image: "Village-Enterprise_logo.png", style: { height: "40px" } }
  ];

  const impactStats = [
    { icon: <FaGraduationCap className="text-4xl text-secondary" />, number: "500+", label: "Children Educated", description: "Providing quality education to release children from poverty" },
    { icon: <FaUtensils className="text-4xl text-secondary" />, number: "300+", label: "Daily Meals", description: "Ensuring proper nutrition for cognitive development" },
    { icon: <FaHandsHelping className="text-4xl text-secondary" />, number: "200+", label: "Families Supported", description: "Empowering entire families through our programs" },
    { icon: <FaBookReader className="text-4xl text-secondary" />, number: "95%", label: "Success Rate", description: "Students transitioning to secondary education" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans pt-20">
      {/* Page Banner */}
      <section className="relative bg-primary py-24 text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm text-accent mb-2 font-montserrat">
              <Link to="/" className="hover:underline">Home</Link> / Our Board Members
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-montserrat">
              Our Board Members
            </h1>
            <p className="text-xl opacity-90 font-sans">
              Meet the dedicated leaders guiding our mission to release children from poverty through education and empowerment
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-montserrat">
              Our Valued Partners
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto font-sans">
              We are grateful for the support of these organizations in our mission
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                className="h-20 flex items-center justify-center opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                variants={fadeIn}
              >
                <img 
                  src={partner.image} 
                  alt={partner.name} 
                  className="max-h-full max-w-full object-contain"
                  style={partner.style}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Board Members Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-montserrat">
              Our Board of Directors
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto font-sans">
              Dedicated leaders guiding our mission to transform lives through education
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {boardMembers.map((member) => (
              <motion.div
                key={member.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                variants={fadeIn}
              >
                <div 
                  className="h-64 bg-gray-300 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{ backgroundImage: `url(${member.image})` }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-1 font-montserrat">
                    {member.name}
                  </h3>
                  <span className="text-secondary font-medium block mb-3 font-montserrat">
                    {member.role}
                  </span>
                  
                  <div className="space-y-2 text-gray-700 text-sm font-sans">
                    {member.bio.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex">
                    <a 
                      href="#" 
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-secondary hover:text-white transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <FaEnvelope />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Programs Impact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-montserrat">
              Our Program Impact
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto font-sans">
              Transforming lives through holistic education and empowerment
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-all duration-300 hover:bg-primary hover:text-white"
                variants={fadeIn}
              >
                <div className="mb-4 flex justify-center">{stat.icon}</div>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <h3 className="font-bold mb-2 font-montserrat">{stat.label}</h3>
                <p className="text-sm opacity-90 font-sans">{stat.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6 font-montserrat"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Join Us in Transforming Lives
          </motion.h2>
          <motion.p
            className="text-xl mb-8 opacity-90 font-sans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Your support helps us release children from poverty through education, nutrition, and holistic development programs
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={() => navigate("/ChildSponsorship")}
              className="bg-white text-primary hover:bg-accent hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 mr-4 font-montserrat"
            >
              Sponsor a Child
            </button>
            <button
              onClick={() => {}}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-semibold py-3 px-8 rounded-full transition-all duration-300 font-montserrat"
            >
              Donate Now
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Board;