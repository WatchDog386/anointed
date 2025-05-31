import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaNetworkWired,
  FaShieldAlt,
  FaCloud,
  FaServer,
  FaWifi,
  FaGlobe,
} from "react-icons/fa";

// Navbar Component
function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-gray-900">
          <span className="text-red-500">KNOX</span>
          <span className="text-orange-500">VILLE</span>
        </Link>
        <nav className="space-x-6">
          <Link to="/" className="text-gray-700 hover:text-black">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-black">About</Link>
          <Link to="/services" className="text-gray-700 hover:text-black">Services</Link>
          <Link to="/contact" className="text-gray-700 hover:text-black">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

// Services Data
const services = [
  {
    id: "network",
    title: "Network Infrastructure",
    description: "Design, implementation and management of robust network solutions for businesses of all sizes.",
    icon: <FaNetworkWired className="text-4xl text-red-500" />,
    features: [
      "Structured cabling solutions",
      "Wireless network deployment",
      "Network security implementation",
      "Performance optimization",
    ],
  },
  {
    id: "security",
    title: "Security Solutions",
    description: "Comprehensive cybersecurity measures to protect your digital assets and infrastructure.",
    icon: <FaShieldAlt className="text-4xl text-orange-500" />,
    features: [
      "Firewall implementation",
      "Intrusion detection systems",
      "Security audits",
      "Data protection",
    ],
  },
  {
    id: "cloud",
    title: "Cloud Services",
    description: "Scalable cloud computing solutions to enhance your business operations and flexibility.",
    icon: <FaCloud className="text-4xl text-blue-500" />,
    features: [
      "Cloud migration",
      "Hybrid cloud solutions",
      "Cloud security",
      "24/7 monitoring",
    ],
  },
  {
    id: "data-center",
    title: "Data Center Solutions",
    description: "Enterprise-grade data center services with maximum uptime and reliability.",
    icon: <FaServer className="text-4xl text-green-500" />,
    features: [
      "Colocation services",
      "Disaster recovery",
      "Data backup solutions",
      "Infrastructure management",
    ],
  },
  {
    id: "isp",
    title: "ISP Services",
    description: "High-speed internet connectivity solutions for businesses and residential areas.",
    icon: <FaWifi className="text-4xl text-purple-500" />,
    features: [
      "Fiber optic connectivity",
      "Wireless broadband",
      "Dedicated internet access",
      "Bandwidth management",
    ],
  },
  {
    id: "consulting",
    title: "IT Consulting",
    description: "Expert technology consulting to align your IT strategy with business goals.",
    icon: <FaGlobe className="text-4xl text-cyan-600" />,
    features: [
      "Technology roadmap",
      "IT infrastructure assessment",
      "Digital transformation",
      "Vendor management",
    ],
  },
];

// Service Card (no image)
function ServiceCard({ service }) {
  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow hover:shadow-lg transition-all"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex justify-center items-center bg-gray-100 h-32">
        {service.icon}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
        <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
        <ul className="space-y-2">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm">
              <span className="text-red-500 mr-2">•</span>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// Services Hero Section
function ServicesHero() {
  return (
    <section className="pt-32 pb-20 bg-white text-center">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-red-500">Our</span> <span className="text-orange-500">Services</span>
        </motion.h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive network infrastructure solutions tailored to your business needs
        </p>
      </div>
    </section>
  );
}

// All Services Display
function AllServices() {
  return (
    <section className="py-20 px-6 bg-white text-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-orange-500">What We Offer</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide end-to-end network infrastructure solutions that drive business growth and digital transformation.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 text-sm py-12 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            <span className="text-red-500">NOX</span><span className="text-orange-500">FILL</span>
          </h3>
          <p className="mb-4">Leading network infrastructure solutions provider across Africa.</p>
          <p>© {new Date().getFullYear()} KNOXVILLE. All rights reserved.</p>
        </div>
        <div>
          <h4 className="text-gray-900 font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-black">Home</Link></li>
            <li><Link to="/about" className="hover:text-black">About Us</Link></li>
            <li><Link to="/services" className="hover:text-black">Services</Link></li>
            <li><Link to="/contact" className="hover:text-black">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-gray-900 font-bold mb-4">Services</h4>
          <ul className="space-y-2">
            <li><Link to="/services" className="hover:text-black">Network Infrastructure</Link></li>
            <li><Link to="/services" className="hover:text-black">Security Solutions</Link></li>
            <li><Link to="/services" className="hover:text-black">Cloud Services</Link></li>
            <li><Link to="/services" className="hover:text-black">Data Center Solutions</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-gray-900 font-bold mb-4">Contact</h4>
          <address className="not-italic">
            <p className="mb-2">Nairobi, Kenya</p>
            <p className="mb-2">info@noxfill.com</p>
            <p>+254 700 000000</p>
          </address>
        </div>
      </div>
    </footer>
  );
}

// Final Page Export
export default function ServicesPage() {
  return (
    <div className="bg-white">
      <Navbar />
      <ServicesHero />
      <AllServices />
      <Footer />
    </div>
  );
}
