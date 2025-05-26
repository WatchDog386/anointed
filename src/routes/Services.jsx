import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Image Assets
import tech1 from "../assets/tech1.jpg";
import tech2 from "../assets/tech2.jpg";
import tech3 from "../assets/tech3.jpg";
import tech4 from "../assets/tech4.jpg";
import tech5 from "../assets/tech5.jpg";
import tech6 from "../assets/tech6.jpg";
import enterprise2 from "../assets/enterprise2.jpg";
import managed from "../assets/managed.jpg";
import homeIn from "../assets/home in.jpg";
import custom from "../assets/custom.jpg";

// 🔧 Service Data
const defaultServices = [
  {
    id: "enterprise",
    title: "Enterprise Solutions",
    description: "Quantum-grade infrastructure for hyper-scale operations",
    image: enterprise2,
    cta: "Initiate Protocol",
    gradient: "from-cyan-500 to-purple-600",
  },
  {
    id: "managed",
    title: "Managed Services",
    description: "24/7 neural network monitoring & optimization",
    image: managed,
    cta: "Access Matrix",
    gradient: "from-pink-500 to-orange-600",
  },
  {
    id: "home",
    title: "Home Installations",
    description: "Terahertz connectivity for smart ecosystems",
    image: homeIn,
    cta: "Deploy Node",
    gradient: "from-green-500 to-blue-600",
  },
  {
    id: "custom",
    title: "Custom Services",
    description: "Bespoke solutions for digital ecosystems",
    image: custom,
    cta: "Request Blueprint",
    gradient: "from-purple-500 to-red-600",
  },
];

const techImages = [tech1, tech2, tech3, tech4, tech5, tech6];

// 🎴 Individual Service Card
const ServiceCard = ({ service, index }) => {
  const navigate = useNavigate();
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="relative rounded-2xl overflow-hidden group border-2 border-white/20 backdrop-blur-xl hover:backdrop-blur-2xl transition-all duration-500"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br opacity-30 group-hover:opacity-50 transition-opacity duration-500 ${service.gradient}`}
      />
      <figure className="relative h-80">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transform-gpu transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col justify-end p-6">
          <h3 className="text-white text-2xl font-bold mb-2 drop-shadow-xl">
            {service.title}
          </h3>
          <p className="text-white/80 text-sm leading-relaxed mb-4 font-mono">
            {service.description}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() =>
              navigate("/technicians", { state: { service: service.id } })
            }
            className="self-start bg-black/20 px-6 py-2 rounded-full border-2 border-cyan-400/50 hover:border-cyan-300 transition-all group/btn"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent text-sm font-semibold tracking-wide group-hover/btn:tracking-widest transition-all">
              {service.cta} ↗
            </span>
          </motion.button>
        </div>
      </figure>
    </motion.article>
  );
};

// 🚀 CTA Button
const CyberButton = ({ children, to }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="relative overflow-hidden rounded-full"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 animate-pulse opacity-40" />
    <Link
      to={to}
      className="relative flex items-center gap-3 bg-gray-900/50 px-8 py-4 rounded-full backdrop-blur-xl border-2 border-cyan-400/30 hover:border-cyan-300 transition-all group"
    >
      <span className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent tracking-wide group-hover:tracking-widest transition-all">
        {children}
      </span>
      <div className="relative w-5 h-5">
        <div className="absolute inset-0 bg-cyan-400/50 blur-sm" />
        <div className="w-5 h-5 bg-gradient-to-r from-cyan-400 to-purple-400 mask-triangle-2 rotate-45" />
      </div>
    </Link>
  </motion.div>
);

export default function Services() {
  const [lightboxImage, setLightboxImage] = useState(null);
  const navigate = useNavigate();

  return (
    <section
      id="services"
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-white py-28 px-6 scroll-mt-24 relative overflow-hidden"
    >
      {/* Optional Grid Overlay */}
      <div className="absolute inset-0 bg-[url('./assets/grid.svg')] bg-cover bg-center opacity-10 mix-blend-soft-light pointer-events-none z-0" />
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/70 to-transparent z-10" />

      {/* 🌐 Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center mb-20 relative z-10"
      >
        <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-mono">
          // DIGITAL FRONTIERS
        </h2>
        <p className="text-lg md:text-xl text-cyan-100/80 max-w-3xl mx-auto leading-relaxed font-light">
          Engineering the neural pathways of tomorrow's connected ecosystems
        </p>
      </motion.div>

      {/* 🧩 Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto relative z-10">
        {defaultServices.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>

      {/* 📸 Swiper */}
      <section className="mt-28 max-w-7xl mx-auto px-4 relative z-10">
        <h3 className="text-4xl font-bold mb-12 text-center font-mono text-cyan-300">
          <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
            [ OPERATION VISUALS ]
          </span>
        </h3>

        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="cyber-swiper"
        >
          {techImages.map((img, i) => (
            <SwiperSlide key={`tech-${i}`}>
              <motion.figure
                className="relative rounded-xl overflow-hidden border-2 border-cyan-400/20 hover:border-cyan-400/40 transition-all cursor-pointer group"
                whileHover={{ y: -5 }}
                onClick={() =>
                  navigate("/technicians", { state: { techId: i + 1 } })
                }
              >
                <div className="relative aspect-square">
                  <img
                    src={img}
                    alt={`Technician ${i + 1}`}
                    className="w-full h-full object-cover transform-gpu transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-cyan-300 font-mono text-sm">
                    OPERATIVE #{String(i + 1).padStart(2, "0")}
                  </div>
                </div>
              </motion.figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 📡 CTA Button */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-20 text-center relative z-10"
      >
        <CyberButton to="/technicians">
          INITIATE CONNECTION PROTOCOL
        </CyberButton>
      </motion.div>

      {/* 🔍 Lightbox (if needed later) */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-2xl"
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl w-full"
            >
              <img
                src={lightboxImage}
                alt="Enlarged preview"
                className="rounded-2xl shadow-2xl border-2 border-cyan-400/20"
              />
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute -top-12 right-0 text-cyan-400 hover:text-cyan-300 text-4xl transition-colors font-mono"
              >
                [ CLOSE ]
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
