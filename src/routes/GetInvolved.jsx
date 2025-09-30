// src/routes/GetInvolved.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Heart, Users, GraduationCap, Globe } from 'lucide-react';

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
      className={`mb-12 ${centered ? 'text-center' : ''}`}
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#2b473f', fontFamily: "'Montserrat', sans-serif" }}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

const InvolvementCard = ({ icon: Icon, title, description, link, buttonText, image, stats }) => {
  const { isHovered, hoverProps } = useHoverAnimation();
  const isVisible = useScrollAnimation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
      {...hoverProps}
    >
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-20" />
          <div className="absolute top-4 left-4">
            <div className="bg-white bg-opacity-90 rounded-full p-3">
              <Icon className="h-6 w-6" style={{ color: '#932528' }} />
            </div>
          </div>
        </div>
      )}
      
      <div className="p-8">
        <div className="flex items-center mb-4">
          {!image && <Icon className="h-8 w-8 mr-3" style={{ color: '#932528' }} />}
          <h3 className="text-2xl font-bold" style={{ color: '#2b473f', fontFamily: "'Montserrat', sans-serif" }}>
            {title}
          </h3>
        </div>
        
        <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
        
        {stats && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold" style={{ color: '#932528' }}>{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
        
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to={link}
            className="inline-flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300"
            style={{
              backgroundColor: isHovered ? '#8CA9B4' : '#932528',
              color: 'white',
              fontFamily: "'Montserrat', sans-serif"
            }}
          >
            {buttonText}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Link>
        </motion.div>
      </div>
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
      <div className="text-5xl md:text-6xl font-bold mb-2" style={{ color: '#932528' }}>
        {count.toLocaleString()}+
      </div>
      <div className="text-lg text-gray-600 uppercase tracking-wider">{label}</div>
    </div>
  );
};

const TestimonialCarousel = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Child Sponsor",
      content: "Sponsoring a child through AVCS has been one of the most rewarding experiences. Seeing the progress reports and knowing I'm making a real difference is incredible.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Mission Trip Volunteer",
      content: "The mission trip changed my perspective on life. The community's faith and resilience inspired me beyond words. Can't wait to go back!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      name: "Pastor David Martinez",
      role: "Church Partner",
      content: "Our church's partnership with AVCS has strengthened our global missions focus. The transparency and impact are exceptional.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
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
    <div className="relative bg-gray-50 rounded-3xl p-12">
      <SectionHeader
        title="Stories of Impact"
        subtitle="Hear from those who have partnered with us to create lasting change"
      />
      
      <div className="relative h-64 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center"
          >
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="text-center">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
              </div>
              <div className="md:col-span-2">
                <blockquote className="text-2xl italic text-gray-700 mb-4">
                  "{testimonials[currentIndex].content}"
                </blockquote>
                <div>
                  <div className="font-semibold" style={{ color: '#2b473f' }}>
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-gray-600">{testimonials[currentIndex].role}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="flex justify-center space-x-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
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
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
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
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      stats: [
        { value: "15+", label: "Trips Annualy" },
        { value: "500+", label: "Volunteers" }
      ]
    },
    {
      icon: GraduationCap,
      title: "Monthly Partnership",
      description: "Provide consistent support through recurring donations. Your ongoing commitment helps us plan effectively and sustain our programs year-round.",
      link: "/donate",
      buttonText: "Become a Partner",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      stats: [
        { value: "$50K+", label: "Monthly Support" },
        { value: "100%", label: "Funds to Programs" }
      ]
    },
    {
      icon: Globe,
      title: "Church Partnership",
      description: "Partner with us as a church through mission trips, financial support, or project adoption. Expand God's kingdom together across continents.",
      link: "/partnerships",
      buttonText: "Partner With Us",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      stats: [
        { value: "25+", label: "Church Partners" },
        { value: "5", label: "Countries" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `linear-gradient(rgba(43, 71, 63, 0.7), rgba(43, 71, 63, 0.7)), url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center text-white px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Get Involved
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Join our mission to raise the next generation of Christian leaders in Kenya. 
            Your partnership creates eternal impact.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              to="#opportunities"
              className="bg-[#932528] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#8CA9B4] transition-colors duration-300 inline-flex items-center"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Explore Opportunities
              <ChevronRight className="h-5 w-5 ml-2" />
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader
            title="Our Impact"
            subtitle="Together, we're transforming lives and communities across Kenya"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <ImpactCounter target={500} label="Children Educated" />
            <ImpactCounter target={25} label="Communities Served" />
            <ImpactCounter target={1000} label="Lives Transformed" />
            <ImpactCounter target={15} label="Years of Service" />
          </div>
        </div>
      </section>

      {/* Involvement Opportunities */}
      <section id="opportunities" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Ways to Get Involved"
            subtitle="Choose how you want to make a difference. Every contribution matters."
          />
          
          <div className="grid md:grid-cols-2 gap-8">
            {involvementOptions.map((option, index) => (
              <InvolvementCard key={index} {...option} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <TestimonialCarousel />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#2b473f] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join hundreds of partners who are transforming lives in Kenya. Your journey starts today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/contact"
                  className="bg-[#932528] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#8CA9B4] transition-colors duration-300 inline-block"
                >
                  Get Started Today
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/about"
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#2b473f] transition-all duration-300 inline-block"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Open+Sans:wght@400;600&display=swap');
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}