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
    type: "home"
  },
  {
    name: "Essential Plan",
    price: "Ksh 1,999",
    speed: "10Mbps",
    image: "/essentialp.jpg",
    features: ["Streaming & Social Media", "24/7 Support", "Free Installation"],
    type: "home"
  },
  {
    name: "Family Plan",
    price: "Ksh 2,499",
    speed: "15Mbps",
    image: "/familyp.jpg",
    features: ["Work from Home", "Streaming", "24/7 Support", "Free Installation"],
    type: "home"
  },
  {
    name: "Smart Home Plan",
    price: "Ksh 2,999",
    speed: "20Mbps",
    image: "/streaming.jpg",
    features: ["Multiple Devices", "Low Latency", "24/7 Support", "Free Installation"],
    type: "home"
  },
  {
    name: "Pro Streamer Plan",
    price: "Ksh 3,999",
    speed: "25Mbps",
    image: "/pros.jpg",
    features: ["Heavy Streaming", "Gaming Ready", "24/7 Support", "Free Installation"],
    type: "home"
  },
  {
    name: "Ultra Plan",
    price: "Ksh 4,999",
    speed: "30Mbps",
    image: "/back.webp",
    features: ["High-Speed Everything", "Gaming & 4K", "24/7 Support", "Free Installation"],
    type: "home"
  },
  // New business plans
  {
    name: "Business Basic",
    price: "Ksh 8,000",
    speed: "50Mbps",
    image: "/business-basic.jpg",
    features: ["5 IP phones", "3 Static IPs", "Priority support", "99.5% uptime"],
    type: "business"
  },
  {
    name: "Business Plus",
    price: "Ksh 15,000",
    speed: "100Mbps",
    image: "/business-plus.jpg",
    features: ["10 IP phones", "5 Static IPs", "Dedicated line", "99.9% uptime"],
    type: "business"
  },
  {
    name: "Enterprise",
    price: "Custom",
    speed: "500Mbps+",
    image: "/enterprise.jpg",
    features: ["Unlimited IP phones", "10+ Static IPs", "SLA guarantee", "24/7 monitoring"],
    type: "enterprise"
  }
];

const tableHeaders = ["Plan", "Speed", "Price", "Top Features"];

