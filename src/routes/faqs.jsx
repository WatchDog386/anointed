import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Wifi, Clock, CreditCard, HardHat, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import CoverageMap from "./CoverageMap";

const faqsData = {
  Coverage: {
    icon: <Wifi className="w-5 h-5 text-cyan-400" />,
    items: [
      {
        question: "What areas do you currently serve in Nairobi?",
        answer: (
          <div className="space-y-4">
            <p>
              Our fiber network currently covers these key areas in Nairobi:
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                <h4 className="font-medium text-green-400 flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Available Now
                </h4>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                  <li>Westlands (100% coverage)</li>
                  <li>Kilimani (95% coverage)</li>
                  <li>Karen (85% coverage)</li>
                  <li>Lavington (90% coverage)</li>
                  <li>Parklands (80% coverage)</li>
                </ul>
              </div>
              <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/30">
                <h4 className="font-medium text-yellow-400 flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                  Coming Soon
                </h4>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                  <li>Runda (Q3 2024)</li>
                  <li>Kileleshwa (Q4 2024)</li>
                  <li>Langata (Q1 2025)</li>
                </ul>
              </div>
            </div>
            <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
              <h4 className="font-medium text-blue-400 flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Planned Expansion
              </h4>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li>Embakasi (2025)</li>
                <li>Kasarani (2025)</li>
                <li>Dagoretti (2026)</li>
              </ul>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium text-white flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-red-400" />
                Live Coverage Map
              </h4>
              <div className="h-48 rounded-lg overflow-hidden border border-white/10 mt-2">
                <CoverageMap interactive={false} />
              </div>
            </div>
          </div>
        ),
      },
      {
        question: "How do I check service availability for my address?",
        answer: (
          <div className="space-y-4">
            <p>
              You can check service availability through these methods:
            </p>
            <ol className="list-decimal pl-5 space-y-3 text-sm">
              <li>
                <strong>Interactive Map:</strong> Our live coverage map shows real-time availability with color-coded zones:
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li className="text-green-400">Green: Available now</li>
                  <li className="text-yellow-400">Yellow: Coming soon</li>
                  <li className="text-blue-400">Blue: Planned future expansion</li>
                </ul>
              </li>
              <li>
                <strong>Address Checker:</strong> Enter your exact address on our signup page
              </li>
              <li>
                <strong>On-Site Survey:</strong> Free professional surveys (typically within 72 hours)
              </li>
            </ol>
            <div className="bg-white/5 p-3 rounded-lg border border-white/10 text-xs">
              <p className="text-gray-400">
                <strong>Note:</strong> Some buildings may require additional construction.
              </p>
            </div>
          </div>
        ),
      },
      {
        question: "What's the timeline for new coverage areas?",
        answer: (
          <div className="space-y-4">
            <p>
              Our Nairobi expansion schedule for the next 24 months:
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-white/5 p-4 rounded-lg border border-yellow-500/20">
                <h4 className="font-medium text-yellow-400 text-sm">Q3-Q4 2024</h4>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                  <li>Runda Phase 1 completion</li>
                  <li>Kileleshwa core activation</li>
                  <li>Hurlingham expansion</li>
                </ul>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-blue-500/20">
                <h4 className="font-medium text-blue-400 text-sm">2025</h4>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                  <li>Embakasi corridor deployment</li>
                  <li>Kasarani infrastructure</li>
                  <li>Langata Phase 2 completion</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              <Link to="/expansion-plans" className="text-cyan-400 hover:underline">
                View detailed expansion roadmap with maps →
              </Link>
            </p>
          </div>
        ),
      },
    ],
  },
  Installation: {
    icon: <HardHat className="w-5 h-5 text-teal-400" />,
    items: [
      {
        question: "What's the installation process?",
        answer: "Our certified technicians handle everything from trenching to equipment setup, typically completing installations within 3-5 business days.",
      },
      {
        question: "Do I need special equipment?",
        answer: "We provide all necessary ONT equipment and routers certified for our 10Gbps network.",
      },
    ],
  },
  Billing: {
    icon: <CreditCard className="w-5 h-5 text-purple-400" />,
    items: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, ACH transfers, and offer automatic payment scheduling.",
      },
      {
        question: "Are there service contracts?",
        answer: "No long-term contracts - our month-to-month plans include professional installation at no extra cost.",
      },
    ],
  },
};

export default function Faqs() {
  const [activeCategory, setActiveCategory] = useState("Coverage");
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState("");

  const filteredFaqs = faqsData[activeCategory].items.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-16 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0LjVMMjQgMjEuNSAyMS41IDI0IDM0LjUgMzYgMzYgMzQuNXpNMTggMzYuNUwxMC41IDI4IDggMzAuNSAxNS41IDM5IDE4IDM2LjV6TTMwLjUgMTguNUwxOS41IDcuNSAxNyAxMCAyOCAyMSAzMC41IDE4LjV6TTM2IDE4LjVMMjQgNS41IDIxLjUgOCAzMy41IDIxIDM2IDE4LjV6TTE4IDMwLjVMMTAuNSAyMyA4IDI1LjUgMTUuNSAzMyAxOCAzMC41eiIvPjwvZz48L2c+PC9zdmc+')]"
        />
        
        {/* Corner Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-white mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Fiber Network Support
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Answers to common questions about our fiber optic services in Nairobi
          </motion.p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div 
          className="flex flex-wrap gap-2 justify-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {Object.entries(faqsData).map(([key, { icon }]) => (
            <motion.button
              key={key}
              onClick={() => {
                setActiveCategory(key);
                setOpenIndex(null);
                setSearch("");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                activeCategory === key
                  ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/20"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {icon}
              <span className="text-sm font-medium">{key}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Search */}
        <motion.div 
          className="max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder={`Search ${activeCategory} FAQs...`}
              className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 placeholder-gray-500 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </motion.div>

        {/* FAQ Grid */}
        <motion.div 
          className="grid md:grid-cols-2 gap-4 max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {filteredFaqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden"
                whileHover={{ y: -2 }}
              >
                <motion.button
                  className="w-full p-4 text-left flex justify-between items-start"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <div className="flex-1">
                    <h3 className="text-base font-medium text-white">
                      {faq.question}
                    </h3>
                    <AnimatePresence>
                      {openIndex === i && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ 
                            opacity: 1, 
                            height: "auto",
                            transition: { 
                              opacity: { duration: 0.3 },
                              height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                            }
                          }}
                          exit={{ 
                            opacity: 0, 
                            height: 0,
                            transition: { 
                              opacity: { duration: 0.2 },
                              height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                            }
                          }}
                          className="pt-3 text-gray-300 text-sm"
                        >
                          {typeof faq.answer === "string" ? (
                            <p>{faq.answer}</p>
                          ) : (
                            faq.answer
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    className="text-gray-400 ml-3"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Support CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
        >
          <div className="max-w-2xl mx-auto">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                transition: { 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut"
                }
              }}
            >
              <Clock className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
            </motion.div>
            <h3 className="text-xl font-semibold text-white mb-2">
              24/7 Technical Support
            </h3>
            <p className="text-gray-400 mb-4 text-sm">
              Need immediate assistance? Our fiber network experts are always available
            </p>
            <Link to="/contact">
              <motion.button 
                className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Support Now
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}