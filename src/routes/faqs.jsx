import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Wifi, Clock, CreditCard, HardHat } from "lucide-react";
import { Link } from "react-router-dom"; // ✅ Added for routing

const faqsData = {
  Coverage: {
    icon: <Wifi className="w-6 h-6 text-blue-500" />,
    items: [
      {
        question: "What areas do you currently serve?",
        answer:
          "We provide fiber optic coverage to residential areas within Knox County, with expansion plans to neighboring counties through 2025.",
      },
      {
        question: "How do I check service availability?",
        answer:
          "Use our online coverage map or contact our sales team for a professional site survey.",
      },
    ],
  },
  Installation: {
    icon: <HardHat className="w-6 h-6 text-teal-500" />,
    items: [
      {
        question: "What's the installation process?",
        answer:
          "Our certified technicians handle everything from trenching to equipment setup, typically completing installations within 3-5 business days.",
      },
      {
        question: "Do I need special equipment?",
        answer:
          "We provide all necessary ONT equipment and routers certified for our 10Gbps network.",
      },
    ],
  },
  Billing: {
    icon: <CreditCard className="w-6 h-6 text-purple-500" />,
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards, ACH transfers, and offer automatic payment scheduling.",
      },
      {
        question: "Are there service contracts?",
        answer:
          "No long-term contracts - our month-to-month plans include professional installation at no extra cost.",
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
    <section className="min-h-screen bg-gradient-to-br from-white via-gray-900 to-black py-24 px-4 sm:px-6 lg:px-8 text-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Fiber Network Support
          </h2>
          <p className="text-lg text-gray-300">
            Answers to common questions about our fiber optic services
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {Object.entries(faqsData).map(([key, { icon }]) => (
            <button
              key={key}
              onClick={() => {
                setActiveCategory(key);
                setOpenIndex(null);
                setSearch("");
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                activeCategory === key
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {icon}
              <span className="font-medium">{key}</span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder={`Search ${activeCategory} FAQs...`}
              className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 placeholder-gray-400 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* FAQ Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredFaqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white/10 backdrop-blur-md rounded-xl shadow-md border border-white/20"
              >
                <button
                  className="w-full p-6 text-left flex justify-between items-start"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">
                      {faq.question}
                    </h3>
                    <AnimatePresence>
                      {openIndex === i && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-4 text-gray-300"
                        >
                          {faq.answer}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    className="text-gray-400 ml-4"
                  >
                    <ChevronDown className="w-6 h-6" />
                  </motion.div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Support CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-16 text-center bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20"
        >
          <div className="max-w-2xl mx-auto">
            <Clock className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-2">
              24/7 Technical Support
            </h3>
            <p className="text-gray-300 mb-4">
              Need immediate assistance? Our fiber network experts are always
              available
            </p>

            {/* ✅ Contact Button Redirects to /contact */}
            <Link to="/contact">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300">
                Contact Support Now
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
