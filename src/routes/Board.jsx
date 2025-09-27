// src/components/Board.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
// Modern icons
import { 
  GraduationCap, 
  Utensils, 
  HandHeart, 
  BookOpen, 
  Mail, 
  Users,
  Building,
  HeartHandshake,
  Trophy,
  Lightbulb
} from "lucide-react";

const Board = () => {
  const navigate = useNavigate();

  // Animation variants (match Stories.jsx)
  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  // Unsplash image helper
  const getUnsplashImage = (keyword, id) => {
    const keywords = keyword.toLowerCase().replace(/\s+/g, '+').replace(/&/g, 'and');
    return `https://source.unsplash.com/600x700/?african,${keywords},professional&sig=${id}`;
  };

  const boardMembers = [
    {
      id: 1,
      name: "Jimmy Carter Owuato",
      role: "Director/Founder/CEO",
      image: getUnsplashImage("African male leader", 1),
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
      image: getUnsplashImage("African woman leader", 2),
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
      image: getUnsplashImage("African woman psychologist", 3),
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
      image: getUnsplashImage("African man with laptop", 4),
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
      image: getUnsplashImage("African woman educator", 5),
      bio: [
        "At Anointed Vessels Christian School, we are proud to be led by Director Edith Oulo, a dedicated and experienced educator passionate about empowering the next generation.",
        "Director Oulo holds a teaching qualification from Kamagambo Teachers' College. She has a strong background in education, having worked with Pamoja RDO and the Teachers Service Commission before joining our school.",
        "As Director of Anointed Vessels Christian School, Edith Oulo has shaped our vision and mission. Her experience in school administration has been invaluable in driving growth and excellence in our school community.",
        "Under Director Oulo's leadership, Anointed Vessels Christian School has continued to thrive, providing quality education and holistic development to our students. We are committed to empowering our students to reach their full potential and make a positive impact in their communities."
      ]
    }
  ];

  const partners = [
    { name: "GoFundMe", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/GoFundMe_logo.svg/1200px-GoFundMe_logo.svg.png", style: { height: "40px" } },
    { name: "World Food Programme", image: "https://www.wfp.org/themes/custom/wfp/images/wfp-logo.svg", style: { height: "40px" } },
    { name: "Global Empowerment Mission", image: "https://globalempowermentmission.org/wp-content/uploads/2021/03/GEM-Logo-White-BG.png", style: { height: "40px" } },
    { name: "Village Enterprise", image: "https://villageenterprise.org/wp-content/uploads/2021/05/VE-Logo-Color-RGB.png", style: { height: "40px" } }
  ];

  const impactStats = [
    { 
      icon: <GraduationCap className="w-10 h-10" />, 
      number: "500+", 
      label: "Children Educated", 
      description: "Providing quality education to release children from poverty" 
    },
    { 
      icon: <Utensils className="w-10 h-10" />, 
      number: "300+", 
      label: "Daily Meals", 
      description: "Ensuring proper nutrition for cognitive development" 
    },
    { 
      icon: <HandHeart className="w-10 h-10" />, 
      number: "200+", 
      label: "Families Supported", 
      description: "Empowering entire families through our programs" 
    },
    { 
      icon: <BookOpen className="w-10 h-10" />, 
      number: "95%", 
      label: "Success Rate", 
      description: "Students transitioning to secondary education" 
    }
  ];

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
              <Link to="/" className="hover:underline">Home</Link> / Our Board Members
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal mb-3 font-script">
              Our Board Members
            </h1>
            <p className="text-base sm:text-lg opacity-90 max-w-2xl mx-auto font-poppins">
              Meet the dedicated leaders guiding our mission to release children from poverty through education and empowerment
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partners Section */}
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
              Our Valued Partners
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto font-poppins">
              We are grateful for the support of these organizations in our mission
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 justify-items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                className="h-16 flex items-center justify-center opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
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
      <section className="py-12 sm:py-16 bg-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-primary mb-3 font-script">
              Our Board of Directors
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto font-poppins">
              Dedicated leaders guiding our mission to transform lives through education
            </p>
          </motion.div>

          <motion.div
            className="space-y-12 sm:space-y-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={staggerContainer}
          >
            {boardMembers.map((member, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={member.id}
                  className="flex flex-col md:flex-row items-center gap-6 sm:gap-8"
                  variants={fadeIn}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Image */}
                  <div className={`md:w-2/5 flex-shrink-0 overflow-hidden rounded-2xl shadow-lg transition-transform duration-500 hover:scale-[1.02] ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-auto object-cover"
                      onError={(e) => {
                        e.target.src = "https://source.unsplash.com/600x700/?african,professional&sig=fallback";
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className={`md:w-3/5 text-center md:text-left ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                    <h3 className="text-xl sm:text-2xl font-semibold text-primary mb-1 font-montserrat">
                      {member.name}
                    </h3>
                    <span className="text-secondary font-medium block mb-4 font-montserrat">
                      {member.role}
                    </span>
                    
                    <div className="space-y-3 text-gray-700 text-sm sm:text-base font-poppins">
                      {member.bio.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                    
                    <div className="mt-4 flex justify-center md:justify-start">
                      <a 
                        href={`mailto:info@anointedvessels.org?subject=Contact ${encodeURIComponent(member.name)}`}
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-secondary hover:text-white transition-colors"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Programs Impact Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-primary mb-3 font-script">
              Our Program Impact
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto font-poppins">
              Transforming lives through holistic education and empowerment
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-6 rounded-xl text-center shadow-sm hover:shadow-md transition-all duration-300 hover:bg-primary hover:text-white group"
                variants={fadeIn}
              >
                <div className="mb-4 flex justify-center text-secondary group-hover:text-white">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <h3 className="font-semibold mb-2 font-montserrat">{stat.label}</h3>
                <p className="text-sm opacity-90 font-poppins">{stat.description}</p>
              </motion.div>
            ))}
          </motion.div>
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
            Join Us in Transforming Lives
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg mb-8 opacity-90 font-poppins"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ delay: 0.2 }}
          >
            Your support helps us release children from poverty through education, nutrition, and holistic development programs
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

export default Board;