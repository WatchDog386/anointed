// src/routes/GetInvolved.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Heart, Users, GraduationCap, Globe, BookOpen, MapPin, HandCoins, Church } from 'lucide-react';

// Custom Hooks
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return isVisible;
};

const useHoverAnimation = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return {
    isHovered,
    hoverProps: {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false)
    }
  };
};

// Components
const SectionHeader = ({ title, subtitle, centered = true }) => {
  const isVisible = useScrollAnimation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`mb-8 ${centered ? 'text-center' : ''}`}
    >
      <h2 
        className="text-xl font-bold mb-2 text-[#2b473f]"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-xs text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

const InvolvementCard = ({ icon: Icon, title, description, link, buttonText, stats }) => {
  const { isHovered, hoverProps } = useHoverAnimation();
  const isVisible = useScrollAnimation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200/50 hover:shadow-md transition-all duration-300 p-5 flex flex-col h-full"
      {...hoverProps}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#f6f4ee] flex items-center justify-center">
          <Icon className="h-5 w-5 text-[#932528]" />
        </div>
        <h3 
          className="text-lg font-bold text-[#2b473f]"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {title}
        </h3>
      </div>
      
      <p className="text-gray-700 mb-4 flex-1 text-xs leading-relaxed">{description}</p>
      
      {stats && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-gray-50 py-1 rounded-lg">
              <div className="font-bold text-[#932528] text-sm">{stat.value}</div>
              <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      )}
      
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
        <Link
          to={link}
          className="inline-flex items-center justify-center w-full px-3 py-2 bg-[#932528] text-white text-xs font-semibold rounded-lg hover:bg-[#7a1e21] transition-colors"
        >
          {buttonText}
          <ChevronRight className="h-3 w-3 ml-1" />
        </Link>
      </motion.div>
    </motion.div>
  );
};

const ImpactCounter = ({ target, label, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const isVisible = useScrollAnimation();

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isVisible, target, duration]);

  return (
    <div className="text-center">
      <div className="text-xl font-bold mb-1 text-[#932528]">
        {count.toLocaleString()}+
      </div>
      <div className="text-xs text-gray-600 uppercase tracking-wide">{label}</div>
    </div>
  );
};
const TestimonialCarousel = () => {
  const testimonials = [
    {
      id: 1,
      name: "Jimmy Carter Owuato",
      role: "Founder & CEO",
      content:
        "Being part of AVCS has been a lifelong calling. Watching children rise from hardship to hope reminds me daily that faith and education truly transform lives."
    },
    {
      id: 2,
      name: "Tonya Ivy",
      role: "Co-Founder & Director",
      content:
        "My journey with AVCS has been deeply fulfilling. Seeing our efforts open doors of opportunity for children confirms that every act of service makes a difference."
    },
    {
      id: 3,
      name: "Edith Oulo",
      role: "Director, Kenya Operations",
      content:
        "Working with AVCS has shown me the power of community-led change. It’s a blessing to witness children flourish through love, learning, and spiritual guidance."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="relative bg-gray-50 rounded-xl p-6">
      <SectionHeader
        title="Stories of Impact"
        subtitle="Hear from those who have partnered with us to create lasting change"
      />
      
      <div className="relative h-32 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center"
          >
            <div className="text-center w-full">
              <blockquote className="text-sm italic text-gray-700 mb-3 px-4">
                "{testimonials[currentIndex].content}"
              </blockquote>
              <div>
                <div className="font-bold text-[#2b473f] text-sm">{testimonials[currentIndex].name}</div>
                <div className="text-gray-600 text-xs">{testimonials[currentIndex].role}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="flex justify-center space-x-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-[#932528]' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Main Component
export default function GetInvolved() {
  const involvementOptions = [
    {
      icon: Heart,
      title: "Sponsor a Child",
      description: "For just $35 per month, provide education, nutrition, and spiritual guidance to a child in need. Your sponsorship creates lifelong impact and hope.",
      link: "/ChildSponsorship",
      buttonText: "Start Sponsoring",
      stats: [
        { value: "200+", label: "Children Sponsored" },
        { value: "98%", label: "Success Rate" }
      ]
    },
    {
      icon: Users,
      title: "Join a Mission Trip",
      description: "Experience life-changing service in Kenya. Use your skills in teaching, construction, healthcare, or ministry to make a tangible difference.",
      link: "/mission-trips",
      buttonText: "Learn More",
      stats: [
        { value: "15+", label: "Trips Annualy" },
        { value: "500+", label: "Volunteers" }
      ]
    },
    {
      icon: HandCoins,
      title: "Monthly Partnership",
      description: "Provide consistent support through recurring donations. Your ongoing commitment helps us plan effectively and sustain our programs year-round.",
      link: "/donate",
      buttonText: "Become a Partner",
      stats: [
        { value: "$50K+", label: "Monthly Support" },
        { value: "100%", label: "Funds to Programs" }
      ]
    },
    {
      icon: Church,
      title: "Church Partnership",
      description: "Partner with us as a church through mission trips, financial support, or project adoption. Expand God's kingdom together across continents.",
      link: "/partnerships",
      buttonText: "Partner With Us",
      stats: [
        { value: "25+", label: "Church Partners" },
        { value: "5", label: "Countries" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      {/* Hero Section — No background image */}
      <section className="relative bg-[#2b473f] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Get Involved
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-sm md:text-base mb-6 max-w-2xl mx-auto leading-relaxed opacity-90"
          >
            Join our mission to raise the next generation of Christian leaders in Kenya. Your partnership creates eternal impact.
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              to="#opportunities"
              className="bg-[#932528] text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-[#8CA9B4] transition-colors duration-300 inline-flex items-center"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Explore Opportunities
              <ChevronRight className="h-3 w-3 ml-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader
            title="Our Impact"
            subtitle="Together, we're transforming lives and communities across Kenya"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <ImpactCounter target={300} label="Children Educated" />
            <ImpactCounter target={25} label="Communities Served" />
            <ImpactCounter target={600} label="Lives Transformed" />
            <ImpactCounter target={7} label="Years of Service" />
          </div>
        </div>
      </section>

      {/* Involvement Opportunities */}
      <section id="opportunities" className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Ways to Get Involved"
            subtitle="Choose how you want to make a difference. Every contribution matters."
          />
          
          <div className="grid md:grid-cols-2 gap-4">
            {involvementOptions.map((option, index) => (
              <InvolvementCard key={index} {...option} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <TestimonialCarousel />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 bg-[#2b473f] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 
              className="text-xl font-bold mb-3"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Ready to Make a Difference?
            </h2>
            <p className="text-sm mb-6 opacity-90 max-w-2xl mx-auto">
              Join hundreds of partners who are transforming lives in Kenya. Your journey starts today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/contact"
                  className="bg-[#932528] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#8CA9B4] transition-colors duration-300 inline-block text-sm"
                >
                  Get Started Today
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/about"
                  className="border border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-[#2b473f] transition-all duration-300 inline-block text-sm"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}