export default function WifiPlans() {
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [showForm, setShowForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    connectionType: ''
  });

  const toggleFlip = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setFormData(prev => ({
      ...prev,
      connectionType: plan.name
    }));
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Updated WhatsApp number: 07 2689 6562 -> country code 254726896562
    const whatsappNumber = "254726896562";
    const message = `New Connection Request:%0A%0A` +
                   `*Name:* ${formData.name}%0A` +
                   `*Phone:* ${formData.phone}%0A` +
                   `*Email:* ${formData.email}%0A` +
                   `*Location:* ${formData.location}%0A` +
                   `*Connection Type:* ${formData.connectionType}%0A%0A` +
                   `I would like to get connected!`;
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      connectionType: ''
    });
    setShowForm(false);
    setSelectedPlan(null);
  };

  const filteredPlans = plans.filter(plan => plan.type === activeTab);

  return (
    <section className="relative min-h-screen px-6 py-24 bg-white overflow-hidden text-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-7xl mx-auto"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
          Internet Plans
        </h2>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg bg-gray-200 p-1">
            <button
              onClick={() => setActiveTab("home")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === "home" ? "bg-blue-600 text-white" : "text-gray-700 hover:text-gray-900"}`}
            >
              Home Plans
            </button>
            <button
              onClick={() => setActiveTab("business")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === "business" ? "bg-blue-600 text-white" : "text-gray-700 hover:text-gray-900"}`}
            >
              Business Plans
            </button>
            <button
              onClick={() => setActiveTab("enterprise")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === "enterprise" ? "bg-blue-600 text-white" : "text-gray-700 hover:text-gray-900"}`}
            >
              Enterprise
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPlans.map((plan, index) => (
            <div
              key={index}
              onClick={() => toggleFlip(index)}
              className="perspective cursor-pointer"
            >
              <div className={`flip-card ${flippedIndex === index ? "flipped" : ""}`}>
                {/* Front */}
                <div className="flip-card-front bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                  <img
                    src={plan.image}
                    alt={plan.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6 space-y-4 text-gray-900">
                    <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-semibold">{plan.name}</h3>
                      <span className="bg-cyan-600 text-white text-sm px-3 py-1 rounded-full">
                        {plan.speed}
                      </span>
                    </div>
                    <p className="text-cyan-600 font-bold text-xl">{plan.price}</p>
                    <p className="text-sm text-gray-500">Tap to flip & see features</p>
                  </div>
                </div>

                {/* Back */}
                <div className="flip-card-back bg-white rounded-xl shadow-xl p-6 border border-gray-200 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">{plan.name} Features</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlanSelect(plan);
                    }}
                    className="mt-6 w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-5 py-3 rounded-lg hover:shadow-lg transition"
                  >
                    Get Connected
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Connection Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Get {selectedPlan?.name}</h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                    <input
                      type="text"
                      name="location"
                      required
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Connection Type</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 cursor-not-allowed"
                      value={formData.connectionType}
                      readOnly
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-6.29-3.062c-.545 0-1-.448-1-1s.445-1 1-1c.552 0 1 .448 1 1s-.443 1-1 1m4 0c-.545 0-1-.448-1-1s.445-1 1-1c.552 0 1 .448 1 1s-.443 1-1 1m2.005 9.644c-.366-.01-1.422-.361-2.053-.616l-.086-.035c-.487-.199-1.153-.473-1.623-.762-.543-.333-.915-.669-1.279-1.141-.432-.561-.757-1.236-.964-1.821l-.013-.034c-.309-.84-.175-1.579.024-2.192l.013-.034c.099-.24.26-.624.26-.624s-.159-.397-.198-.606c-.04-.209-.05-.359-.099-.568-.05-.208-.248-.52-.446-.669-.198-.149-.471-.258-.97-.258-.322 0-.644.025-.966.074-.309.05-.619.124-.929.198-.396.099-1.108.347-1.564.644-.447.297-.828.694-1.04 1.141-.223.471-.347 1.033-.347 1.702 0 .669.124 1.379.471 2.118l.013.034c.396.941 1.104 2.06 1.806 2.809.744.793 1.678 1.416 2.488 1.821l.074.037c.669.322 1.847.793 2.379.941.396.112.828.174 1.213.174.57 0 1.074-.062 1.49-.211.446-.16.832-.471 1.104-.941.272-.471.347-1.033.248-1.604-.074-.458-.322-.907-.644-1.191a1.49 1.49 0 00-.793-.347c-.124-.025-.223-.033-.322-.033" />
                    </svg>
                    Send via WhatsApp
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-24 p-4 rounded-xl bg-white shadow-2xl border border-gray-200"
        >
          <h3 className="text-2xl text-center font-semibold text-gray-900 mb-6">
            Compare Plans
          </h3>
          <div className="overflow-auto rounded-lg">
            <table className="min-w-full text-sm text-gray-900 bg-white border border-gray-200">
              <thead className="bg-gray-100 text-gray-900">
                <tr>
                  {tableHeaders.map((header, index) => (
                    <th key={index} className="px-6 py-4 text-left font-medium">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredPlans.map((plan, index) => (
                  <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">{plan.name}</td>
                    <td className="px-6 py-4">{plan.speed}</td>
                    <td className="px-6 py-4">{plan.price}</td>
                    <td className="px-6 py-4">
                      <ul className="list-disc list-inside text-gray-700">
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
          className="mt-20 text-center text-gray-700 text-sm"
        >
          <p className="mb-4 text-lg">All our packages come with:</p>
          <ul className="mt-4 space-y-3">
            <li className="flex justify-center items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-500 animate-ping-slow" />
              <span>24/7 Support</span>
            </li>
            <li className="flex justify-center items-center gap-2">
              <HardHat className="w-4 h-4 text-cyan-500 animate-ping-slow" />
              <span>Same-day Installation</span>
            </li>
            <li className="flex justify-center items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-500 animate-ping-slow" />
              <span>&lt;5ms gaming latency</span>
            </li>
            <li className="flex justify-center items-center gap-2">
              <Wifi className="w-4 h-4 text-cyan-500 animate-ping-slow" />
              <span>Installation Fee: Ksh 2,000</span>
            </li>
          </ul>
        </motion.div>

        {/* Business Features Section */}
        {activeTab !== "home" && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 bg-gray-50 rounded-xl p-8 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Business Solutions Features</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6-622 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">SLA Guarantee</h4>
                <p className="text-gray-700">99.9% uptime with compensation for downtime</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Dedicated Support</h4>
                <p className="text-gray-700">Priority technical support with direct line</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">IP Telephony</h4>
                <p className="text-gray-700">VoIP phone systems with multiple extensions</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
