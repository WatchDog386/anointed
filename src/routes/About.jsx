import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import CEO from "../assets/chair.jpg";
import CTO from "../assets/madam.jpg";
import Group from "../assets/group.jpg";

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      delay,
    },
  }),
};

// Reveal wrapper
function RevealSection({ children, delay = 0 }) {
  const ref = useRef();
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={controls}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const team = [
    {
      name: "Abraham Ooro",
      role: "Founder & CEO",
      title: "Visionary Architect",
      image: CEO,
      bio: "10+ years in network infrastructure innovation. Passionate about creating seamless digital experiences.",
    },
    {
      name: "Zulfa George",
      role: "ACEO",
      title: "Network Innovator",
      image: CTO,
      bio: "Cybersecurity expert with a focus on next-gen network solutions.",
    },
  ];

  const stats = [
    { value: "15K+", label: "Networks Deployed" },
    { value: "98%", label: "Uptime Guarantee" },
    { value: "40+", label: "Countries Served" },
  ];

  const coreValues = [
    "Integrity",
    "Innovation",
    "Reliability",
    "Security",
    "Global Vision",
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen py-20 px-6 md:px-16 scroll-mt-24 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden"
    >
      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40],
              opacity: [0.8, 0],
              x: Math.random() > 0.5 ? [0, -10] : [0, 10],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <RevealSection>
          <div className="text-center mb-24">
            <motion.h2
              className="text-5xl font-bold leading-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Building the Future
              </span>
              <br />
              <span className="text-2xl font-light mt-2 block text-gray-300">
                of Global Connectivity
              </span>
            </motion.h2>
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto my-6 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            />
            <motion.p
              className="text-lg text-gray-300 max-w-3xl mx-auto mt-6 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Pioneering network solutions that empower businesses and connect communities through cutting-edge innovation and resilient infrastructure.
            </motion.p>
          </div>
        </RevealSection>

        {/* Team */}
        <RevealSection delay={0.3}>
          <div className="grid md:grid-cols-2 gap-12 mb-28">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="rounded-xl overflow-hidden shadow-lg bg-gray-900"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <img
                  src={member.image}
                  alt={member.role}
                  className="w-full h-96 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-cyan-400">{member.name}</h3>
                  <p className="text-gray-300">{member.role}</p>
                  <p className="text-sm text-gray-400 italic mt-1">{member.title}</p>
                  <p className="text-gray-300 text-sm mt-4">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </RevealSection>

        {/* Stats */}
        <RevealSection delay={0.5}>
          <div className="grid md:grid-cols-3 gap-10 text-center mb-28">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h4 className="text-4xl font-bold text-cyan-400">{stat.value}</h4>
                <p className="text-gray-300 mt-2 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </RevealSection>

        {/* Core Values */}
        <RevealSection delay={0.6}>
          <div className="text-center mb-28">
            <h3 className="text-3xl font-semibold mb-6 text-cyan-400">Our Core Values</h3>
            <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
              {coreValues.map((value, index) => (
                <motion.span
                  key={index}
                  className="px-6 py-2 rounded-full bg-gray-800 text-gray-200 text-sm font-medium border border-cyan-500"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {value}
                </motion.span>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* Group Image */}
        <RevealSection delay={0.7}>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src={Group}
              alt="Team group"
              className="w-full h-[500px] object-cover"
            />
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
