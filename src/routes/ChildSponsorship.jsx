// src/routes/ChildSponsorship.jsx
import React, { useState, useEffect } from "react";

// ✅ Dynamically determine API base URL
const getApiBaseUrl = () => {
  if (import.meta.env.PROD) {
    return "https://anointed-backend.onrender.com"; // 👈 REPLACE WITH YOUR ACTUAL RENDER URL
  }
  return "http://localhost:5000";
};

const API_BASE_URL = getApiBaseUrl();

export default function ChildSponsorship() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/students`);
        if (!response.ok) throw new Error("Failed to fetch students");
        const data = await response.json();
        
        // ✅ Normalize achievements to string
        const normalizedStudents = data.map(student => ({
          ...student,
          achievements: Array.isArray(student.achievements)
            ? student.achievements.join(', ')
            : student.achievements || ''
        }));
        
        setStudents(normalizedStudents);
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Unable to load student profiles at this time.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Open popup with student details
  const openStudentPopup = (student) => {
    setSelectedStudent(student);
    setIsPopupOpen(true);
  };

  // Close popup
  const closeStudentPopup = () => {
    setIsPopupOpen(false);
    setSelectedStudent(null);
  };

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    
    const getOrdinal = (n) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };
    
    return `${getOrdinal(day)} ${month} ${year}`;
  };

  // Skeleton loader for alternating layout
  const SkeletonCard = ({ reverse = false }) => (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200/50 animate-pulse ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} flex flex-col mb-8`}>
      <div className="h-64 md:h-auto md:w-2/5 bg-gradient-to-r from-gray-200 to-gray-300"></div>
      <div className="p-6 md:w-3/5">
        <div className="h-7 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-3 w-3/4"></div>
        <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
          ))}
        </div>
        <div className="space-y-2 mt-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"></div>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/3"></div>
          <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );

  // Student profile card component with alternating layout
  const StudentProfileCard = ({ student, reverse = false }) => (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200/50 hover:shadow-xl transition-all duration-300 mb-8 ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} flex flex-col relative`}>
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5 z-0"
        style={{
          backgroundImage: "url('/project.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      ></div>
      
      {/* Student Image Section */}
      <div className="md:w-2/5 h-64 md:h-auto relative z-10">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${student.imageUrl || "/default-student.jpg"})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
          }}
          onError={(e) => {
            e.target.style.backgroundImage = "url('/default-student.jpg')";
          }}
        ></div>
      </div>
      
      {/* Student Details Section */}
      <div className="p-6 md:w-3/5 flex flex-col relative z-10">
        <div>
          <h3 className="text-2xl font-bold text-[#2b473f] font-montserrat mb-3 bg-gradient-to-r from-[#2b473f] to-[#3a5c52] bg-clip-text text-transparent">
            {student.name}
          </h3>
          
          {/* Basic Information Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="text-sm bg-[#f6f4ee] p-3 rounded-lg">
              <span className="font-semibold text-[#2b473f]">Student ID:</span>
              <p className="text-gray-600 mt-1">{student.idNumber || 'N/A'}</p>
            </div>
            <div className="text-sm bg-[#f6f4ee] p-3 rounded-lg">
              <span className="font-semibold text-[#2b473f]">Date of Birth:</span>
              <p className="text-gray-600 mt-1">{formatDate(student.dateOfBirth)}</p>
            </div>
            <div className="text-sm bg-[#f6f4ee] p-3 rounded-lg">
              <span className="font-semibold text-[#2b473f]">Class:</span>
              <p className="text-gray-600 mt-1">{student.class || 'Unknown'}</p>
            </div>
            <div className="text-sm bg-[#f6f4ee] p-3 rounded-lg">
              <span className="font-semibold text-[#2b473f]">Age:</span>
              <p className="text-gray-600 mt-1">{student.age || 'N/A'}</p>
            </div>
          </div>
          
          {/* Academic Information */}
          <div className="mt-4 space-y-3">
            <div className="bg-gradient-to-r from-[#f6f4ee] to-white p-4 rounded-lg border border-gray-200/50">
              <span className="font-semibold text-[#932528] block mb-1">Personality:</span>
              <p className="text-gray-800">{student.personality || 'Bright and enthusiastic'}</p>
            </div>
            <div className="bg-gradient-to-r from-[#f6f4ee] to-white p-4 rounded-lg border border-gray-200/50">
              <span className="font-semibold text-[#932528] block mb-1">Academic Strengths:</span>
              <p className="text-gray-800">{student.academicStrengths || 'N/A'}</p>
            </div>
            <div className="bg-gradient-to-r from-[#f6f4ee] to-white p-4 rounded-lg border border-gray-200/50">
              <span className="font-semibold text-[#932528] block mb-1">Performance:</span>
              <p className="text-gray-800">{student.overallPerformance || 'N/A'}</p>
            </div>
            {student.achievements && (
              <div className="bg-gradient-to-r from-[#f6f4ee] to-white p-4 rounded-lg border border-gray-200/50">
                <span className="font-semibold text-[#932528] block mb-1">Achievements:</span>
                <p className="text-gray-800">{student.achievements}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button 
            onClick={() => openStudentPopup(student)}
            className="px-5 py-2.5 bg-gradient-to-r from-[#8CA9B4] to-[#7a96a0] text-white rounded-xl hover:from-[#7a96a0] hover:to-[#6a8690] transition-all duration-300 font-medium flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Get to Know {student.name.split(' ')[0]}
          </button>
          <button className="px-5 py-2.5 bg-gradient-to-r from-[#932528] to-[#7a1e21] text-white rounded-xl hover:from-[#7a1e21] hover:to-[#6a1518] transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Sponsor {student.name.split(' ')[0]}
          </button>
        </div>
      </div>
    </div>
  );

  // Family Background Popup Component
  const FamilyBackgroundPopup = () => {
    if (!isPopupOpen || !selectedStudent) return null;

    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
        <div 
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200/50 relative"
          style={{
            backgroundImage: "url('/orphan.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundBlendMode: "overlay"
          }}
        >
          <div className="absolute inset-0 bg-white/95 rounded-2xl"></div>
          
          <div className="relative z-10">
            <div className="p-6 border-b border-gray-200/50 bg-gradient-to-r from-[#f6f4ee] to-white rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#2b473f] font-montserrat bg-gradient-to-r from-[#2b473f] to-[#3a5c52] bg-clip-text text-transparent">
                  Getting to Know {selectedStudent.name}
                </h2>
                <button 
                  onClick={closeStudentPopup}
                  className="text-gray-500 hover:text-[#932528] text-2xl font-bold transition-colors bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Family Background Section */}
              <div>
                <h3 className="text-xl font-semibold text-[#932528] mb-3 font-montserrat bg-gradient-to-r from-[#932528] to-[#a83232] bg-clip-text text-transparent">
                  Family Background
                </h3>
                <div className="bg-gradient-to-r from-[#f6f4ee] to-white p-4 rounded-xl border border-gray-200/50 shadow-sm">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedStudent.familyBackground || `${selectedStudent.name} comes from a family facing economic challenges. Despite these circumstances, ${selectedStudent.name.split(' ')[0]} remains dedicated to education and building a better future.`}
                  </p>
                </div>
              </div>
              
              {/* Financial Situation Section */}
              <div>
                <h3 className="text-xl font-semibold text-[#932528] mb-3 font-montserrat bg-gradient-to-r from-[#932528] to-[#a83232] bg-clip-text text-transparent">
                  Financial Situation
                </h3>
                <div className="bg-gradient-to-r from-[#f6f4ee] to-white p-4 rounded-xl border border-gray-200/50 shadow-sm">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedStudent.financialSituation || `The family's financial situation makes it difficult to provide consistent educational support, school supplies, and proper nutrition. Your sponsorship can make a significant difference in ${selectedStudent.name.split(' ')[0]}'s life.`}
                  </p>
                </div>
              </div>
              
              {/* Aspirations Section */}
              <div>
                <h3 className="text-xl font-semibold text-[#932528] mb-3 font-montserrat bg-gradient-to-r from-[#932528] to-[#a83232] bg-clip-text text-transparent">
                  Dreams & Aspirations
                </h3>
                <div className="bg-gradient-to-r from-[#f6f4ee] to-white p-4 rounded-xl border border-gray-200/50 shadow-sm">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedStudent.aspirations || `${selectedStudent.name} dreams of a bright future and is working hard in school to achieve their goals. With proper support and encouragement, these dreams can become reality.`}
                  </p>
                </div>
              </div>
              
              {/* Support Needed Section */}
              {selectedStudent.supportNeeded && (
                <div>
                  <h3 className="text-xl font-semibold text-[#932528] mb-3 font-montserrat bg-gradient-to-r from-[#932528] to-[#a83232] bg-clip-text text-transparent">
                    Support Needed
                  </h3>
                  <div className="bg-gradient-to-r from-[#f6f4ee] to-white p-4 rounded-xl border border-gray-200/50 shadow-sm">
                    <p className="text-gray-700 leading-relaxed">
                      {selectedStudent.supportNeeded}
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-200/50 bg-gradient-to-r from-[#f6f4ee] to-white rounded-b-2xl">
              <div className="flex justify-between items-center">
                <button 
                  onClick={closeStudentPopup}
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                >
                  Close
                </button>
                <button className="px-5 py-2.5 bg-gradient-to-r from-[#932528] to-[#7a1e21] text-white rounded-xl hover:from-[#7a1e21] hover:to-[#6a1518] transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Sponsor {selectedStudent.name.split(' ')[0]}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="font-open-sans bg-gradient-to-br from-white to-[#f6f4ee] min-h-screen">
      {/* Enhanced Hero Banner with Background Image */}
      <div 
        className="relative h-96 md:h-[600px] bg-cover bg-center flex items-center justify-center shadow-2xl"
        style={{ 
          backgroundImage: "url('/project.jpg')",
          backgroundPosition: "center 30%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#2b473f]/80 to-[#8CA9B4]/60"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white font-montserrat mb-6 drop-shadow-2xl">
            Sponsor a Child
          </h1>
          <p className="text-xl md:text-2xl text-white font-open-sans mb-8 drop-shadow-2xl max-w-2xl mx-auto leading-relaxed">
            Transform a life through education, love, and the Gospel
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#student-profiles"
              className="inline-block px-8 py-4 bg-[#932528] text-white font-montserrat font-semibold rounded-full hover:bg-[#8CA9B4] transition-all duration-300 hover:scale-105 shadow-2xl transform hover:-translate-y-1"
            >
              Start Sponsoring Today
            </a>
            <button className="inline-block px-8 py-4 bg-white/20 text-white font-montserrat font-semibold rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-105 shadow-2xl transform hover:-translate-y-1 backdrop-blur-sm">
              Learn More
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2b473f] font-montserrat mb-6 bg-gradient-to-r from-[#2b473f] to-[#3a5c52] bg-clip-text text-transparent">
              Give Hope Through Sponsorship
            </h2>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              Your monthly gift of $35 provides a child with meals, education, uniforms, 
              spiritual mentorship, and a safe home at Anointed Vessels Christian School.
            </p>
            <p className="text-gray-700 mb-8 text-lg leading-relaxed">
              You'll receive updates, letters, and photos from your sponsored child — 
              building a life-changing relationship that transforms both your lives.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#sponsor-form"
                className="inline-block px-8 py-3 bg-gradient-to-r from-[#932528] to-[#7a1e21] text-white font-montserrat font-semibold rounded-full hover:from-[#7a1e21] hover:to-[#6a1518] transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Start Sponsoring Today
              </a>
              <button className="inline-block px-8 py-3 border-2 border-[#2b473f] text-[#2b473f] font-montserrat font-semibold rounded-full hover:bg-[#2b473f] hover:text-white transition-all duration-300">
                Our Mission
              </button>
            </div>
          </div>
          <div 
            className="bg-gray-100 rounded-2xl overflow-hidden shadow-2xl h-96 bg-cover bg-center"
            style={{
              backgroundImage: "url('/orphans.jpg')",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat"
            }}
          >
            <div className="w-full h-full bg-gradient-to-t from-[#2b473f]/30 to-transparent flex items-end p-6">
              <p className="text-white text-lg font-semibold drop-shadow-2xl">
                Happy student at Anointed Vessels Christian School
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Impact Stats */}
        <div className="bg-gradient-to-r from-[#2b473f] to-[#3a5c52] rounded-2xl p-8 md:p-12 text-center mb-16 shadow-2xl relative overflow-hidden">
          {/* Background Pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "url('/project.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
          ></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-montserrat font-bold text-white mb-4">
              Your Impact Changes Lives
            </h3>
            <p className="text-[#8CA9B4] mb-8 max-w-2xl mx-auto">
              Every contribution makes a real difference in a child's education and future
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {[
                { value: '$35', label: 'Monthly Support', icon: '💰' },
                { value: '100%', label: 'Goes to the Child', icon: '🎯' },
                { value: `${students.length}+`, label: 'Lives Transformed', icon: '🌟' },
                { value: '500+', label: 'Community Impact', icon: '👨‍👩‍👧‍👦' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white font-montserrat mb-2">
                    {stat.value}
                  </div>
                  <div className="text-[#8CA9B4] text-sm md:text-base">{stat.label}</div>
                  <div className="text-2xl mt-2">{stat.icon}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Student Profiles Section */}
        <div id="student-profiles" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2b473f] font-montserrat mb-4 bg-gradient-to-r from-[#2b473f] to-[#3a5c52] bg-clip-text text-transparent">
              Meet the Children
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Each child has a unique story and dreams for the future. Your sponsorship can help make those dreams come true.
            </p>
          </div>

          {error ? (
            <div className="text-center py-12 bg-red-50 rounded-2xl p-8 max-w-2xl mx-auto border border-red-200">
              <p className="text-red-600 font-medium text-lg">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-6 px-6 py-3 bg-[#932528] text-white rounded-xl hover:bg-[#7a1e21] transition-colors font-medium shadow-lg"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div>
              {loading 
                ? Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonCard key={i} reverse={i % 2 === 1} />
                  ))
                : students.length > 0
                ? students.map((student, index) => (
                    <StudentProfileCard 
                      key={student._id} 
                      student={student}
                      reverse={index % 2 === 1}
                    />
                  ))
                : (
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-16 text-center">
                    <div className="text-6xl mb-4">👨‍🎓</div>
                    <p className="text-gray-500 italic text-xl">
                      No students available for sponsorship at this time
                    </p>
                    <p className="text-gray-400 mt-2">
                      Please check back later for new student profiles
                    </p>
                  </div>
                )
              }
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#8CA9B4] to-[#7a96a0] rounded-2xl p-12 text-center shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-montserrat mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of sponsors who are transforming lives through education and mentorship
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#student-profiles"
              className="inline-block px-8 py-4 bg-white text-[#2b473f] font-montserrat font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              Browse Students
            </a>
            <button className="inline-block px-8 py-4 bg-[#932528] text-white font-montserrat font-semibold rounded-full hover:bg-[#7a1e21] transition-all duration-300 hover:scale-105 shadow-2xl">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Family Background Popup */}
      <FamilyBackgroundPopup />
    </div>
  );
}