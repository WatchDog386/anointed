// src/components/Hero.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaCross,
  FaGraduationCap,
  FaHandsHelping,
  FaChild,
} from "react-icons/fa";
import { Helmet } from "react-helmet";

const Hero = () => {
  const navigate = useNavigate();

  // === ROTATING HERO IMAGES ===
  const heroImages = ["/orphans.jpg", "/christian.jpg", "/project.jpg"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // === FEATURES ===
  const features = [
    {
      icon: <FaCross className="text-4xl text-secondary" />,
      title: "Faith-Based Learning",
      description:
        "We integrate Christian values and biblical principles throughout our curriculum to develop spiritually grounded students.",
    },
    {
      icon: <FaGraduationCap className="text-4xl text-secondary" />,
      title: "Academic Excellence",
      description:
        "Our rigorous curriculum challenges students to achieve their highest potential with a balanced approach to education.",
    },
    {
      icon: <FaHandsHelping className="text-4xl text-secondary" />,
      title: "Community Focus",
      description:
        "Our supportive Christian community fosters relationships that last a lifetime and create a sense of belonging.",
    },
    {
      icon: <FaChild className="text-4xl text-secondary" />,
      title: "Children & Youth Empowerment",
      description:
        "We empower young people with knowledge, skills, and confidence to become leaders who positively impact their communities.",
    },
  ];

  const missionSections = [
    {
      icon: <FaCross className="text-4xl text-primary" />,
      title: "Sharing the Gospel",
      description: "We're growing God's Kingdom in Kenya, sharing the Good News with future generations.",
    },
    {
      icon: <FaGraduationCap className="text-4xl text-primary" />,
      title: "Empowering Leaders",
      description: "We're empowering tomorrow's Christian leaders to fulfill a greater purpose in their communities.",
    },
    {
      icon: <FaHandsHelping className="text-4xl text-primary" />,
      title: "Giving Hope",
      description: "We're teaching children about God's unconditional love and that in Him they find delight and hope.",
    },
  ];

  const ctaSections = [
    {
      image: "/christian.jpg",
      title: "Sponsor A Child",
      buttonText: "Start Today",
      onClick: () => navigate("/sponsor"),
    },
    {
      image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      title: (
        <>
          This is your <br />
          <span className="text-accent">Invitation</span>
        </>
      ),
      description:
        "There are many ways to serve as God's hands and feet. Consider making an impact by sponsoring a child, making a donation, or learn how to give in other ways.",
      linkText: "how to give in other ways",
      link: "/give",
    },
    {
      image: "/project.jpg",
      title: "Make A Donation",
      buttonText: "Give Now",
      onClick: () => navigate("/donate"),
    },
  ];

  // === ANIMATIONS ===
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };

  return (
    <>
      <Helmet>
        <title>Anointed Vessels Christian School | Excellence in Faith-Based Education</title>
        <meta
          name="description"
          content="Anointed Vessels Christian School empowers vulnerable children and families by breaking cycles of poverty through quality education, holistic growth, and skills development—nurturing future Christian leaders with hope and responsibility."
        />
        {/* GGCC uses Montserrat + Open Sans + Ernest Emily */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;500;600&family=Ernest+Emily&display=swap"
          rel="stylesheet"
        />
        <style>{`
          body { font-family: 'Open Sans', sans-serif; }
          .font-montserrat { font-family: 'Montserrat', sans-serif; }
          .font-ernest { font-family: 'Ernest Emily', cursive; }
        `}</style>
      </Helmet>

      {/* === HERO SECTION === */}
      <section className="relative w-full min-h-[80vh] flex items-end justify-start text-white overflow-hidden">
        {heroImages.map((img, idx) => (
          <motion.div
            key={idx}
            className="absolute inset-0 z-0"
            initial={{ opacity: idx === currentImageIndex ? 1 : 0 }}
            animate={{ opacity: idx === currentImageIndex ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src={img}
              alt={`Hero background ${idx + 1}`}
              className="w-full h-full object-cover object-top"
            />
          </motion.div>
        ))}
        {/* Gradient overlay similar to GGCC - darker at bottom */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-black/20 to-black/70"></div>

        <div className="relative z-20 text-left px-8 sm:px-12 lg:px-16 pb-16 sm:pb-20 lg:pb-24 max-w-4xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-4 sm:space-y-6"
          >
            <motion.h1
              variants={fadeIn}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] font-ernest text-white"
              style={{ 
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                fontWeight: '700'
              }}
            >
              Welcome to
            </motion.h1>

            <motion.h2
              variants={fadeIn}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-montserrat leading-[0.9] text-white"
              style={{ 
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                fontWeight: '700'
              }}
            >
              Anointed Vessels <br />
              Christian Center
            </motion.h2>

            <motion.div variants={fadeIn} className="mt-8">
              <button
                onClick={() => navigate("/about/our-story")}
                className="cta-button bg-accent hover:bg-accent/90 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 font-montserrat text-lg"
                style={{ fontWeight: '600' }}
              >
                Our Story
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* === WHY SUPPORT US === */}
      <section className="w-full py-16 bg-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-primary font-montserrat mb-4">
              WHY SUPPORT US
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-sans">
              Discover what makes our Christian educational approach unique and effective
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                variants={fadeIn}
              >
                <div className="mb-3 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-bold text-primary font-montserrat mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm font-sans">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === CTA CARDS SECTION (GGCC Layout) === */}
      <section className="w-full py-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {ctaSections.map((cta, idx) => (
            <div
              key={idx}
              className={`relative h-96 md:h-[500px] ${idx > 0 ? "border-l border-gray-300" : ""}`}
            >
              <img
                src={cta.image}
                alt={typeof cta.title === "string" ? cta.title : "Call to action"}
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 flex flex-col justify-center items-center p-6 text-white ${
                  idx === 1 ? "bg-primary bg-opacity-90" : "bg-black bg-opacity-50"
                }`}
              >
                <h3 className="text-2xl font-bold mb-4 text-center font-montserrat">
                  {cta.title}
                </h3>
                {cta.description && (
                  <p className="text-sm mb-4 text-center max-w-xs font-sans">
                    {cta.description}
                  </p>
                )}
                {cta.buttonText && (
                  <button
                    onClick={cta.onClick}
                    className="bg-white text-secondary font-semibold py-2 px-6 rounded-full hover:bg-accent hover:text-white transition-all duration-300 font-montserrat"
                  >
                    {cta.buttonText}
                  </button>
                )}
                {cta.linkText && (
                  <a href={cta.link} className="text-accent underline mt-2 font-montserrat">
                    {cta.linkText}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === MISSION SECTION === */}
      <section className="w-full py-12 bg-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {missionSections.map((section, idx) => (
              <div key={idx} className="text-center p-6">
                <div className="mb-4 flex justify-center">{section.icon}</div>
                <h3 className="text-xl font-bold text-primary font-montserrat mb-3">
                  {section.title}
                </h3>
                <p className="text-gray-600 text-sm font-sans">{section.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mb-12 max-w-4xl mx-auto">
            <p className="text-base md:text-lg text-gray-700 font-sans">
              Anointed Vessels Christian School (AVCS) is a Christian boarding school in Kenya. AVCS was established following the HIV/AIDS crisis when our founders received God's call to serve vulnerable and orphaned children. By offering love, nourishment, and a Christian education, we are growing faithful leaders who will carry His message throughout the world.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;