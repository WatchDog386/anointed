// src/components/Hero.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaFacebookSquare,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaWhatsapp,
  FaCross,
  FaGraduationCap,
  FaHandsHelping,
  FaChild,
} from "react-icons/fa";
import { Helmet } from "react-helmet";

const Hero = () => {
  const navigate = useNavigate();

  // === ROTATING HERO IMAGES ===
  const heroImages = [
    "/orphans.jpg",
    "/christian.jpg",
    "/project.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // === FEATURES (Why Support Us) – images removed ===
  const features = [
    {
      icon: <FaCross className="text-4xl text-[#932528]" />,
      title: "Faith-Based Learning",
      description:
        "We integrate Christian values and biblical principles throughout our curriculum to develop spiritually grounded students.",
    },
    {
      icon: <FaGraduationCap className="text-4xl text-[#932528]" />,
      title: "Academic Excellence",
      description:
        "Our rigorous curriculum challenges students to achieve their highest potential with a balanced approach to education.",
    },
    {
      icon: <FaHandsHelping className="text-4xl text-[#932528]" />,
      title: "Community Focus",
      description:
        "Our supportive Christian community fosters relationships that last a lifetime and create a sense of belonging.",
    },
    {
      icon: <FaChild className="text-4xl text-[#932528]" />,
      title: "Children & Youth Empowerment",
      description:
        "We empower young people with knowledge, skills, and confidence to become leaders who positively impact their communities.",
    },
  ];

  const missionSections = [
    {
      icon: <FaCross className="text-4xl text-[#2b473f]" />,
      title: "Sharing the Gospel",
      description: "We're growing God's Kingdom in Kenya, sharing the Good News with future generations.",
    },
    {
      icon: <FaGraduationCap className="text-4xl text-[#2b473f]" />,
      title: "Empowering Leaders",
      description: "We're empowering tomorrow's Christian leaders to fulfill a greater purpose in their communities.",
    },
    {
      icon: <FaHandsHelping className="text-4xl text-[#2b473f]" />,
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
          <span className="text-[#8CA9B4]">Invitation</span>
        </>
      ),
      description:
        "There are many ways to serve as God’s hands and feet. Consider making an impact by sponsoring a child, making a donation, or learn how to give in other ways.",
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

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Playfair+Display:wght@700;800&family=Ernest+Emily:wght@400&display=swap"
          rel="stylesheet"
        />
        <style>{`
          body { font-family: 'Montserrat', sans-serif; }
          .font-playfair { font-family: 'Playfair Display', serif; }
          .font-ernest { font-family: 'Ernest Emily', cursive; }
        `}</style>
      </Helmet>

      {/* === HERO SECTION === */}
      <section className="relative w-full min-h-[80vh] flex items-center justify-center text-white overflow-hidden">
        {/* Rotating Background Images */}
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
        <div className="absolute inset-0 z-10 bg-black bg-opacity-20"></div>

        <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6 sm:space-y-8"
          >
            <motion.h1
              variants={fadeIn}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-ernest"
              style={{ letterSpacing: "-0.02em" }}
            >
              Welcome to
            </motion.h1>

            <motion.h2
              variants={fadeIn}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              Anointed Vessels <br />
              Christian School
            </motion.h2>

            <motion.p
              variants={fadeIn}
              className="text-lg sm:text-xl md:text-2xl mt-6 max-w-2xl mx-auto"
            >
              Excellence in faith-based education for vulnerable children on Mfangano Island.
            </motion.p>

            <motion.div variants={fadeIn} className="mt-10">
              <button
                onClick={() => navigate("/about/our-story")}
                className="inline-block border-2 border-[#932528] text-[#932528] font-bold py-3 px-8 rounded-full hover:bg-[#8CA9B4] hover:text-white transition-all duration-300"
              >
                Our Story
              </button>
            </motion.div>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 flex justify-center gap-4"
          >
            {[
              { icon: <FaFacebookSquare size={24} />, link: "#" },
              { icon: <FaTwitter size={24} />, link: "#" },
              { icon: <FaInstagram size={24} />, link: "#" },
              { icon: <FaYoutube size={24} />, link: "#" },
              {
                icon: <FaWhatsapp size={24} color="#25D366" />,
                link: "https://wa.me/254726818938",
              },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
                aria-label="Social link"
              >
                {item.icon}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === WHY SUPPORT US (Images Removed) === */}
      <section className="w-full py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-[#2b473f] mb-4">
              WHY SUPPORT US
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
                className="bg-white rounded-xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                variants={fadeIn}
              >
                {/* Removed image container */}
                <div className="mb-3 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-bold text-[#2b473f] mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === CTA CARDS SECTION === */}
      <section className="w-full py-12 bg-white">
        <div className="container mx-auto px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 h-96">
            {ctaSections.map((cta, idx) => (
              <div
                key={idx}
                className={`relative overflow-hidden h-full ${idx > 0 ? "border-l border-gray-300" : ""}`}
              >
                <img
                  src={cta.image}
                  alt={typeof cta.title === "string" ? cta.title : "Call to action"}
                  className="w-full h-full object-cover"
                />
                <div
                  className={`absolute inset-0 flex flex-col justify-center items-center p-6 text-white ${
                    idx === 1 ? "bg-[#2b473f] bg-opacity-90" : "bg-black bg-opacity-50"
                  }`}
                >
                  <h3 className="text-2xl font-bold mb-4 text-center text-white">
                    {cta.title}
                  </h3>
                  {cta.description && (
                    <p className="text-sm mb-4 text-center text-white max-w-xs">
                      {cta.description}
                    </p>
                  )}
                  {cta.buttonText && (
                    <button
                      onClick={cta.onClick}
                      className="bg-white text-[#932528] font-semibold py-2 px-6 rounded-full hover:bg-[#8CA9B4] hover:text-white transition-all duration-300"
                    >
                      {cta.buttonText}
                    </button>
                  )}
                  {cta.linkText && (
                    <a
                      href={cta.link}
                      className="text-[#8CA9B4] underline mt-2"
                    >
                      {cta.linkText}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === MISSION SECTION === */}
      <section className="w-full py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {missionSections.map((section, idx) => (
              <div key={idx} className="text-center p-6">
                <div className="mb-4 flex justify-center">{section.icon}</div>
                <h3 className="text-xl font-bold text-[#2b473f] mb-3">
                  {section.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {section.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mb-12 max-w-4xl mx-auto">
            <p className="text-base md:text-lg text-gray-600">
              Anointed Vessels Christian School (AVCS) is a Christian boarding school in Kenya. AVCS was established following the HIV/AIDS crisis when our founders received God’s call to serve vulnerable and orphaned children. By offering love, nourishment, and a Christian education, we are growing faithful leaders who will carry His message throughout the world.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;