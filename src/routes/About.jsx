import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaNetworkWired,
  FaShieldAlt,
  FaCloud,
  FaGlobe,
  FaUsers,
  FaLightbulb,
} from "react-icons/fa";

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
    image: "/chair.jpg",
    bio: "Visionary leader with 15+ years in network infrastructure development.",
  },
  {
    name: "Zulfa George",
    role: "ACEO",
    image: "/madam.jpg",
    bio: "Expert in network security and large-scale infrastructure deployment.",
  },
];

const stats = [
  { value: "15K+", label: "Networks Deployed" },
  { value: "98%", label: "Uptime Guarantee" },
  { value: "40+", label: "Countries Served" },
  { value: "200+", label: "Satisfied Clients" },
];

function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-gray-900">
          <span className="text-red-500">KNOX</span>
          <span className="text-blue-500">VILLE</span>
        </Link>
        <nav className="space-x-6">
          {["Home", "About", "Services", "Contact"].map((text) => (
            <Link key={text} to={`/${text.toLowerCase()}`} className="text-gray-600 hover:text-blue-600">
              {text}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="pt-32 pb-20 bg-transparent text-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/network-bg.jpg')] bg-cover bg-center opacity-10" />
      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-red-500">About</span>{" "}
          <span className="text-blue-500">KNOXVILLE</span>
        </motion.h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We are a leading provider of innovative network infrastructure solutions, committed to delivering
          cutting-edge connectivity across Africa and beyond.
        </p>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="py-20 px-6 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-blue-600">Who We Are</h2>
          <p className="mb-4">
            KNOXVILLE is a premier network infrastructure company specializing in providing robust,
            scalable, and secure connectivity solutions.
          </p>
          <p className="mb-4">
            Founded in 2015, we have grown to become a trusted partner for businesses and
            organizations across multiple sectors.
          </p>
          <p>
            Our certified team brings decades of experience in network architecture, cybersecurity, and cloud.
          </p>
        </div>
        <div className="relative">
          <div className="bg-white rounded-xl overflow-hidden shadow-xl">
            <img
              src="/group.jpg"
              alt="Knoxville Team"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section className="py-20 bg-blue-50 text-gray-800">
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
              To be Africa's leading network infrastructure provider, bridging the digital divide and connecting
              the continent to global opportunities.
            </p>
          </div>
        </div>
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-xl border-l-4 border-blue-500 shadow-md">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaGlobe className="mr-3 text-blue-500" /> Global Reach
            </h3>
            <p>We deliver consistent quality and service wherever our clients need us.</p>
          </div>
          <div className="bg-white p-8 rounded-xl border-l-4 border-red-500 shadow-md">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaUsers className="mr-3 text-red-500" /> Client-Centric Approach
            </h3>
            <p>
              Our solutions are tailored to each client’s needs, ensuring maximum value and performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="py-20 bg-blue-100 text-gray-800">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500">
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
              <h3 className="text-xl font-bold mb-2">{value.title}</h3>
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
    <section className="py-20 px-6 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold mb-4 text-blue-500">Meet Our Leadership</h2>
        <p className="max-w-2xl mx-auto text-gray-600">
          Our team brings together diverse expertise and a shared passion for network innovation.
        </p>
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
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="py-20 bg-blue-50 text-gray-800">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="text-4xl font-bold mb-2 text-blue-500">{stat.value}</h4>
            <p className="text-lg text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-white text-gray-600 text-sm py-12 border-t border-blue-100">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            <span className="text-red-500">KNOX</span>
            <span className="text-blue-500">VILLE</span>
          </h3>
          <p className="mb-4">Leading network infrastructure solutions provider across Africa.</p>
          <p>© {new Date().getFullYear()} KNOXVILLE. All rights reserved.</p>
        </div>
        <div>
          <h4 className="text-gray-800 font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {["Home", "About Us", "Services", "Contact"].map((text) => (
              <li key={text}>
                <Link to={`/${text.toLowerCase().replace(/\s+/g, "")}`} className="hover:text-blue-500">
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-gray-800 font-bold mb-4">Services</h4>
          <ul className="space-y-2">
            <li><Link to="/services" className="hover:text-blue-500">Network Infrastructure</Link></li>
            <li><Link to="/services" className="hover:text-blue-500">Cloud Solutions</Link></li>
            <li><Link to="/services" className="hover:text-blue-500">Cybersecurity</Link></li>
            <li><Link to="/services" className="hover:text-blue-500">Managed Services</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-gray-800 font-bold mb-4">Contact</h4>
          <address className="not-italic">
            <p className="mb-2">Nairobi, Kenya</p>
            <p className="mb-2">knoxvilletechnologies.com</p>
            <p>+254 726818938</p>
          </address>
        </div>
      </div>
    </footer>
  );
}

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <Navbar />
      <Hero />
      <About />
      <Mission />
      <Values />
      <Team />
      <Stats />
      <Footer />
    </div>
  );
}
