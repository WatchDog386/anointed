// src/components/Board.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
// ✅ Correct Lucide icons — all verified to exist
import { 
  GraduationCap, 
  Utensils, 
  HeartHandshake, 
  BookOpen, 
  Mail 
} from "lucide-react";

const Board = () => {
  const navigate = useNavigate();

  // EXACT same animation variants as Stories.jsx
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };

  // Unsplash placeholder images — replace later with your own
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
      bio: "Jimmy Carter Owuato is the founder and CEO of Anointed Vessels Christian School, a testament to his unwavering commitment to education and community development. With over 15 years of experience in the education sector, Jimmy has served as a teacher, headteacher, and education consultant. His passion for holistic, Christ-centered education led him to establish AVCS to serve orphans and vulnerable children on Mfangano Island."
    },
    {
      id: 2,
      name: "Tonya Ivy",
      role: "Co-Founder Director",
      image: getUnsplashImage("African woman leader", 2),
      bio: "Director Tonya Ivy is a dedicated leader and passionate advocate for education and empowerment. With a background in financial management, she co-founded AVCS and shaped its sustainable financial model. Her leadership has enabled the school to support over 1,500 children in Kenya through quality education, nutrition, and spiritual nurture."
    },
    {
      id: 3,
      name: "Lotaya Julie Atieno",
      role: "Director Of Mental Health",
      image: getUnsplashImage("African woman psychologist", 3),
      bio: "Director Latoya Julie Atieno brings compassion and expertise in mental health advocacy. With experience in caregiving and refugee support in Germany, she champions emotional well-being and trauma-informed care for our students, ensuring their holistic development in a safe, nurturing environment."
    },
    {
      id: 4,
      name: "Rogers Thiga Manyanki",
      role: "Director of Digital Marketing",
      image: getUnsplashImage("African man with laptop", 4),
      bio: "Rogers Thiga Manyanki leverages digital innovation to amplify AVCS’s mission. From Kibera Slums to leading our online outreach, Rogers uses storytelling and technology to connect supporters worldwide with the transformative work happening on Mfangano Island."
    },
    {
      id: 5,
      name: "Edith Oulo",
      role: "Director in Charge of Kenyan Operations",
      image: getUnsplashImage("African woman educator", 5),
      bio: "Director Edith Oulo ensures the smooth, locally-led operation of AVCS in Kenya. With deep roots in Kenyan education and administration, she upholds our commitment to community ownership, cultural relevance, and excellence in every aspect of school life."
    }
  ];

  const partners = [
    { name: "GoFundMe", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/GoFundMe_logo.svg/800px-GoFundMe_logo.svg.png" },
    { name: "World Food Programme", image: "https://www.wfp.org/themes/custom/wfp/images/wfp-logo.svg" },
    { name: "Global Empowerment Mission", image: "https://globalempowermentmission.org/wp-content/uploads/2021/03/GEM-Logo-White-BG.png" },
    { name: "Village Enterprise", image: "https://villageenterprise.org/wp-content/uploads/2021/05/VE-Logo-Color-RGB.png" }
  ];

  const impactStats = [
    { icon: <GraduationCap className="w-8 h-8 text-secondary" />, number: "500+", label: "Children Educated" },
    { icon: <Utensils className="w-8 h-8 text-secondary" />, number: "300+", label: "Daily Meals Served" },
    { icon: <HeartHandshake className="w-8 h-8 text-secondary" />, number: "200+", label: "Families Supported" },
    { icon: <BookOpen className="w-8 h-8 text-secondary" />, number: "95%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Banner */}
      <section className="relative bg-primary py-12 sm:py-16 text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="text-sm text-accent mb-2 font-montserrat">
              <Link to="/" className="hover:underline">Home</Link> / Our Board Members
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal mb-3 font-script">
              Our Board Members
            </h1>
            <p className="text-sm sm:text-base opacity-90 max-w-2xl mx-auto font-poppins">
              Meet the dedicated leaders guiding our mission to release children from poverty through education and empowerment
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partners */}
      <section className="w-full py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div
            className="text-center mb-8 sm:mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-primary font-script mb-3 sm:mb-4">
              Our Valued Partners
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-poppins">
              We are grateful for the support of these organizations in our mission
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 justify-items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
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
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Board Members - Alternating Layout */}
      <section className="w-full py-12 sm:py-16 bg-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div
            className="text-center mb-8 sm:mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-primary font-script mb-3 sm:mb-4">
              Our Board of Directors
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-poppins">
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
                  <div className={`md:w-3/5 text-center md:text-left ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                    <h3 className="text-xl sm:text-2xl font-semibold text-primary mb-2 font-montserrat">
                      {member.name}
                    </h3>
                    <span className="text-secondary font-medium block mb-4 font-montserrat">
                      {member.role}
                    </span>
                    <p className="text-gray-700 mb-5 leading-relaxed font-poppins">
                      {member.bio}
                    </p>
                    <a 
                      href={`mailto:info@anointedvessels.org?subject=Contact ${encodeURIComponent(member.name)}`}
                      className="inline-flex items-center text-secondary hover:text-accent transition-colors font-montserrat"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Contact
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="w-full py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div
            className="text-center mb-8 sm:mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-primary font-script mb-3 sm:mb-4">
              Our Program Impact
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-poppins">
              Transforming lives through holistic education and empowerment
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-6 rounded-xl text-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                variants={fadeIn}
              >
                <div className="mb-3 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-2 font-montserrat">
                  {stat.number}
                </div>
                <p className="text-gray-700 text-sm sm:text-base font-poppins">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-12 sm:py-16 text-white text-center bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal mb-6 font-script">
              Join Us in Transforming Lives
            </h2>
            <p className="text-sm sm:text-base mb-8 opacity-90 max-w-2xl mx-auto font-poppins">
              Your support helps us release children from poverty through education, nutrition, and holistic development programs
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate("/ChildSponsorship")}
                className="inline-block bg-accent hover:bg-accent/90 text-white font-semibold py-2 px-4 sm:py-2.5 sm:px-6 rounded-lg transition-all duration-300 font-montserrat text-sm sm:text-base"
              >
                Sponsor a Child
              </button>
              <button
                onClick={() => {}}
                className="inline-block bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-semibold py-2 px-4 sm:py-2.5 sm:px-6 rounded-lg transition-all duration-300 font-montserrat text-sm sm:text-base"
              >
                Donate Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Board;