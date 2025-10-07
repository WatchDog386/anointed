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
                    A Vision Born from Compassion and Faith
                  </h1>
                  <h2 className="text-xl sm:text-2xl font-semibold text-secondary mb-4 font-montserrat">
                    The Story of Anointed Vessels
                  </h2>
                  <p className="mb-4 text-gray-700 font-poppins">
                    Anointed Vessels Christian School stands as a living testimony of faith, resilience, and love for community. Founded by Jimmy Carter Owuato, the vision was not born in comfort or convenience — it was born from a heart that has known hardship, overcome adversity, and remained steadfast in service to others.
                  </p>
                  <p className="mb-4 text-gray-700 font-poppins">
                    Jimmy's journey began humbly in Kenya. Having grown up as an orphan, he understood firsthand the struggles faced by many children on Mfangano Island, where poverty, malnutrition, and the effects of HIV/AIDS continue to affect families deeply. Yet, through each season of his life, God was shaping in him a vessel of compassion and purpose.
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

        {/* Jimmy's Journey Section */}
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
                From Humble Beginnings to Global Experience
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-poppins">
                The journey that shaped our founder's vision
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div
                className="bg-white p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200"
                variants={fadeIn}
              >
                <h3 className="text-lg sm:text-xl font-semibold text-primary font-montserrat mb-4">
                  Early Foundations
                </h3>
                <p className="text-gray-600 text-sm sm:text-base font-poppins mb-4">
                  Jimmy's passion for education took root at Lanet Teachers Training School, where he developed the skills and calling that would one day form the foundation of Anointed Vessels.
                </p>
                <p className="text-gray-600 text-sm sm:text-base font-poppins">
                  His early professional journey began at Suba County Council, where his discipline and diligence opened doors to new opportunities. Later, he transitioned to Madison Insurance, rising from a financial advisor to a manager — a testament to his integrity, excellence, and leadership.
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200"
                variants={fadeIn}
              >
                <h3 className="text-lg sm:text-xl font-semibold text-primary font-montserrat mb-4">
                  International Service & Calling
                </h3>
                <p className="text-gray-600 text-sm sm:text-base font-poppins mb-4">
                  After relocating to the United States, Jimmy continued to excel, serving in reputable organizations like McKesson, and later, in the U.S. Army as a Nuclear Specialist and Supply Specialist.
                </p>
                <p className="text-gray-600 text-sm sm:text-base font-poppins">
                  Yet, even with such achievements abroad, his heart remained deeply connected to his homeland — to the children of Mfangano who lacked access to education, hope, and the basic necessities of life.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <motion.div
              className="text-center mb-8 sm:mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-primary font-script mb-3 sm:mb-4">
                Our Mission and Work
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-poppins">
                More than a school — a community of transformation
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {[
                {
                  title: "Quality Education",
                  icon: "🎓",
                  desc: "Offer affordable, quality education for children from low-income families.",
                },
                {
                  title: "Spiritual Mentorship",
                  icon: "⛪",
                  desc: "Provide spiritual mentorship, ensuring learning goes hand in hand with character formation.",
                },
                {
                  title: "Community Support",
                  icon: "🤝",
                  desc: "Support widows and families affected by HIV/AIDS, restoring hope and stability.",
                },
                {
                  title: "Holistic Development",
                  icon: "❤️",
                  desc: "Promote health, nutrition, and child well-being as key pillars of holistic development.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="bg-light p-6 rounded-lg shadow-sm border-l-4 border-secondary hover:border-accent transition-colors"
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

        {/* CEO Section */}
        <section className="py-12 sm:py-16 bg-light">
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
                Jimmy Carter Owuato
              </h2>
              <h3 className="text-xl sm:text-2xl text-secondary mb-6 font-montserrat">
                Founder & Visionary Leader
              </h3>
              <p className="text-gray-700 mb-6 max-w-3xl mx-auto font-poppins">
                Witnessing the continued suffering of widows, orphans, and persons with disabilities in his community, Jimmy felt an undeniable divine calling to return home and serve. This was not merely an emotional response — it was a spiritual assignment.
              </p>
              <p className="text-gray-700 mb-6 max-w-3xl mx-auto font-poppins">
                Jimmy's life embodies resilience and servant leadership. From his early struggles to his professional success and military service, his journey reflects what it means to be a true vessel — refined through trials, anointed for purpose. His return to Mfangano Island is not just a homecoming; it is a divine mission to uplift others through the same grace that lifted him.
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

        {/* Hope for Future Section */}
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
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-primary font-script mb-4">
                    Our Hope for the Future
                  </h2>
                  <p className="mb-6 text-gray-700 font-poppins">
                    Anointed Vessels Christian School continues to grow — brick by brick, prayer by prayer, and child by child. Though still developing, its foundation is firm: faith in God, love for people, and dedication to empowering the next generation.
                  </p>
                  <p className="mb-6 text-gray-700 font-poppins">
                    The dream is clear — to see every child on Mfangano Island equipped not only with academic knowledge but with spiritual wisdom and self-belief to rise above poverty and become leaders of positive change.
                  </p>
                  <div className="bg-light p-6 rounded-lg border-l-4 border-accent">
                    <p className="text-gray-700 italic font-poppins">
                      "We may start small, but when God anoints a vessel, even a drop of oil can overflow."
                    </p>
                    <p className="text-gray-600 mt-2 font-montserrat font-semibold">— Jimmy Carter Owuato</p>
                  </div>
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
                    <img src="/project.jpg" alt="Children learning at AVCS" className="w-full object-cover" />
                  </div>
                </motion.div>
              </div>
            </div>
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
                Join Our Journey of Transformation
              </h2>
              <p className="mb-8 opacity-90 font-poppins">
                Be part of a movement that's changing lives through education, faith, and community empowerment
              </p>
              <Link
                to="/staff"
                className="inline-block bg-white text-primary hover:bg-accent hover:text-white font-semibold py-2 px-4 sm:py-2.5 sm:px-6 rounded-full transition-all duration-300 font-montserrat text-sm sm:text-base"
              >
                Meet Our Dedicated Team
              </Link>
            </motion.div>
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
                Partner With Our Vision
              </h2>
              <p className="text-base sm:text-lg mb-8 opacity-90 max-w-2xl mx-auto font-poppins">
                Your support helps us continue building this beacon of hope for vulnerable children on Mfangano Island
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