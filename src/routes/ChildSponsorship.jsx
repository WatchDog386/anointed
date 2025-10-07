// src/routes/ChildSponsorship.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, Filter, BookOpen, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// ✅ Dynamically determine API base URL — NO LOCALHOST
const getApiBaseUrl = () => {
  if (import.meta.env.PROD) {
    return "https://anointed-3v54.onrender.com"; // ✅ Clean, no trailing space
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
  const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState(false);
  const [pdfStudent, setPdfStudent] = useState(null);
  const [sponsorForm, setSponsorForm] = useState({
    sponsorName: '',
    sponsorEmail: '',
    sponsorPhone: '',
    message: '',
    studentId: ''
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  // === Filters ===
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

  const openSponsorPopup = (student) => {
    setSelectedStudent(student);
    setIsPopupOpen(true);
    setSponsorForm({
      sponsorName: '',
      sponsorEmail: '',
      sponsorPhone: '',
      message: '',
      studentId: student._id
    });
    setFormSuccess(false);
    setFormError('');
  };

  const openPdfPreview = (student) => {
    setPdfStudent(student);
    setIsPdfPreviewOpen(true);
  };

  const closeStudentPopup = () => {
    setIsPopupOpen(false);
    setSelectedStudent(null);
    setFormSuccess(false);
    setFormError('');
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setSponsorForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSponsorSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError('');
    setFormSuccess(false);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/sponsorship/interest`, {
        ...sponsorForm,
        studentId: selectedStudent._id
      });

      if (response.status === 201) {
        setFormSuccess(true);
        setStudents(prev => prev.filter(student => student._id !== selectedStudent._id));
        setTimeout(closeStudentPopup, 3000);
      }
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to submit sponsorship request.');
    } finally {
      setFormSubmitting(false);
    }
  };

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

  const SkeletonCard = ({ index }) => (
    <motion.div 
      className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/30 p-4 mb-5 flex gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="w-16 h-20 bg-gray-200 rounded-lg"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
      </div>
    </motion.div>
  );

  const StudentProfileCard = ({ student, index }) => (
    <motion.div 
      className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/30 p-4 mb-5 flex gap-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      {/* ✅ Passport-style image: 3:4 ratio, object-top */}
      <div className="flex-shrink-0 w-16 h-20 rounded-lg overflow-hidden border border-gray-200">
        <img
          src={student.imageUrl || "/default-student.jpg"}
          alt={student.name}
          className="w-full h-full object-cover object-top"
          onError={(e) => e.target.src = "/default-student.jpg"}
          loading="lazy"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-[#2b473f] mb-1 line-clamp-1">{student.name}</h3>
        <p className="text-xs text-gray-600 mb-2">ID: {student.idNumber} • {student.class}</p>
        
        <div className="grid grid-cols-2 gap-2 text-xs mb-2">
          <span className="bg-[#f6f4ee] px-2 py-1 rounded">DOB: {formatDate(student.dateOfBirth)}</span>
          <span className="bg-[#f6f4ee] px-2 py-1 rounded">Age: {student.age}</span>
        </div>
        
        <p className="text-xs text-gray-700 mb-3 line-clamp-2">
          {student.personality || 'Bright'} learner. Strengths: {student.academicStrengths || 'N/A'}.
        </p>
        
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => openPdfPreview(student)}
            className="text-xs px-2.5 py-1 bg-[#2b473f] text-white rounded text-nowrap flex items-center gap-1"
          >
            <BookOpen size={12} />
            Get to Know {student.name.split(' ')[0]}'s Story
          </button>
          <button 
            onClick={() => openSponsorPopup(student)}
            className="text-xs px-2.5 py-1 bg-[#932528] text-white rounded text-nowrap"
          >
            Sponsor
          </button>
        </div>
      </div>
    </motion.div>
  );

  const SponsorshipFormPopup = () => {
    if (!isPopupOpen || !selectedStudent) return null;

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
                <h2 className="text-lg font-bold text-[#2b473f]">Sponsor {selectedStudent.name.split(' ')[0]}</h2>
                <button onClick={closeStudentPopup} className="text-gray-500 hover:text-[#932528] text-xl">✕</button>
              </div>
            </div>
            
            <div className="p-5">
              {formSuccess ? (
                <div className="text-center py-6">
                  <div className="text-4xl mb-3">✅</div>
                  <h3 className="text-lg font-bold text-green-600 mb-2">Thank You!</h3>
                  <p className="text-sm text-gray-700">
                    We’ll contact you soon to complete the sponsorship.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSponsorSubmit} className="space-y-3">
                  <input
                    type="text"
                    name="sponsorName"
                    value={sponsorForm.sponsorName}
                    onChange={handleFormChange}
                    placeholder="Full Name *"
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8CA9B4] focus:outline-none"
                  />
                  <input
                    type="email"
                    name="sponsorEmail"
                    value={sponsorForm.sponsorEmail}
                    onChange={handleFormChange}
                    placeholder="Email *"
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8CA9B4] focus:outline-none"
                  />
                  <input
                    type="tel"
                    name="sponsorPhone"
                    value={sponsorForm.sponsorPhone}
                    onChange={handleFormChange}
                    placeholder="Phone *"
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8CA9B4] focus:outline-none"
                  />
                  <textarea
                    name="message"
                    value={sponsorForm.message}
                    onChange={handleFormChange}
                    placeholder="Message (Optional)"
                    rows={3}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8CA9B4] focus:outline-none resize-none"
                  />
                  
                  {formError && (
                    <p className="text-xs text-red-600 bg-red-50 p-2 rounded">{formError}</p>
                  )}

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={closeStudentPopup}
                      className="flex-1 text-sm px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="flex-1 text-sm px-3 py-2 bg-[#932528] text-white rounded-lg disabled:opacity-50"
                    >
                      {formSubmitting ? 'Submitting...' : 'Submit'}
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
                className="px-4 py-2 bg-[#2b473f] text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#3a5c52]"
              >
                <Download size={16} />
                Download PDF Bio
              </button>
              <button
                onClick={() => setIsPdfPreviewOpen(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm"
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
    <div className="font-open-sans bg-gradient-to-b from-white to-[#f9f8f5] min-h-screen pt-8 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Stats Banner */}
        <div className="bg-gradient-to-r from-[#2b473f] to-[#3a5c52] rounded-xl p-4 mb-8 text-center text-white">
          <p className="text-sm">
            {students.length} children are currently seeking sponsors • $35/month changes a life
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 mb-8 border border-gray-200/50">
          <div className="flex items-center gap-2 mb-3">
            <Filter size={14} className="text-[#2b473f]" />
            <h3 className="text-sm font-semibold text-[#2b473f]">Filter Students</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="relative">
              <Search size={12} className="absolute left-2 top-2 text-gray-400" />
              <input
                type="text"
                placeholder="Search name or ID"
                value={filters.searchTerm}
                onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                className="w-full pl-6 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg"
              />
            </div>
            <select
              value={filters.class}
              onChange={(e) => setFilters(prev => ({ ...prev, class: e.target.value }))}
              className="text-xs py-1.5 border border-gray-300 rounded-lg"
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
              className="text-xs py-1.5 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              placeholder="Max Age"
              value={filters.maxAge}
              onChange={(e) => setFilters(prev => ({ ...prev, maxAge: e.target.value }))}
              className="text-xs py-1.5 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Student List */}
        <div className="mb-12">
          <h2 className="text-lg font-bold text-[#2b473f] mb-4">Children Seeking Sponsors</h2>
          
          {error ? (
            <div className="text-center py-8 text-red-600">{error}</div>
          ) : loading ? (
            Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} index={i} />)
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

        {/* ✅ NEW: CTA BELOW STUDENTS */}
        <motion.div 
          className="bg-gradient-to-r from-[#8CA9B4] to-[#7a96a0] rounded-2xl p-6 text-center shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-bold text-white mb-2">Ready to Change a Life?</h3>
          <p className="text-white/90 text-sm mb-4">
            Your sponsorship provides education, meals, mentorship, and hope.
          </p>
          <motion.button
            onClick={() => document.querySelector('h2')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-5 py-2 bg-white text-[#2b473f] font-semibold rounded-full text-sm shadow hover:shadow-md"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Sponsor a Child Now
          </motion.button>
        </motion.div>
      </div>

      <SponsorshipFormPopup />
      <PdfPreviewModal />
    </div>
  );
}