import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// 🔧 Service Data
const defaultServices = [
  {
    id: "enterprise",
    title: "Enterprise Solutions",
    description: "Quantum-grade infrastructure for hyper-scale operations",
    image: "/enterprise2.jpg",
    cta: "Initiate Protocol",
    gradient: "from-cyan-500 to-purple-600",
  },
  {
    id: "managed",
    title: "Managed Services",
    description: "24/7 neural network monitoring & optimization",
    image: "/managed.jpg",
    cta: "Access Matrix",
    gradient: "from-pink-500 to-orange-600",
  },
  {
    id: "home",
    title: "Home Installations",
    description: "Terahertz connectivity for smart ecosystems",
    image: "/home in.jpg",
    cta: "Deploy Node",
    gradient: "from-green-500 to-blue-600",
  },
  {
    id: "custom",
    title: "Custom Services",
    description: "Bespoke solutions for digital ecosystems",
    image: "/custom.jpg",
    cta: "Request Blueprint",
    gradient: "from-purple-500 to-red-600",
  },
];

const techImages = [
  "/tech1.jpg",
  "/tech2.jpg",
  "/tech3.jpg",
  "/tech4.jpg",
  "/tech5.jpg",
  "/tech6.jpg",
];

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
            className="self-start bg-black/20 px-4 py-1 text-xs rounded-full border-2 border-cyan-400/50 hover:border-cyan-300 transition-all group/btn"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-semibold tracking-wide group-hover/btn:tracking-widest transition-all">
              {service.cta} ↗
            </span>
          </motion.button>
        </div>
      </figure>
    </motion.article>
  );
};

export default function Services() {
  const [lightboxImage, setLightboxImage] = useState(null);
  const navigate = useNavigate();

  return (
    <section
      id="services"
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-white py-28 px-6 scroll-mt-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-cover bg-center opacity-10 mix-blend-soft-light pointer-events-none z-0" />
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/70 to-transparent z-10" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center mb-20 relative z-10"
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white font-mono tracking-tight">
          Our Services
        </h2>
        <p className="text-lg md:text-xl text-cyan-100/80 max-w-3xl mx-auto leading-relaxed font-light">
          Engineering the neural pathways of tomorrow's connected ecosystems
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto relative z-10">
        {defaultServices.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>

      <section className="mt-28 max-w-7xl mx-auto px-4 relative z-10">
        <h3 className="text-4xl font-bold mb-12 text-center font-mono text-cyan-300">
          <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
            [ OUR TECHNICIANS ]
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
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-cyan-600 to-purple-600 text-xs text-white font-semibold px-2 py-1 rounded shadow-lg uppercase tracking-wide">
                    Technician
                  </div>
                </div>
              </motion.figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-20 flex justify-center relative z-10"
      >
        <Link
          to="/technicians"
          className="text-sm font-semibold px-6 py-2 rounded-full bg-cyan-600 text-white shadow-md hover:bg-cyan-500 transition"
        >
          Initiate Connection
        </Link>
      </motion.div>

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
