import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Wifi,
  Wrench,
  Code2,
  Shield,
  Cloud,
} from "lucide-react";
import { useInView } from "react-intersection-observer";
import avatarPlaceholder from "../assets/avatar-placeholder.svg";

// Static technician data
const technicians = [
  {
    name: "John Mwangi",
    role: "Senior Technician",
    phone: "0712345678",
    email: "john@noxfill.co.ke",
    location: "Nairobi",
    specialty: "hardware",
    bio: "10+ years experience in hardware solutions and network infrastructure",
  },
  {
    name: "Grace Njeri",
    role: "Network Engineer",
    phone: "0798765432",
    email: "grace@noxfill.co.ke",
    location: "Mombasa",
    specialty: "networking",
    bio: "CCNP certified with expertise in enterprise network design",
  },
  {
    name: "David Otieno",
    role: "Software Specialist",
    phone: "0788123456",
    email: "david@noxfill.co.ke",
    location: "Kisumu",
    specialty: "software",
    bio: "Software solutions architect specializing in network management systems",
  },
  {
    name: "Lucy Wambui",
    role: "Cybersecurity Expert",
    phone: "0777890123",
    email: "lucy@noxfill.co.ke",
    location: "Nakuru",
    specialty: "security",
    bio: "Certified ethical hacker and network security consultant",
  },
  {
    name: "Kevin Kimani",
    role: "Web Developer",
    phone: "0755321987",
    email: "kevin@noxfill.co.ke",
    location: "Eldoret",
    specialty: "webdev",
    bio: "Full-stack developer focused on network monitoring interfaces",
  },
  {
    name: "Angela Achieng",
    role: "Cloud Engineer",
    phone: "0744001122",
    email: "angela@noxfill.co.ke",
    location: "Thika",
    specialty: "cloud",
    bio: "AWS Certified Solutions Architect with networking focus",
  },
];

const specialtyIcons = {
  hardware: <Wrench className="w-5 h-5" />,
  networking: <Wifi className="w-5 h-5" />,
  software: <Code2 className="w-5 h-5" />,
  security: <Shield className="w-5 h-5" />,
  webdev: <Code2 className="w-5 h-5" />,
  cloud: <Cloud className="w-5 h-5" />,
};

const TechnicianCard = ({ tech }) => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    tech.name
  )}&background=0D8ABC&color=fff&size=256`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="relative bg-gradient-to-br from-gray-900/80 to-blue-900/20 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-sm overflow-hidden"
    >
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none" />
      <div className="relative group">
        <div className="h-60 w-full bg-gray-800 rounded-2xl mb-4 overflow-hidden relative">
          <img
            src={avatarUrl}
            alt={tech.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = avatarPlaceholder;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full backdrop-blur-sm">
          {specialtyIcons[tech.specialty]}
          <span className="text-sm font-medium capitalize">
            {tech.specialty}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
            {tech.name}
          </h3>
          <p className="text-blue-300/80 flex items-center gap-2">
            <span className="font-medium">{tech.role}</span>
          </p>
        </div>

        <p className="text-gray-300 text-sm leading-relaxed">{tech.bio}</p>

        <div className="space-y-2 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <a
              href={`tel:${tech.phone}`}
              className="hover:text-blue-300 transition-colors"
            >
              {tech.phone}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <a
              href={`mailto:${tech.email}`}
              className="hover:text-blue-300 transition-colors"
            >
              {tech.email}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{tech.location}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Technicians = () => {
  const { issue } = useParams();
  const techSectionRef = useRef(null);

  const filteredTechs = issue
    ? technicians.filter(
        (t) => t.specialty.toLowerCase() === issue.toLowerCase()
      )
    : technicians;

  return (
    <div
      ref={techSectionRef}
      className="min-h-screen px-6 py-20 bg-gradient-to-br from-gray-900 to-blue-900/10"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {issue ? `${issue} Specialists` : "Our Expert Technicians"}
        </motion.h2>

        {filteredTechs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-2xl text-red-300/80 mb-4">
              No specialists found
            </div>
            <p className="text-gray-400 max-w-xl mx-auto">
              Contact our support team for personalized assistance with your
              specific needs.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredTechs.map((tech) => (
              <TechnicianCard key={tech.email} tech={tech} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Technicians;
