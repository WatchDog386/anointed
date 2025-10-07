// src/routes/ChildSponsorship.jsx
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, Filter, BookOpen, Download, Heart, Users, Target, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// ✅ FIXED: Removed trailing spaces in API URL
const getApiBaseUrl = () => {
  if (import.meta.env.PROD) {
    return "https://anointed-3v54.onrender.com"; // NO SPACES!
  }
  return "http://localhost:5000";
};
const API_BASE_URL = getApiBaseUrl();

const SponsorshipFormPopup = ({ 
  isOpen, 
  student, 
  onClose, 
  onSubmit, 
  formSubmitting 
}) => {
  const [formData, setFormData] = useState({
    sponsorName: '',
    sponsorEmail: '',
    sponsorPhone: '',
    message: ''
  });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    if (student) {
      setFormData({
        sponsorName: '',
        sponsorEmail: '',
        sponsorPhone: '',
        message: ''
      });
      setFormError('');
      setFormSuccess(false);
    }
  }, [student]);

  const handleFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formError) setFormError('');
  }, [formError]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setFormError('');
    
    // ✅ Frontend validation
    if (!formData.sponsorName.trim() || !formData.sponsorEmail.trim() || !formData.sponsorPhone.trim()) {
      setFormError('Please fill in all required fields.');
      return;
    }

    try {
      await onSubmit(formData);
      setFormSuccess(true);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to submit sponsorship request. Please try again.');
    }
  }, [formData, onSubmit]);

  if (!isOpen || !student) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl border border-gray-200/50 relative z-10"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <div className="p-5 border-b border-gray-200/50">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-[#2b473f]">Sponsor {student.name.split(' ')[0]}</h2>
              <button 
                onClick={onClose} 
                className="text-gray-500 hover:text-[#932528] text-xl transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
          
          <div className="p-5">
            {formSuccess ? (
              <div className="text-center py-6">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="text-lg font-bold text-green-600 mb-2">Thank You!</h3>
                <p className="text-sm text-gray-700">
                  We'll contact you soon to complete the sponsorship.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  key="sponsorName"
                  type="text"
                  name="sponsorName"
                  value={formData.sponsorName}
                  onChange={handleFormChange}
                  placeholder="Full Name *"
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8CA9B4] focus:border-[#8CA9B4] focus:outline-none transition-colors"
                />
                <input
                  key="sponsorEmail"
                  type="email"
                  name="sponsorEmail"
                  value={formData.sponsorEmail}
                  onChange={handleFormChange}
                  placeholder="Email *"
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8CA9B4] focus:border-[#8CA9B4] focus:outline-none transition-colors"
                />
                <input
                  key="sponsorPhone"
                  type="tel"
                  name="sponsorPhone"
                  value={formData.sponsorPhone}
                  onChange={handleFormChange}
                  placeholder="Phone *"
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8CA9B4] focus:border-[#8CA9B4] focus:outline-none transition-colors"
                />
                <textarea
                  key="message"
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="Message (Optional)"
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8CA9B4] focus:border-[#8CA9B4] focus:outline-none resize-none transition-colors"
                />
                
                {formError && (
                  <motion.p 
                    className="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    {formError}
                  </motion.p>
                )}

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 text-sm px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="flex-1 text-sm px-3 py-2 bg-[#932528] text-white rounded-lg hover:bg-[#7a1e21] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {formSubmitting ? (
                      <span className="flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Submitting...
                      </span>
                    ) : (
                      'Submit'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function ChildSponsorship() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState(false);
  const [pdfStudent, setPdfStudent] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const [filters, setFilters] = useState({
    searchTerm: '',
    class: '',
    minAge: '',
    maxAge: '',
    academicStrength: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/students`);
        if (!response.ok) throw new Error("Failed to fetch students");
        const data = await response.json();
        
        const normalizedStudents = data
          .filter(student => !student.isSponsored)
          .map(student => ({
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

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = filters.searchTerm === '' || 
        student.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        student.idNumber.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const matchesClass = filters.class === '' || student.class === filters.class;
      
      const age = student.age || 0;
      const matchesAge = (
        (filters.minAge === '' || age >= parseInt(filters.minAge, 10)) &&
        (filters.maxAge === '' || age <= parseInt(filters.maxAge, 10))
      );
      
      const matchesAcademic = filters.academicStrength === '' || 
        (student.academicStrengths || '').toLowerCase().includes(filters.academicStrength.toLowerCase());

      return matchesSearch && matchesClass && matchesAge && matchesAcademic;
    });
  }, [students, filters]);

  const uniqueClasses = [...new Set(students.map(s => s.class).filter(Boolean))].sort();

  const openSponsorPopup = useCallback((student) => {
    setSelectedStudent(student);
    setIsPopupOpen(true);
  }, []);

  const openPdfPreview = useCallback((student) => {
    setPdfStudent(student);
    setIsPdfPreviewOpen(true);
  }, []);

  const closeStudentPopup = useCallback(() => {
    setIsPopupOpen(false);
    setSelectedStudent(null);
  }, []);

  const handleSponsorSubmit = useCallback(async (formData) => {
    setFormSubmitting(true);
    
    try {
      const payload = {
        ...formData,
        studentId: selectedStudent._id
      };

      const response = await axios.post(`${API_BASE_URL}/api/sponsorship/interest`, payload);

      if (response.status === 201) {
        // ✅ Remove sponsored student from list immediately
        setStudents(prev => prev.filter(student => String(student._id) !== String(selectedStudent._id)));
        setTimeout(closeStudentPopup, 3000);
      }
    } catch (err) {
      console.error("Sponsorship submission error:", err);
      throw err;
    } finally {
      setFormSubmitting(false);
    }
  }, [selectedStudent, closeStudentPopup]);

  const handleAddStudent = useCallback(() => {
    navigate('/admin/login');
  }, [navigate]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const generateStudentPdf = (student) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Anointed Vessels Christian School", 14, 20);
    doc.setFontSize(12);
    doc.text("Student Full Profile", 14, 30);
    doc.setLineWidth(0.5);
    doc.line(14, 32, 200, 32);

    const addSection = (y, label, value) => {
      if (!value) return y;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(`${label}:`, 14, y);
      doc.setFont('helvetica', 'normal');
      const splitText = doc.splitTextToSize(String(value), 180);
      doc.text(splitText, 14, y + 4);
      return y + 6 + splitText.length * 5;
    };

    let yPos = 40;
    yPos = addSection(yPos, "Full Name", student.name);
    yPos = addSection(yPos, "ID Number", student.idNumber);
    yPos = addSection(yPos, "Date of Birth", formatDate(student.dateOfBirth));
    yPos = addSection(yPos, "Class", student.class);
    yPos = addSection(yPos, "Age", student.age);
    yPos = addSection(yPos, "Personality", student.personality);
    yPos = addSection(yPos, "Academic Strengths", student.academicStrengths);
    yPos = addSection(yPos, "Overall Performance", student.overallPerformance);
    yPos = addSection(yPos, "Family Background", student.familyBackground);
    yPos = addSection(yPos, "Financial Situation", student.financialSituation);
    yPos = addSection(yPos, "Aspirations", student.aspirations);
    yPos = addSection(yPos, "Support Needed", student.supportNeeded);
    yPos = addSection(yPos, "Achievements", student.achievements);

    if (student.isSponsored) {
      yPos += 5;
      doc.setFont('helvetica', 'bold');
      doc.text("Sponsor Information", 14, yPos);
      doc.setLineWidth(0.3);
      doc.line(14, yPos + 2, 100, yPos + 2);
      yPos += 8;
      yPos = addSection(yPos, "Sponsor Name", student.sponsorName);
      yPos = addSection(yPos, "Sponsor Email", student.sponsorEmail);
      yPos = addSection(yPos, "Sponsor Phone", student.sponsorPhone);
      yPos = addSection(yPos, "Sponsor Notes", student.sponsorNotes);
    }

    doc.save(`bio_${student.name.replace(/\s+/g, '_')}.pdf`);
  };

  const StatsBanner = () => (
    <div className="bg-gradient-to-r from-[#2b473f] to-[#3a5c52] rounded-xl p-5 mb-10 text-center text-white">
      <p className="text-sm">
        {students.length} children are currently seeking sponsors • $35/month changes a life
      </p>
    </div>
  );

  const SkeletonCard = ({ reverse = false }) => (
    <motion.div 
      className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-200/30 animate-pulse ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} flex flex-col mb-8`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="h-64 md:h-48 md:w-2/5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-t-xl md:rounded-l-xl md:rounded-tr-none"></div>
      <div className="p-5 md:w-3/5">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="grid grid-cols-2 gap-2 mt-3 mb-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-3 bg-gray-200 rounded"></div>
          ))}
        </div>
        <div className="space-y-2 mt-3">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-3 bg-gray-200 rounded w-full"></div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    </motion.div>
  );

  const StudentProfileCard = ({ student, index }) => {
    const reverse = index % 2 === 1;
    
    return (
      <motion.div 
        className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-gray-200/30 hover:shadow-lg transition-all duration-300 mb-8 ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} flex flex-col`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -5 }}
      >
        <div className="md:w-2/5 h-64 md:h-48 relative flex items-center justify-center p-0 m-0">
          <div className="w-32 h-40 bg-white shadow-inner rounded-sm border border-gray-300 overflow-hidden m-0 p-0">
            <img
              src={student.imageUrl || "/default-student.jpg"}
              alt={student.name}
              className="w-full h-full object-cover object-top"
              onError={(e) => e.target.src = "/default-student.jpg"}
              loading="lazy"
            />
          </div>
        </div>
        
        <div className="p-5 md:w-3/5">
          <h3 className="text-lg font-bold text-[#2b473f] font-montserrat mb-2 line-clamp-1">
            {student.name}
          </h3>
          
          <div className="grid grid-cols-2 gap-2 text-xs mb-3">
            <div className="bg-[#f6f4ee] p-2 rounded">
              <span className="font-semibold text-[#2b473f]">ID:</span> {student.idNumber}
            </div>
            <div className="bg-[#f6f4ee] p-2 rounded">
              <span className="font-semibold text-[#2b473f]">DOB:</span> {formatDate(student.dateOfBirth)}
            </div>
            <div className="bg-[#f6f4ee] p-2 rounded">
              <span className="font-semibold text-[#2b473f]">Class:</span> {student.class}
            </div>
            <div className="bg-[#f6f4ee] p-2 rounded">
              <span className="font-semibold text-[#2b473f]">Age:</span> {student.age}
            </div>
          </div>
          
          <p className="text-xs text-gray-700 mb-3 line-clamp-2">
            {student.personality || 'Bright'} learner. Strengths: {student.academicStrengths || 'N/A'}.
          </p>
          
          <div className="flex flex-wrap gap-2 mt-3">
            <motion.button 
              onClick={() => openPdfPreview(student)}
              className="text-xs px-3 py-1.5 bg-[#2b473f] text-white rounded-lg hover:bg-[#3a5c52] transition flex items-center gap-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <BookOpen size={12} />
              Get to Know {student.name.split(' ')[0]}'s Story
            </motion.button>
            <motion.button 
              onClick={() => openSponsorPopup(student)}
              className="text-xs px-3 py-1.5 bg-[#932528] text-white rounded-lg hover:bg-[#7a1e21] transition"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sponsor
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  const PdfPreviewModal = () => {
    if (!isPdfPreviewOpen || !pdfStudent) return null;

    return (
      <AnimatePresence>
        <motion.div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white rounded-xl p-6 max-w-md w-full text-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <BookOpen className="mx-auto text-[#2b473f] mb-4" size={48} />
            <h3 className="text-lg font-bold text-[#2b473f] mb-2">
              {pdfStudent.name}'s Full Story
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Download a beautifully formatted PDF with all details about {pdfStudent.name.split(' ')[0]}'s life, dreams, and needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  generateStudentPdf(pdfStudent);
                  setIsPdfPreviewOpen(false);
                }}
                className="px-4 py-2 bg-[#2b473f] text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#3a5c52] transition-colors"
              >
                <Download size={16} />
                Download PDF Bio
              </button>
              <button
                onClick={() => setIsPdfPreviewOpen(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="font-open-sans bg-gradient-to-b from-white to-[#f9f8f5] min-h-screen pt-8 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <StatsBanner />

        <div id="filters" className="bg-white rounded-xl p-5 mb-10 border border-gray-200/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-[#2b473f]" />
              <h3 className="text-sm font-semibold text-[#2b473f]">Filter Students</h3>
            </div>
            <motion.button
              onClick={handleAddStudent}
              className="flex items-center gap-2 px-3 py-2 bg-[#2b473f] text-white rounded-lg text-sm font-medium hover:bg-[#3a5c52] transition-colors shadow-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus size={14} />
              Add Student
            </motion.button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search name or ID"
                value={filters.searchTerm}
                onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                className="w-full pl-8 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8CA9B4] focus:border-[#8CA9B4] focus:outline-none transition-colors"
              />
            </div>
            <select
              value={filters.class}
              onChange={(e) => setFilters(prev => ({ ...prev, class: e.target.value }))}
              className="text-xs py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8CA9B4] focus:border-[#8CA9B4] focus:outline-none transition-colors"
            >
              <option value="">All Classes</option>
              {uniqueClasses.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Min Age"
              value={filters.minAge}
              onChange={(e) => setFilters(prev => ({ ...prev, minAge: e.target.value }))}
              className="text-xs py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8CA9B4] focus:border-[#8CA9B4] focus:outline-none transition-colors"
            />
            <input
              type="number"
              placeholder="Max Age"
              value={filters.maxAge}
              onChange={(e) => setFilters(prev => ({ ...prev, maxAge: e.target.value }))}
              className="text-xs py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8CA9B4] focus:border-[#8CA9B4] focus:outline-none transition-colors"
            />
            <input
              type="text"
              placeholder="Academic strength"
              value={filters.academicStrength}
              onChange={(e) => setFilters(prev => ({ ...prev, academicStrength: e.target.value }))}
              className="text-xs py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8CA9B4] focus:border-[#8CA9B4] focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold text-[#2b473f] mb-5">Children Seeking Sponsors</h2>
          
          {error ? (
            <div className="text-center py-8 text-red-600">{error}</div>
          ) : loading ? (
            Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} reverse={i % 2 === 1} />)
          ) : filteredStudents.length === 0 ? (
            <div className="text-center py-10 text-gray-500 italic">
              No students match your filters.
            </div>
          ) : (
            filteredStudents.map((student, index) => (
              <StudentProfileCard key={student._id} student={student} index={index} />
            ))
          )}
        </div>

        <motion.div 
          className="bg-gradient-to-r from-[#8CA9B4] to-[#7a96a0] rounded-2xl p-8 text-center shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-white mb-3">Ready to Change a Life?</h3>
          <p className="text-white/90 mb-5 max-w-2xl mx-auto">
            Your sponsorship provides education, meals, mentorship, and hope. Start your journey today.
          </p>
          <motion.button
            onClick={() => document.getElementById('filters')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 bg-white text-[#2b473f] font-semibold rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Sponsor a Child Now
          </motion.button>
        </motion.div>
      </div>

      <SponsorshipFormPopup 
        isOpen={isPopupOpen}
        student={selectedStudent}
        onClose={closeStudentPopup}
        onSubmit={handleSponsorSubmit}
        formSubmitting={formSubmitting}
      />
      
      <PdfPreviewModal />
    </div>
  );
}