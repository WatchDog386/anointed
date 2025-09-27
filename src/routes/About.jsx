// src/components/About.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

export default function About() {
  // Reuse animation variants from Stories.jsx
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
        <title>About Us | Anointed Vessels Christian School</title>
        <meta
          name="description"
          content="Learn about our mission, vision, and values at Anointed Vessels Christian School — providing Christ-centered education to orphans and vulnerable children on Mfangano Island."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumbs */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-4 max-w-6xl">
            <nav className="text-sm text-gray-600 font-poppins">
              <Link to="/" className="hover:text-secondary transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-secondary font-medium">About Us</span>
            </nav>
          </div>
        </div>

        {/* About Intro */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeIn}
                >
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-primary font-script mb-4">
                    Our Humble Beginnings
                  </h1>
                  <h2 className="text-xl sm:text-2xl font-semibold text-secondary mb-4 font-montserrat">
                    Founded with Purpose in 2018
                  </h2>
                  <p className="mb-4 text-gray-700 font-poppins">
                    Anointed Vessels Christian School was established to{" "}
                    <strong>care for orphans and vulnerable children</strong>, releasing them from poverty-stricken families affected or infected with HIV/AIDS and other chronic illnesses.
                  </p>
                  <p className="mb-4 text-gray-700 font-poppins">
                    We prioritize orphans and vulnerable children in the Mfangano Island area and surroundings, providing them with boarding, education, protection, and Christian nurture.
                  </p>
                  <p className="mb-6 text-gray-700 font-poppins">
                    What began as a response to immediate needs has grown into a transformative ministry serving hundreds of children and families across Mfangano Island, offering both material care and spiritual hope.
                  </p>
                  <Link
                    to="/staff"
                    className="inline-block bg-accent hover:bg-accent/90 text-white font-semibold py-2 px-4 sm:py-2.5 sm:px-6 rounded-lg transition-all duration-300 font-montserrat text-sm sm:text-base"
                  >
                    Meet Our Staff
                  </Link>
                </motion.div>
              </div>
              <div className="flex-1">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeIn}
                  transition={{ delay: 0.2 }}
                >
                  <div className="rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <img
                      src="/support.jpg"
                      alt="AVCS Students receiving care"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-12 sm:py-16 bg-light">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <motion.div
              className="text-center mb-8 sm:mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-primary font-script mb-3 sm:mb-4">
                Our Mission & Vision
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-poppins">
                The guiding principles that shape everything we do
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {[
                {
                  title: "Our Mission",
                  icon: "🎯",
                  desc: "To provide excellence in Christ-centered education that equips students spiritually, academically, and socially to fulfill God's purpose for their lives.",
                },
                {
                  title: "Our Vision",
                  icon: "👁️",
                  desc: "To be a leading Christian educational institution that develops future leaders who transform their communities through faith, knowledge, and service.",
                },
                {
                  title: "Our Values",
                  icon: "❤️",
                  desc: "Faith, Excellence, Integrity, Compassion, and Service—these core values guide our interactions, decisions, and educational approach.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200"
                  variants={fadeIn}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-lg sm:text-xl font-semibold text-primary font-montserrat mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base font-poppins">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CEO Section */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 mx-auto rounded-full overflow-hidden shadow-xl mb-6">
                <img
                  src="/Jimmy.jpg"
                  alt="Jimmy Carter Owuato - Founding CEO"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-3xl sm:text-4xl font-normal text-primary font-script mb-2">
                Jimmy Carter
              </h2>
              <h3 className="text-xl sm:text-2xl text-secondary mb-6 font-montserrat">
                Founding CEO & Director
              </h3>
              <p className="text-gray-700 mb-6 max-w-3xl mx-auto font-poppins">
                Jimmy Carter is the visionary founder and CEO of Anointed Vessels Christian School, whose passion for vulnerable children stems from his own experiences growing up on Mfangano Island. After serving in the U.S. military, Jimmy felt called by God to return to his community and make a lasting difference in the lives of children affected by poverty, HIV/AIDS, and other challenges. His deep commitment to Christian education and holistic child development drives the school's mission to rescue children from desperate circumstances and provide them with hope, education, and a foundation in Christ.
              </p>
              <Link
                to="/board"
                className="inline-block bg-white border-2 border-accent text-accent hover:bg-accent hover:text-white font-semibold py-2 px-4 sm:py-2.5 sm:px-6 rounded-lg transition-all duration-300 font-montserrat text-sm sm:text-base"
              >
                Learn About Our Partners
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-12 sm:py-16 bg-light">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <motion.div
              className="text-center mb-8 sm:mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-primary font-script mb-3 sm:mb-4">
                Our Core Values & Focus Areas
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-poppins">
                The principles that guide our mission and daily operations
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {[
                {
                  title: "Care for Orphans & Vulnerable Children",
                  icon: "❤️",
                  desc: "Give priority to orphans and vulnerable children in the Mfangano Island area and surroundings. Provide them with boarding, education, protection, and Christian nurture.",
                },
                {
                  title: "Christian Discipleship & Biblical Foundation",
                  icon: "⛪",
                  desc: "Equip students with the Christian faith as a foundational part of their education. Instill Christian values and prepare students to be Christian leaders.",
                },
                {
                  title: "Education (Academic & Holistic Development)",
                  icon: "🎓",
                  desc: "Run a boarding school that focuses not just on academics but also on overall character formation. Provide facilities and associated infrastructure in a locally led way.",
                },
                {
                  title: "Local Leadership & Sustainability",
                  icon: "👥",
                  desc: "Emphasize 'locally led' governance, staffing, and decision-making, ensuring leadership is Kenyan, especially local.",
                },
                {
                  title: "Rescue & Hope",
                  icon: "🤝",
                  desc: "Go beyond survival by offering hope—both materially and spiritually—to children who have been marginalized.",
                },
                {
                  title: "Impact Beyond the School",
                  icon: "🌍",
                  desc: "Prepare graduates to impact Kenya and the world for God's Kingdom as future agents of change.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-secondary hover:border-accent transition-colors"
                  variants={fadeIn}
                >
                  <h3 className="font-semibold text-primary mb-3 flex items-start font-montserrat">
                    <span className="text-xl mr-2">{item.icon}</span>
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm font-poppins">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Staff CTA */}
        <section className="py-12 sm:py-16 text-white text-center bg-gradient-to-r from-primary to-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl sm:text-4xl font-normal mb-4 font-script">
                Meet Our Dedicated Team
              </h2>
              <p className="mb-8 opacity-90 font-poppins">
                Our staff members are committed to providing quality education and care to every child
              </p>
              <Link
                to="/staff"
                className="inline-block bg-white text-primary hover:bg-accent hover:text-white font-semibold py-2 px-4 sm:py-2.5 sm:px-6 rounded-full transition-all duration-300 font-montserrat text-sm sm:text-base"
              >
                View Our Staff Members
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Protection */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <motion.div
              className="text-center mb-8 sm:mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-primary font-script">
                Child Protection & Empowerment
              </h2>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeIn}
                >
                  <h3 className="text-2xl sm:text-3xl font-semibold text-primary mb-4 font-montserrat">
                    Our Commitment to Safety and Development
                  </h3>
                  <p className="mb-6 text-gray-700 font-poppins">
                    At Anointed Vessels Christian School, the safety, dignity, and well-being of every child are our highest priority. We believe that children are a gift from God and must be nurtured in a secure, loving, and Christ-centered environment.
                  </p>
                  <h4 className="font-semibold text-lg text-secondary mb-2 font-montserrat">
                    Child Protection Commitment
                  </h4>
                  <p className="mb-4 text-gray-700 font-poppins">
                    We provide a safe learning environment where all children are free from physical, emotional, spiritual, or sexual abuse, neglect, and exploitation.
                  </p>
                  <h4 className="font-semibold text-lg text-secondary mb-2 font-montserrat">
                    Child Empowerment Commitment
                  </h4>
                  <p className="text-gray-700 font-poppins">
                    We empower children with knowledge, life skills, and spiritual guidance to help them grow into responsible, confident, and God-fearing individuals.
                  </p>
                </motion.div>
              </div>
              <div className="flex-1">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeIn}
                  transition={{ delay: 0.2 }}
                >
                  <div className="rounded-xl overflow-hidden shadow-xl">
                    <img src="/project.jpg" alt="Children learning" className="w-full object-cover" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 sm:py-16 text-white text-center bg-gradient-to-r from-primary to-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal mb-6 font-script">
                Join Us in Our Mission
              </h2>
              <p className="text-base sm:text-lg mb-8 opacity-90 max-w-2xl mx-auto font-poppins">
                Your support helps us provide quality Christian education, protection, and empowerment to vulnerable children on Mfangano Island
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/ChildSponsorship"
                  className="inline-block bg-white border-2 border-white text-primary hover:bg-accent hover:text-white font-semibold py-2 px-4 sm:py-2.5 sm:px-6 rounded-full transition-all duration-300 font-montserrat text-sm sm:text-base"
                >
                  Sponsor a Child
                </Link>
                <a
                  href="mailto:info@anointedvessels.org"
                  className="inline-block bg-transparent border-2 border-white hover:bg-white hover:text-primary font-semibold py-2 px-4 sm:py-2.5 sm:px-6 rounded-full transition-all duration-300 font-montserrat text-sm sm:text-base"
                >
                  Partner With Us
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}