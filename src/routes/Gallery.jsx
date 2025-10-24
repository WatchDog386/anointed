// src/routes/Gallery.jsx
import React, { useState, useEffect } from "react";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

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

  // Sample gallery data - replace with your actual images
  const galleryImages = [
    { id: 1, src: "/DRANDCHILDREN.jpg", alt: "The Director in engagement with the children", category: "Child" },
    { id: 2, src: "/GRADUANT.jpg", alt: "GRADUANT", category: "Academics" },
    { id: 3, src: "/In gown.JPG", alt: "Graduation", category: "Academics" },
    { id: 4, src: "/CHILD EMPOWER.JPG", alt: "Teacher Instructing a child", category: "Child Empowerment" },
    { id: 5, src: "/EDUCATION.jpg", alt: "In the classroom walls", category: "EDUCATION" },
    { id: 6, src: "/GRADUATION.jpg", alt: "Children In The Moment", category: "Academics" },
    { id: 7, src: "/Community Engagement.JPG", alt: "Community Engagement", category: "Community Engagement" },
    { id: 8, src: "/HAPPYCHILDREN.JPG", alt: "HAPPY CHILDREN", category: "Moments" },
    { id: 9, src: "/Outside.JPG", alt: "Children Having Fun", category: "Moments" },
    { id: 10, src: "/Childrenwaving.JPEG", alt: "Children Waving", category: "Moments" },
    { id: 11, src: "/teacher-AVCS3.jpg" , alt: "Our Male Teaching Staff. From Left: Mr. Erick, Mr. Patrick & Mr. Constatine", category: "Moments" },
    { id: 12, src: "DSC_1191"},
    { id: 13, src: "DSC_1200"},
    { id: 14, src: "DSC_1213"},
    { id: 15, src: "DSC_1221"},
    {} 
  ];

  const categories = ["All", "Community", "Academics", "Events", "Arts", "Child Empowerment", "Education", "Community Engagement", "Moments"];

  return (
    <div className="min-h-screen bg-gray-50 font-open-sans">
      {/* Hero Section */}
      <section 
        className="relative h-72 md:h-96 bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: "linear-gradient(rgba(43, 71, 63, 0.7), rgba(43, 71, 63, 0.5)), url('/Childrenwaving.JPEG')" }}
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
                className="px-5 py-2.5 rounded-full border border-[#2b473f] text-[#2b473f] font-medium transition-all duration-300 hover:bg-[#2b473f] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#2b473f] focus:ring-opacity-50"
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {galleryImages.map((image) => (
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
            {/* Close Button - Always visible on mobile, visible on hover for desktop */}
            <button
              onClick={() => setSelectedImage(null)}
              className={`absolute ${
                isMobile 
                  ? 'top-4 right-4 bg-black/50 hover:bg-black/70' 
                  : '-top-12 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
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
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 rounded-b-lg transform transition-transform duration-300">
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
            
            {/* Navigation Arrows for Desktop */}
            {!isMobile && (
              <>
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add navigation logic here
                  }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add navigation logic here
                  }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}