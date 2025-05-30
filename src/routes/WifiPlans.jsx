import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Wifi, Clock, HardHat, CheckCircle, Zap } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Basic Plan",
    price: "Ksh 1,500",
    speed: "6Mbps",
    image: "/basicp.jpg",
    features: ["Great for browsing", "24/7 Support", "Free Installation"],
  },
  {
    name: "Essential Plan",
    price: "Ksh 1,999",
    speed: "10Mbps",
    image: "/essentialp.jpg",
    features: ["Streaming & Social Media", "24/7 Support", "Free Installation"],
  },
  {
    name: "Family Plan",
    price: "Ksh 2,499",
    speed: "15Mbps",
    image: "/familyp.jpg",
    features: ["Work from Home", "Streaming", "24/7 Support", "Free Installation"],
  },
  {
    name: "Smart Home Plan",
    price: "Ksh 2,999",
    speed: "20Mbps",
    image: "/streaming.jpg",
    features: ["Multiple Devices", "Low Latency", "24/7 Support", "Free Installation"],
  },
  {
    name: "Pro Streamer Plan",
    price: "Ksh 3,999",
    speed: "25Mbps",
    image: "/pros.jpg",
    features: ["Heavy Streaming", "Gaming Ready", "24/7 Support", "Free Installation"],
  },
  {
    name: "Ultra Plan",
    price: "Ksh 4,999",
    speed: "30Mbps",
    image: "/back.jpg",
    features: ["High-Speed Everything", "Gaming & 4K", "24/7 Support", "Free Installation"],
  },
];

const tableHeaders = ["Plan", "Speed", "Price", "Top Features"];

export default function WifiPlans() {
  const [flippedIndex, setFlippedIndex] = useState(null);

  const toggleFlip = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <section className="relative min-h-screen px-6 py-24 bg-animated-gradient overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-7xl mx-auto"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
          Wi-Fi Plans
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {plans.map((plan, index) => (
            <div
              key={index}
              onClick={() => toggleFlip(index)}
              className="perspective cursor-pointer"
            >
              <div className={`flip-card ${flippedIndex === index ? "flipped" : ""}`}>
                {/* Front */}
                <div className="flip-card-front bg-gray-900 rounded-xl shadow-xl overflow-hidden">
                  <img
                    src={plan.image}
                    alt={plan.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6 space-y-4 text-white">
                    <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-semibold">{plan.name}</h3>
                      <span className="bg-cyan-600 text-sm px-3 py-1 rounded-full">
                        {plan.speed}
                      </span>
                    </div>
                    <p className="text-cyan-400 font-bold text-xl">{plan.price}</p>
                    <p className="text-sm text-gray-300">Tap to flip & see features</p>
                  </div>
                </div>

                {/* Back */}
                <div className="flip-card-back bg-gray-900 rounded-xl shadow-xl p-6 text-white flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">{plan.name} Features</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-400 animate-pulse" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    to="/contact"
                    className="mt-6 inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-5 py-3 rounded-lg hover:shadow-lg transition"
                  >
                    Get Connected
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-24 p-4 animated-border rounded-xl bg-gray-900 shadow-2xl"
        >
          <h3 className="text-2xl text-center font-semibold text-white mb-6">
            Compare Plans
          </h3>
          <div className="overflow-auto rounded-lg">
            <table className="min-w-full text-sm text-white bg-gray-900 border border-gray-700">
              <thead className="bg-gray-800 text-cyan-300">
                <tr>
                  {tableHeaders.map((header, index) => (
                    <th key={index} className="px-6 py-4 text-left font-medium">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {plans.map((plan, index) => (
                  <tr key={index} className="border-t border-gray-700 hover:bg-gray-800">
                    <td className="px-6 py-4 font-semibold">{plan.name}</td>
                    <td className="px-6 py-4">{plan.speed}</td>
                    <td className="px-6 py-4">{plan.price}</td>
                    <td className="px-6 py-4">
                      <ul className="list-disc list-inside">
                        {plan.features.slice(0, 2).map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center text-gray-200 text-sm"
        >
          <p className="mb-4 text-lg">All our packages come with:</p>
          <ul className="mt-4 space-y-3">
            <li className="flex justify-center items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400 animate-ping-slow" />
              <span>24/7 Support</span>
            </li>
            <li className="flex justify-center items-center gap-2">
              <HardHat className="w-4 h-4 text-cyan-400 animate-ping-slow" />
              <span>Same-day Installation</span>
            </li>
            <li className="flex justify-center items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400 animate-ping-slow" />
              <span>&lt;5ms gaming latency</span>
            </li>
            <li className="flex justify-center items-center gap-2">
              <Wifi className="w-4 h-4 text-cyan-400 animate-ping-slow" />
              <span>Installation Fee: Ksh 2,000</span>
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
