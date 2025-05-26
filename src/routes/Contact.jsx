import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaNetworkWired,
  FaTools,
  FaLaptopCode,
  FaUserSecret,
  FaQuestionCircle,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { RiLoader5Fill } from "react-icons/ri";

const CyberInput = ({ label, ...props }) => (
  <motion.div whileHover={{ scale: 1.02 }} className="relative">
    <label className="text-sm font-medium text-cyan-300">{label}</label>
    <input
      {...props}
      className="w-full rounded-lg bg-gray-900/50 p-4 text-white backdrop-blur-xl border-2 border-cyan-500/30 transition-all placeholder:text-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
    />
  </motion.div>
);

const HolographicCard = ({ children, active, onClick }) => (
  <motion.div
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    className={`relative cursor-pointer rounded-xl p-4 backdrop-blur-xl border-2 transition-all ${
      active
        ? "border-cyan-400 bg-cyan-500/10"
        : "border-cyan-500/20 bg-gray-900/30"
    }`}
  >
    {children}
  </motion.div>
);

const issues = [
  { label: "Networking", value: "networking", icon: <FaNetworkWired /> },
  { label: "Hardware", value: "hardware", icon: <FaTools /> },
  { label: "Software", value: "software", icon: <FaLaptopCode /> },
  { label: "Security", value: "security", icon: <FaUserSecret /> },
  { label: "Web Dev", value: "webdev", icon: <FaLaptopCode /> },
  { label: "Custom", value: "custom", icon: <FaQuestionCircle /> },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    issue: "",
    custom: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef();
  const isInView = useInView(formRef, { margin: "-100px", once: true });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      navigate("/technicians");
    }, 2000);
  };

  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-white text-white p-4 sm:p-8">
      <motion.div
        className="max-w-2xl mx-auto space-y-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Quantum Connect
          </h1>
          <p className="text-lg text-gray-200 max-w-xl mx-auto">
            Bridge to our cybernetic support network through multidimensional
            interfaces
          </p>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-8 bg-gray-900/50 p-8 rounded-2xl backdrop-blur-lg border border-cyan-500/20 shadow-xl"
        >
          <CyberInput
            label="Neural Identifier"
            placeholder="Enter your full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <CyberInput
            label="Quantum Frequency"
            placeholder="Enter contact frequency"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <div className="space-y-4">
            <label className="text-sm font-medium text-cyan-300">
              Anomaly Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              {issues.map((issue) => (
                <HolographicCard
                  key={issue.value}
                  active={form.issue === issue.value}
                  onClick={() => setForm({ ...form, issue: issue.value })}
                >
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="text-2xl text-cyan-400">{issue.icon}</div>
                    <span className="font-medium text-cyan-100">
                      {issue.label}
                    </span>
                  </div>
                </HolographicCard>
              ))}
            </div>
          </div>

          {form.issue === "custom" && (
            <CyberInput
              label="Temporal Anomaly Description"
              placeholder="Describe your issue..."
              value={form.custom}
              onChange={(e) => setForm({ ...form, custom: e.target.value })}
            />
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={submitting}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold p-4 rounded-lg transition-all"
          >
            {submitting ? (
              <RiLoader5Fill className="animate-spin text-2xl" />
            ) : (
              <>
                <FaCheckCircle className="text-xl" />
                Submit Request
              </>
            )}
          </motion.button>
        </form>

        <hr className="border-t border-cyan-500/20 my-10" />

        <div className="rounded-xl bg-gradient-to-t from-black via-gray-900 to-white/10 p-6">
          <div className="text-center space-y-4 text-cyan-100/80">
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-cyan-400" />
                <span>Nairobi Neural Hub</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-cyan-400" />
                <span>+254 700 000 000</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-cyan-400" />
                <span>support@quantum.co.ke</span>
              </div>
            </div>

            <div className="flex justify-center gap-6 text-2xl">
              {[FaFacebook, FaTwitter, FaInstagram, FaWhatsapp].map(
                (Icon, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5, color: "#00f7ff" }}
                    className="text-cyan-100/60 cursor-pointer"
                  >
                    <Icon />
                  </motion.div>
                )
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
