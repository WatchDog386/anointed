import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Phone, Mail, MapPin, Wrench, Wifi, Code2, Shield, Cloud,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const issues = [
  { value: "hardware", label: "Hardware", icon: <Wrench className="w-8 h-8 text-yellow-400" /> },
  { value: "networking", label: "Networking", icon: <Wifi className="w-8 h-8 text-green-400" /> },
  { value: "software", label: "Software", icon: <Code2 className="w-8 h-8 text-purple-400" /> },
  { value: "security", label: "Security", icon: <Shield className="w-8 h-8 text-red-500" /> },
  { value: "webdev", label: "Web Dev", icon: <Code2 className="w-8 h-8 text-pink-400" /> },
  { value: "cloud", label: "Cloud", icon: <Cloud className="w-8 h-8 text-blue-400" /> },
];

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issue: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.issue) {
      navigate(`/technicians/${formData.issue.toLowerCase()}`);
    } else {
      navigate("/technicians");
    }
  };

  return (
    <div className="min-h-screen px-6 pt-20 pb-0 bg-gradient-to-br from-gray-900 to-blue-900/10 text-white relative">
      <style>{`
        @keyframes move-line {
          0% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(100%) translateY(0); }
          50% { transform: translateX(100%) translateY(100%); }
          75% { transform: translateX(0) translateY(100%); }
          100% { transform: translateX(0) translateY(0); }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto relative z-10"
      >
        <h1 className="text-5xl font-bold text-center mb-10 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
          Contact Us
        </h1>

        {/* Contact Info Boxes */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[
            { icon: <Phone className="w-6 h-6 text-blue-400" />, text: "Knox: +254726818938 / 0724169963" },
            { icon: <Mail className="w-6 h-6 text-blue-400" />, text: "knoxvilletechnologies@gmail.com" },
            { icon: <MapPin className="w-6 h-6 text-blue-400" />, text: "LUCKY SUMMER-RUARAKA-Thoram House building postcode 29885-00100" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="flex items-center gap-4 p-4 bg-gray-800 rounded-xl border border-cyan-400 shadow-md hover:shadow-lg hover:scale-105 transition"
            >
              {item.icon}
              <span>{item.text}</span>
            </motion.div>
          ))}
        </div>

        {/* WhatsApp Quick Chat */}
        <div className="flex justify-center mb-12">
          <motion.a
            href="https://wa.me/254726818938"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="inline-flex items-center gap-3 bg-green-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-700 transition-colors duration-200 text-base sm:text-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <FaWhatsapp className="w-6 h-6 shrink-0" />
            <span className="whitespace-nowrap">Chat with us for instant help</span>
          </motion.a>
        </div>

        {/* FORM */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-10 rounded-3xl shadow-2xl space-y-8 relative overflow-hidden"
        >
          {/* Animated Border */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute w-full h-1 bg-cyan-400 animate-[move-line_6s_linear_infinite]" />
            <div className="absolute h-full w-1 bg-cyan-400 animate-[move-line_6s_linear_infinite] delay-[1.5s]" style={{ right: 0 }} />
            <div className="absolute w-full h-1 bg-cyan-400 animate-[move-line_6s_linear_infinite] delay-[3s]" style={{ bottom: 0 }} />
            <div className="absolute h-full w-1 bg-cyan-400 animate-[move-line_6s_linear_infinite] delay-[4.5s]" />
          </div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-4 rounded-xl bg-gray-800 placeholder-gray-400"
              required
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
            />
            <motion.input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-4 rounded-xl bg-gray-800 placeholder-gray-400"
              required
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {issues.map((issue) => (
              <motion.div
                key={issue.value}
                onClick={() => setFormData({ ...formData, issue: issue.value })}
                className={`cursor-pointer p-4 rounded-xl bg-gray-800 flex flex-col items-center gap-2 border-2 ${formData.issue === issue.value ? "border-cyan-400" : "border-transparent"} transition`}
                whileHover={{ scale: 1.05 }}
              >
                {issue.icon}
                <span>{issue.label}</span>
              </motion.div>
            ))}
          </div>

          <motion.textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="5"
            className="w-full p-4 rounded-xl bg-gray-800 placeholder-gray-400"
            required
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          />

          <motion.button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit & Find Technician
          </motion.button>
        </motion.form>

        <div className="mt-16 text-center text-gray-400 text-sm pb-10">
        
        </div>
      </motion.div>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/254726818938"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="w-6 h-6" />
      </a>
    </div>
  );
};

export default Contact;
