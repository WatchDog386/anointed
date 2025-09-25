// src/components/About.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Helmet } from "react-helmet";

// Fade-in wrapper
const FadeIn = ({ children, delay = 0, className = "" }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | Anointed Vessels Christian School</title>
        <meta
          name="description"
          content="Learn about our mission, vision, and values at Anointed Vessels Christian School — providing Christ-centered education to orphans and vulnerable children on Mfangano Island."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <style>{`
          body { font-family: 'Open Sans', sans-serif; }
        `}</style>
      </Helmet>

      {/* Pure About Content — NO HERO */}
      <div className="min-h-screen bg-gray-50 font-sans">
        {/* Breadcrumbs */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-4 max-w-6xl">
            <nav className="text-sm text-gray-600">
              <Link to="/" className="hover:text-secondary transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-secondary font-medium">About Us</span>
            </nav>
          </div>
        </div>

        {/* About Intro */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <FadeIn delay={0.1}>
                  <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-montserrat">
                    Our Humble Beginnings
                  </h1>
                  <h2 className="text-xl font-semibold text-secondary mb-4 font-montserrat">
                    Founded with Purpose in 2018
                  </h2>
                  <p className="mb-4 text-gray-700">
                    Anointed Vessels Christian School was established to{" "}
                    <strong>care for orphans and vulnerable children</strong>, releasing them from poverty-stricken families affected or infected with HIV/AIDS and other chronic illnesses.
                  </p>
                  <p className="mb-4 text-gray-700">
                    We prioritize orphans and vulnerable children in the Mfangano Island area and surroundings, providing them with boarding, education, protection, and Christian nurture.
                  </p>
                  <p className="mb-6 text-gray-700">
                    What began as a response to immediate needs has grown into a transformative ministry serving hundreds of children and families across Mfangano Island, offering both material care and spiritual hope.
                  </p>
                  <Link to="/staff" className="cta-button">
                    Meet Our Staff
                  </Link>
                </FadeIn>
              </div>
              <div className="flex-1">
                <FadeIn delay={0.2}>
                  <div className="rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <img
                      src="/support.jpg"
                      alt="AVCS Students receiving care"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-light">
          <div className="container mx-auto px-4 max-w-6xl">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl font-bold text-primary mb-4 font-montserrat">
                Our Mission & Vision
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The guiding principles that shape everything we do
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <FadeIn key={idx} delay={0.1 * idx} className="group">
                  <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-secondary group-hover:border-accent">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-bold text-primary mb-3 font-montserrat">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CEO Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <FadeIn className="mb-10">
              <div className="w-48 h-48 md:w-60 md:h-60 mx-auto rounded-full overflow-hidden shadow-xl mb-6">
                <img
                  src="/Jimmy.jpg"
                  alt="Jimmy Carter Owuato - Founding CEO"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-3xl font-bold text-primary font-montserrat">Jimmy Carter</h2>
              <h3 className="text-xl text-secondary mb-6 font-montserrat">
                Founding CEO & Director
              </h3>
              <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
                Jimmy Carter is the visionary founder and CEO of Anointed Vessels Christian School, whose passion for vulnerable children stems from his own experiences growing up on Mfangano Island. After serving in the U.S. military, Jimmy felt called by God to return to his community and make a lasting difference in the lives of children affected by poverty, HIV/AIDS, and other challenges. His deep commitment to Christian education and holistic child development drives the school's mission to rescue children from desperate circumstances and provide them with hope, education, and a foundation in Christ.
              </p>
              <Link to="/board" className="cta-button--inverted">
                Learn About Our Partners
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-light">
          <div className="container mx-auto px-4 max-w-6xl">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl font-bold text-primary mb-4 font-montserrat">
                Our Core Values & Focus Areas
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The principles that guide our mission and daily operations
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <FadeIn key={idx} delay={0.05 * idx}>
                  <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-secondary hover:border-accent transition-colors">
                    <h3 className="font-bold text-lg text-primary mb-3 flex items-start font-montserrat">
                      <span className="text-xl mr-2">{item.icon}</span>
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Staff CTA */}
        <section className="py-20 text-white text-center bg-gradient-to-r from-primary to-secondary">
          <div className="container mx-auto px-4 max-w-3xl">
            <FadeIn>
              <h2 className="text-3xl font-bold mb-4 font-montserrat">Meet Our Dedicated Team</h2>
              <p className="mb-8 opacity-90">
                Our staff members are committed to providing quality education and care to every child
              </p>
              <Link
                to="/staff"
                className="inline-block bg-white text-primary hover:bg-accent hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 font-montserrat"
              >
                View Our Staff Members
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* Protection */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl font-bold text-primary font-montserrat">
                Child Protection & Empowerment
              </h2>
            </FadeIn>

            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <FadeIn delay={0.1}>
                  <h3 className="text-2xl font-bold text-primary mb-4 font-montserrat">
                    Our Commitment to Safety and Development
                  </h3>
                  <p className="mb-6 text-gray-700">
                    At Anointed Vessels Christian School, the safety, dignity, and well-being of every child are our highest priority. We believe that children are a gift from God and must be nurtured in a secure, loving, and Christ-centered environment.
                  </p>
                  <h4 className="font-bold text-lg text-secondary mb-2 font-montserrat">
                    Child Protection Commitment
                  </h4>
                  <p className="mb-4 text-gray-700">
                    We provide a safe learning environment where all children are free from physical, emotional, spiritual, or sexual abuse, neglect, and exploitation.
                  </p>
                  <h4 className="font-bold text-lg text-secondary mb-2 font-montserrat">
                    Child Empowerment Commitment
                  </h4>
                  <p className="text-gray-700">
                    We empower children with knowledge, life skills, and spiritual guidance to help them grow into responsible, confident, and God-fearing individuals.
                  </p>
                </FadeIn>
              </div>
              <div className="flex-1">
                <FadeIn delay={0.2}>
                  <div className="rounded-xl overflow-hidden shadow-xl">
                    <img src="/project.jpg" alt="Children learning" className="w-full object-cover" />
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 text-white text-center bg-gradient-to-r from-primary to-secondary">
          <div className="container mx-auto px-4 max-w-4xl">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-montserrat">
                Join Us in Our Mission
              </h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Your support helps us provide quality Christian education, protection, and empowerment to vulnerable children on Mfangano Island
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/ChildSponsorship" className="cta-button--inverted">
                  Sponsor a Child
                </Link>
                <a
                  href="mailto:info@anointedvessels.org"
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-primary font-semibold py-3 px-8 rounded-full transition-all duration-300 font-montserrat"
                >
                  Partner With Us
                </a>
              </div>
            </FadeIn>
          </div>
        </section>
      </div>
    </>
  );
}