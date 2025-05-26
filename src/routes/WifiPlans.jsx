import React from "react";
import { Link } from "react-router-dom";
import { Wifi, Clock, HardHat, CheckCircle, Zap } from "lucide-react";

// Updated image imports
import basicp from "../assets/basicp.jpg";
import essentialp from "../assets/essentialp.jpg";
import familyp from "../assets/familyp.jpg";
import pros from "../assets/pros.jpg";
import back from "../assets/back.jpg";
import browsing from "../assets/streaming.jpg";

const plans = [
  {
    name: "Basic Plan",
    price: "Ksh 1,500",
    speed: "6Mbps",
    image: basicp,
    features: ["Great for browsing", "24/7 Support", "Free Installation"],
  },
  {
    name: "Essential Plan",
    price: "Ksh 1,999",
    speed: "10Mbps",
    image: essentialp,
    features: ["Streaming & Social Media", "24/7 Support", "Free Installation"],
  },
  {
    name: "Family Plan",
    price: "Ksh 2,499",
    speed: "15Mbps",
    image: familyp,
    features: [
      "Work from Home",
      "Streaming",
      "24/7 Support",
      "Free Installation",
    ],
  },
  {
    name: "Smart Home Plan",
    price: "Ksh 2,999",
    speed: "20Mbps",
    image: browsing,
    features: [
      "Multiple Devices",
      "Low Latency",
      "24/7 Support",
      "Free Installation",
    ],
  },
  {
    name: "Pro Streamer Plan",
    price: "Ksh 3,999",
    speed: "25Mbps",
    image: pros,
    features: [
      "Heavy Streaming",
      "Gaming Ready",
      "24/7 Support",
      "Free Installation",
    ],
  },
  {
    name: "Ultra Plan",
    price: "Ksh 4,999",
    speed: "30Mbps",
    image: back,
    features: [
      "High-Speed Everything",
      "Gaming & 4K",
      "24/7 Support",
      "Free Installation",
    ],
  },
];

export default function WifiPlans() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-500 to-white px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Wi-Fi Plans
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700"
            >
              <img
                src={plan.image}
                alt={`${plan.name} illustration`}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-white">
                    {plan.name}
                  </h3>
                  <span className="bg-cyan-600 text-white text-sm px-3 py-1 rounded-full">
                    {plan.speed}
                  </span>
                </div>
                <p className="text-cyan-400 font-bold text-xl">{plan.price}</p>
                <ul className="space-y-2 text-sm text-gray-300">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="inline-block mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-5 py-3 rounded-lg hover:scale-105 transition-transform"
                >
                  Get Connected
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center text-gray-700 text-sm">
          <p>All our packages come with:</p>
          <ul className="mt-4 space-y-2">
            <li className="flex justify-center items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-600" />
              <span>24/7 Support</span>
            </li>
            <li className="flex justify-center items-center gap-2">
              <HardHat className="w-4 h-4 text-cyan-600" />
              <span>Same-day Installation</span>
            </li>
            <li className="flex justify-center items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-600" />
              <span>&lt;5ms gaming latency</span>
            </li>
            <li className="flex justify-center items-center gap-2">
              <Wifi className="w-4 h-4 text-cyan-600" />
              <span>Installation Fee: Ksh 2,000</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
