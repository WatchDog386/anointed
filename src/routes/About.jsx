import React from "react";
import { motion } from "framer-motion";

// Image imports
import CEO from "../assets/CEO.jpg";
import CTO from "../assets/ACEO.jpg";
import Group from "../assets/group.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Matches Hero.jsx background: from-black via-gray-900 to-white
const gradientBackground =
  "linear-gradient(to bottom right, #000000, #111827, #ffffff)";

export default function About() {
  const team = [
    {
      role: "Founder & CEO",
      title: "Visionary Architect",
      alt: "CEO portrait",
      image: CEO,
      bio: "10+ years in network infrastructure innovation. Passionate about creating seamless digital experiences.",
    },
    {
      role: "CTO",
      title: "Network Innovator",
      alt: "CTO portrait",
      image: CTO,
      bio: "Cybersecurity expert with a focus on next-gen network solutions.",
    },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative min-h-screen py-24 px-6 md:px-16 scroll-mt-24 font-sans overflow-hidden"
      style={{ background: gradientBackground }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-20 mix-blend-soft-light">
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
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-white">
        <motion.div
          className="text-center mb-20"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            id="about-title"
            className="text-4xl md:text-6xl font-bold text-center mb-6"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Building the Future
            </span>
            <br />
            <span className="text-2xl md:text-4xl font-light mt-4 block">
              of Global Connectivity
            </span>
          </motion.h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            Pioneering network solutions that empower businesses and connect
            communities worldwide through cutting-edge technology and innovative
            infrastructure.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center mb-24"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-cyan-400/20">
                <img
                  src={member.image}
                  alt={member.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                  <h3 className="text-2xl font-bold text-cyan-400">
                    {member.role}
                  </h3>
                  <p className="text-gray-300 mt-1">{member.title}</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-sm p-8">
                  <p className="text-gray-200 text-center">{member.bio}</p>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-cyan-400/10 rounded-full blur-xl -z-10" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mb-24"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="relative rounded-[2rem] overflow-hidden border border-gray-700/50 hover:border-cyan-400/30 transition-all duration-300 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-500/5" />
            <div className="relative h-[500px] flex flex-col items-center justify-center p-12">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-cyan-400 mb-4">
                  Our Global Impact
                </h3>
                <div className="flex justify-center gap-8 flex-wrap">
                  {[
                    { value: "15K+", label: "Networks Deployed" },
                    { value: "98%", label: "Uptime Guarantee" },
                    { value: "40+", label: "Countries Served" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="p-4 bg-gray-900/50 rounded-xl backdrop-blur-sm border border-gray-700/50"
                    >
                      <div className="text-2xl font-bold text-cyan-400">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-300">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <img
                src={Group}
                alt="Global network infrastructure"
                className="w-full h-full object-cover rounded-xl border border-gray-700/50"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative rounded-[2rem] overflow-hidden border border-gray-700/50 hover:border-cyan-400/30 transition-all duration-300 bg-gray-900/30 backdrop-blur-sm"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="p-12 text-center">
            <h3 className="text-3xl font-bold text-cyan-400 mb-6">
              Our Core Values
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Innovation",
                  content: "Constantly pushing technological boundaries",
                  icon: "🚀",
                },
                {
                  title: "Integrity",
                  content: "Ethical practices in every connection",
                  icon: "🔒",
                },
                {
                  title: "Impact",
                  content: "Creating meaningful global change",
                  icon: "🌍",
                },
              ].map((value, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:bg-gray-700/20 transition-colors"
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h4 className="text-xl font-semibold mb-2">{value.title}</h4>
                  <p className="text-gray-300">{value.content}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
