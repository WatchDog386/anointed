import React from "react";
import { motion } from "framer-motion";
import {
  FaNetworkWired,
  FaShieldAlt,
  FaCloud,
  FaGlobe,
  FaUsers,
  FaLightbulb,
} from "react-icons/fa";
import Navbar from "../components/Navbar"; // Assuming Navbar is reusable

const values = [
  {
    icon: <FaShieldAlt className="text-3xl mb-4 text-red-500" />,
    title: "Integrity",
    description: "We uphold the highest ethical standards in all our operations and client interactions.",
  },
  {
    icon: <FaLightbulb className="text-3xl mb-4 text-orange-400" />,
    title: "Innovation",
    description: "We continuously explore new technologies to deliver cutting-edge solutions.",
  },
  {
    icon: <FaNetworkWired className="text-3xl mb-4 text-blue-500" />,
    title: "Reliability",
    description: "Our solutions are built to perform consistently under all conditions.",
  },
  {
    icon: <FaCloud className="text-3xl mb-4 text-green-500" />,
    title: "Excellence",
    description: "We strive for perfection in every aspect of our service delivery.",
  },
];

const team = [
  {
    name: "Abraham Ooro",
    role: "Founder & CEO",
    image: "/chair.webp",
    bio: "Visionary leader with 15+ years in network infrastructure development.",
  },
  {
    name: "Zulfa George",
    role: "AssCEO",
    image: "/madam.webp",
    bio: "Expert in network security and large-scale infrastructure deployment.",
  },
];

const stats = [
  { value: "15K+", label: "Networks Deployed" },
  { value: "98%", label: "Uptime Guarantee" },
  { value: "40+", label: "Countries Served" },
  { value: "200+", label: "Satisfied Clients" },
];

function About() {
  return (
    <section className="py-20 px-6 bg-white text-black">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-blue-600">Who We Are</h2>
          <p className="mb-4">
            Knoxville is a premier network infrastructure company specializing in providing robust, scalable, and secure connectivity solutions.
          </p>
          <p className="mb-4">
            Founded in 2024, we have grown to become a trusted partner for businesses and organizations across multiple sectors.
          </p>
          <p>
            Our certified technicians bring decades of experience in network architecture, cybersecurity.
          </p>
        </div>
        <div className="relative">
          <div className="bg-white rounded-xl overflow-hidden shadow-xl">
            <img src="/group.webp" alt="Knoxville Team" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section className="py-20 bg-blue-50 text-black">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-red-500">Our Mission</h2>
            <p>
              To empower businesses and communities through innovative, reliable, and secure network infrastructure solutions.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4 text-blue-500">Our Vision</h2>
            <p>
              To be Africa's leading network infrastructure provider, bridging the digital divide and connecting the continent to global opportunities.
            </p>
          </div>
        </div>
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-xl border-l-4 border-blue-500 shadow-md">
            <h3 className="text-xl font-bold mb-4 flex items-center text-blue-500">
              <FaGlobe className="mr-3" /> Global Reach
            </h3>
            <p>We deliver consistent quality and service wherever our clients need us.</p>
          </div>
          <div className="bg-white p-8 rounded-xl border-l-4 border-red-500 shadow-md">
            <h3 className="text-xl font-bold mb-4 flex items-center text-red-500">
              <FaUsers className="mr-3" /> Client-Centric Approach
            </h3>
            <p>Our solutions are tailored to each client’s needs, ensuring maximum value and performance.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="py-20 bg-blue-100 text-black">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-black">
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl border border-blue-200 hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {value.icon}
              <h3 className="text-xl font-bold mb-2 text-blue-600">{value.title}</h3>
              <p>{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="py-20 px-6 bg-white text-black">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold mb-4 text-blue-500">Meet Our Leadership</h2>
        <p className="max-w-2xl mx-auto">Our team brings together diverse expertise and a shared passion for network innovation.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {team.map((member, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="h-64 overflow-hidden">
              <img src={member.image} alt={`${member.name} photo`} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-red-500">{member.name}</h3>
              <p className="text-gray-500 mb-3">{member.role}</p>
              <p className="text-black text-sm">{member.bio}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="py-20 bg-blue-50 text-black">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="text-4xl font-bold mb-2 text-blue-500">{stat.value}</h4>
            <p className="text-lg">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <Navbar />
      <About />
      <Mission />
      <Values />
      <Team />
      <Stats />
    </div>
  );
}
