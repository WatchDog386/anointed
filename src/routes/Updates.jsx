// src/routes/Gallery.jsx
import React, { useState, useEffect } from "react";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  // Scroll to footer function
  const scrollToFooter = () => {
    const footerSection = document.getElementById('footer-section');
    if (footerSection) {
      footerSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    
    if (selectedImage) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  // Organized gallery data by different occasions
  const galleryData = {
    "PP2 Graduation": [
      { 
        id: 1, 
        src: "https://images.unsplash.com/photo-1588072432836-e100327d50a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2VueWFuJTIwZ3JhZHVhdGlvbiUyMGNoaWxkcmVufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=80", 
        alt: "PP2 graduate in cap and gown smiling", 
        category: "PP2 Graduation" 
      },
      { 
        id: 2, 
        src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWR1Y2F0aW9uJTIwYWZyaWNhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=80", 
        alt: "PP2 students receiving certificates", 
        category: "PP2 Graduation" 
      },
      { 
        id: 3, 
        src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8a2VueWFuJTIwc2Nob29sfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=80", 
        alt: "Young graduates with their parents", 
        category: "PP2 Graduation" 
      },
      { 
        id: 4, 
        src: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdyYWR1YXRpb24lMjBjaGlsZHJlbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=80", 
        alt: "PP2 class graduation group photo", 
        category: "PP2 Graduation" 
      }
    ],
    "Grade 3 Graduation": [
      { 
        id: 5, 
        src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdyYWR1YXRpb24lMjBwcmltYXJ5JTIwc2Nob29sfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=80", 
        alt: "Grade 3 graduates in formal attire", 
        category: "Grade 3 Graduation" 
      },
      { 
        id: 6, 
        src: "https://images.unsplash.com/photo-1462536943532-57a629f6cc60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFmcmljYW4lMjBjaGlsZHJlbiUyMHNjaG9vbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=80", 
        alt: "Grade 3 students with their teachers", 
        category: "Grade 3 Graduation" 
      },
      { 
        id: 7, 
        src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2Nob29sfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=80", 
        alt: "Graduation ceremony in progress", 
        category: "Grade 3 Graduation" 
      },
      { 
        id: 8, 
        src: "https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGdyYWR1YXRpb24lMjBjaGlsZHJlbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=80", 
        alt: "Grade 3 graduates throwing caps", 
        category: "Grade 3 Graduation" 
      }
    ],
    "Academic Events": [
      { 
        id: 9, 
        src: "https://images.unsplash.com/photo-1588072432906-5b2397733bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8a2VueWFuJTIwY2xhc3Nyb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=80", 
        alt: "Students in classroom learning", 
        category: "Academic Events" 
      },
      { 
        id: 10, 
        src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVkdWNhdGlvbiUyMGFmcmljYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=80", 
        alt: "Science fair exhibition", 
        category: "Academic Events" 
      },
      { 
        id: 11, 
        src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGtlbnlhbiUyMHNjaG9vbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=80", 
        alt: "Reading competition winners", 
        category: "Academic Events" 
      }
    ],
    "Community Engagement": [
      { 
        id: 12, 
        src: "https://images.unsplash.com/photo-1559027615-cfa462912979?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWZyaWNhbiUyMGNvbW11bml0eXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=80", 
        alt: "School community service day", 
        category: "Community Engagement" 
      },
      { 
        id: 13, 
        src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWZyaWNhbiUyMGNvbW11bml0eXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=80", 
        alt: "Parents meeting with teachers", 
        category: "Community Engagement" 
      },
      { 
        id: 14, 
        src: "https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGFmcmljYW4lMjBjb21tdW5pdHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=80", 
        alt: "Cultural day celebration", 
        category: "Community Engagement" 
      }
    ],
    "Student Life": [
      { 
        id: 15, 
        src: "https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFmcmljYW4lMjBjaGlsZHJlbiUyMHBsYXlpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=80", 
        alt: "Children playing during break time", 
        category: "Student Life" 
      },
      { 
        id: 16, 
        src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGtlbnlhbiUyMHNjaG9vbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=80", 
        alt: "Students in school uniform", 
        category: "Student Life" 
      },
      { 
        id: 17, 
        src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2Nob29sJTIwY2FmZXRlcmlhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=80", 
        alt: "Lunch time at school", 
        category: "Student Life" 
      }
    ]
  };

  // Flatten all images for display
  const allImages = Object.values(galleryData).flat();
  
  // Filter images based on active category
  const filteredImages = activeCategory === "All" 
    ? allImages 
    : allImages.filter(image => image.category === activeCategory);

  const categories = ["All", "PP2 Graduation", "Grade 3 Graduation", "Academic Events", "Community Engagement", "Student Life"];

  return (
    <div className="min-h-screen bg-gray-50 font-open-sans">
      {/* Hero Section */}
      <section 
        className="relative h-72 md:h-96 bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: "linear-gradient(rgba(43, 71, 63, 0.7), rgba(43, 71, 63, 0.5)), url('https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGtlbnlhbiUyMHNjaG9vbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1200&q=80')" }}
      >
        <div className="text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat mb-4 tracking-tight">
            Gallery & Videos
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed">
            Capturing moments of growth, faith, and community at Anointed Vessels Christian School
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <section className="text-center mb-16">
          <p className="text-gray-600 text-lg md:text-xl leading-8 max-w-4xl mx-auto">
            Explore the vibrant life of our school through photographs and videos that showcase 
            our students' journey in faith, learning, and personal development.
          </p>
        </section>

        {/* Category Filters */}
        <section className="mb-12">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full border font-medium transition-all duration-300 hover:bg-[#2b473f] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#2b473f] focus:ring-opacity-50 ${
                  activeCategory === category
                    ? 'bg-[#2b473f] text-white border-[#2b473f]'
                    : 'border-[#2b473f] text-[#2b473f]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
                onClick={() => setSelectedImage(image)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="font-semibold text-sm uppercase tracking-wider opacity-95">
                      {image.category}
                    </p>
                    <p className="text-xs opacity-80 mt-1 line-clamp-2">
                      {image.alt}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Video Section */}
        <section className="text-center mb-16">
          <div className="bg-gradient-to-br from-[#2b473f] to-[#1a2f28] rounded-3xl p-8 md:p-12 text-white shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold font-montserrat mb-4">
              Our School Story
            </h2>
            <p className="text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              Watch how we nurture young minds through faith-based education and create 
              a community where every child can thrive and discover their God-given potential.
            </p>
            <button 
              onClick={scrollToFooter}
              className="px-8 py-4 bg-[#932528] text-white font-montserrat font-semibold rounded-full hover:bg-[#7a1f22] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 shadow-lg hover:shadow-xl"
            >
              Watch Our Story Video
            </button>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-xl md:text-2xl font-bold font-montserrat text-gray-800 mb-4">
              Want to See More?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Follow us on social media for daily updates and behind-the-scenes moments from our school community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-6 py-3 border border-[#2b473f] text-[#2b473f] font-medium rounded-full hover:bg-[#2b473f] hover:text-white transition-all duration-300">
                Visit Our Social Media
              </button>
              <button className="px-6 py-3 bg-[#932528] text-white font-medium rounded-full hover:bg-[#7a1f22] transition-all duration-300">
                Schedule a Visit
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-5xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className={`absolute ${
                isMobile 
                  ? 'top-4 right-4 bg-black/50 hover:bg-black/70' 
                  : '-top-12 right-0 bg-black/50 hover:bg-black/70'
              } text-white hover:text-gray-300 transition-all duration-300 z-10 p-2 rounded-full backdrop-blur-sm`}
            >
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Image Container */}
            <div className="group relative">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
              
              {/* Image Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 rounded-b-lg">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-white font-semibold text-lg">{selectedImage.alt}</p>
                    <p className="text-gray-300 text-sm mt-1">{selectedImage.category}</p>
                  </div>
                  {!isMobile && (
                    <p className="text-gray-400 text-xs hidden md:block">
                      Press ESC to close
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}