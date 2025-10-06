// src/routes/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  LogOut, 
  Home, 
  Plus, 
  Edit3, 
  Trash2, 
  Users, 
  UserCheck, 
  UserX,
  Upload,
  Search,
  Filter,
  Download,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSponsored, setFilterSponsored] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const navigate = useNavigate();
  const CLOUD_NAME = 'dsfwavo7x';
  const UPLOAD_PRESET = 'student_upload';

  const [formData, setFormData] = useState({
    idNumber: '',
    name: '',
    dateOfBirth: '',
    class: '',
    age: '',
    personality: '',
    academicStrengths: '',
    overallPerformance: '',
    familyBackground: '',
    financialSituation: '',
    aspirations: '',
    supportNeeded: '',
    achievements: '',
    sponsorNotes: '',
    imageUrl: '',
  });

  // Auth & Fetch
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
    } else {
      fetchStudents();
    }
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/students', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const normalizedStudents = res.data.map(student => ({
        ...student,
        achievements: Array.isArray(student.achievements)
          ? student.achievements.join(', ')
          : student.achievements || ''
      }));
      setStudents(normalizedStudents);
    } catch (err) {
      console.error('Fetch error:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/admin/login');
      } else {
        setError('Failed to load students.');
      }
    }
  };

  // Filter and search students
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.idNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.class.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterSponsored === 'all' ? true :
                         filterSponsored === 'sponsored' ? student.sponsorNotes :
                         filterSponsored === 'unsponsored' ? !student.sponsorNotes : true;
    
    return matchesSearch && matchesFilter;
  });

  // === Handlers (NO LOGIC CHANGES) ===
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setFormData(prev => ({ ...prev, imageUrl: '' }));
    }
  };

  const uploadImageToCloudinary = async (file) => {
    if (!file) return null;
    setUploadingImage(true);
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', UPLOAD_PRESET);
    data.append('folder', 'students');

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: data,
      });
      if (!res.ok) throw new Error('Upload failed');
      const result = await res.json();
      return result.secure_url;
    } catch (err) {
      setError('Image upload failed. Please try again.');
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const resetForm = () => {
    setFormData({
      idNumber: '',
      name: '',
      dateOfBirth: '',
      class: '',
      age: '',
      personality: '',
      academicStrengths: '',
      overallPerformance: '',
      familyBackground: '',
      financialSituation: '',
      aspirations: '',
      supportNeeded: '',
      achievements: '',
      sponsorNotes: '',
      imageUrl: '',
    });
    setImageFile(null);
    setImagePreview(null);
    setIsEditing(false);
    setCurrentStudentId(null);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let imageUrl = formData.imageUrl;
      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile);
        if (!imageUrl) { setLoading(false); return; }
      }
      if (!imageUrl) {
        setError('Student photo is required');
        setLoading(false);
        return;
      }

      const payload = {
        ...formData,
        imageUrl,
        age: formData.age ? parseInt(formData.age, 10) : undefined
      };

      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      if (isEditing) {
        await axios.put(`http://localhost:5000/api/students/${currentStudentId}`, payload, config);
        setSuccess('Student updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/students', payload, config);
        setSuccess('Student added successfully!');
      }

      fetchStudents();
      resetForm();
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (student) => {
    setFormData({
      idNumber: student.idNumber || '',
      name: student.name || '',
      dateOfBirth: student.dateOfBirth || '',
      class: student.class || '',
      age: student.age ? String(student.age) : '',
      personality: student.personality || '',
      academicStrengths: student.academicStrengths || '',
      overallPerformance: student.overallPerformance || '',
      familyBackground: student.familyBackground || '',
      financialSituation: student.financialSituation || '',
      aspirations: student.aspirations || '',
      supportNeeded: student.supportNeeded || '',
      achievements: student.achievements || '',
      sponsorNotes: student.sponsorNotes || '',
      imageUrl: student.imageUrl || '',
    });
    setImagePreview(student.imageUrl || null);
    setImageFile(null);
    setCurrentStudentId(student._id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure? This cannot be undone.')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/students/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setStudents(students.filter(s => s._id !== id));
      setSuccess('Student deleted successfully!');
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      setError('Failed to delete student.');
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/admin/login');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
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

  // Stats
  const total = students.length;
  const sponsored = students.filter(s => s.sponsorNotes).length;
  const unsponsored = total - sponsored;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6f4ee] to-white">
      {/* Top Bar */}
      <motion.div 
        className="bg-white border-b border-gray-200/50 sticky top-0 z-50 shadow-sm"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-[#2b473f] w-10 h-10 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">AV</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#2b473f] font-montserrat">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">Manage student profiles & sponsorships</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 text-sm font-medium text-[#2b473f] bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition flex items-center gap-2"
            >
              <Home size={16} />
              Back to Home
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-[#932528] hover:bg-[#7a1e21] rounded-lg transition flex items-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </motion.div>

      {/* Alerts */}
      <AnimatePresence>
        {(error || success) && (
          <motion.div 
            className={`fixed top-20 right-4 z-50 max-w-sm p-4 rounded-xl shadow-lg border ${
              error ? 'bg-red-50 border-red-200 text-red-700' : 'bg-green-50 border-green-200 text-green-700'
            }`}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
          >
            <div className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                error ? 'bg-red-500' : 'bg-green-500'
              }`}>
                <span className="text-white text-xs">!</span>
              </div>
              <span className="text-sm">{error || success}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {[
            { 
              label: 'Total Students', 
              value: total, 
              icon: Users,
              color: 'from-[#2b473f] to-[#3a5c52]',
              bgColor: 'bg-[#2b473f]/10'
            },
            { 
              label: 'Sponsored', 
              value: sponsored, 
              icon: UserCheck,
              color: 'from-[#932528] to-[#a83232]',
              bgColor: 'bg-[#932528]/10'
            },
            { 
              label: 'Awaiting Sponsor', 
              value: unsponsored, 
              icon: UserX,
              color: 'from-[#8CA9B4] to-[#9bb7c4]',
              bgColor: 'bg-[#8CA9B4]/10'
            }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon size={24} className={`bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div 
          className="bg-white rounded-2xl p-6 border border-gray-200/50 shadow-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search students by name, ID, or class..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8CA9B4] focus:border-[#2b473f] transition text-sm"
                />
              </div>
              
              {/* Filter */}
              <div className="flex gap-2">
                <select
                  value={filterSponsored}
                  onChange={(e) => setFilterSponsored(e.target.value)}
                  className="px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8CA9B4] focus:border-[#2b473f] transition text-sm"
                >
                  <option value="all">All Students</option>
                  <option value="sponsored">Sponsored</option>
                  <option value="unsponsored">Unsponsored</option>
                </select>
                
                <button className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition flex items-center gap-2 text-sm">
                  <Download size={16} />
                  Export
                </button>
              </div>
            </div>
            
            <div className="text-sm text-gray-500">
              Showing {filteredStudents.length} of {students.length} students
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div 
            className="bg-white rounded-2xl border border-gray-200/50 shadow-sm overflow-hidden"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-[#f6f4ee] to-white flex justify-between items-center">
              <h2 className="font-semibold text-[#2b473f] text-lg font-montserrat">
                {isEditing ? 'Edit Student' : 'Add New Student'}
              </h2>
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-sm text-gray-500 hover:text-[#932528] font-medium flex items-center gap-1"
                >
                  Cancel
                </button>
              )}
            </div>
            
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload */}
                <div className="flex flex-col items-center text-center border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:border-[#8CA9B4] transition-colors">
                  {imagePreview ? (
                    <div className="relative">
                      <img src={imagePreview} alt="Preview" className="w-32 h-32 rounded-2xl object-cover shadow-md" />
                      <button
                        type="button"
                        onClick={() => { setImagePreview(null); setImageFile(null); }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto text-gray-400 mb-3" size={32} />
                      <p className="text-sm text-gray-600 mb-2">Upload student photo</p>
                      <label className="px-4 py-2 bg-[#2b473f] text-white rounded-lg hover:bg-[#3a5c52] transition cursor-pointer text-sm font-medium inline-flex items-center gap-2">
                        <Upload size={16} />
                        Choose File
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                </div>

                {/* Compact Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField label="ID Number" name="idNumber" value={formData.idNumber} onChange={handleChange} required />
                  <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
                  <InputField label="Date of Birth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} required />
                  <InputField label="Class" name="class" value={formData.class} onChange={handleChange} required />
                  <InputField label="Age" name="age" type="number" min="3" max="20" value={formData.age} onChange={handleChange} />
                </div>

                {/* Text Areas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextAreaField label="Personality" name="personality" value={formData.personality} onChange={handleChange} rows={2} />
                  <TextAreaField label="Academic Strengths" name="academicStrengths" value={formData.academicStrengths} onChange={handleChange} rows={2} />
                  <TextAreaField label="Family Background" name="familyBackground" value={formData.familyBackground} onChange={handleChange} rows={2} />
                  <TextAreaField label="Aspirations" name="aspirations" value={formData.aspirations} onChange={handleChange} rows={2} />
                  <TextAreaField label="Financial Situation" name="financialSituation" value={formData.financialSituation} onChange={handleChange} rows={2} />
                  <TextAreaField label="Support Needed" name="supportNeeded" value={formData.supportNeeded} onChange={handleChange} rows={2} />
                  <TextAreaField label="Achievements" name="achievements" value={formData.achievements} onChange={handleChange} rows={2} />
                  <TextAreaField label="Sponsor Notes (Private)" name="sponsorNotes" value={formData.sponsorNotes} onChange={handleChange} rows={2} />
                </div>

                <button
                  type="submit"
                  disabled={loading || uploadingImage}
                  className={`w-full py-3.5 px-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                    loading || uploadingImage 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-[#932528] to-[#8CA9B4] hover:from-[#7a1e21] hover:to-[#7a96a0] shadow-lg hover:shadow-xl'
                  }`}
                >
                  {uploadingImage ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Uploading Image...
                    </>
                  ) : loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Saving...
                    </>
                  ) : isEditing ? (
                    <>
                      <Edit3 size={18} />
                      Update Student
                    </>
                  ) : (
                    <>
                      <Plus size={18} />
                      Add Student
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Student List */}
          <motion.div 
            className="bg-white rounded-2xl border border-gray-200/50 shadow-sm overflow-hidden"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-[#f6f4ee] to-white">
              <h2 className="font-semibold text-[#2b473f] text-lg font-montserrat flex items-center gap-2">
                Student Profiles ({filteredStudents.length})
                {sponsored > 0 && (
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full font-medium">
                    {sponsored} sponsored
                  </span>
                )}
              </h2>
            </div>
            
            <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
              {filteredStudents.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="inline-block p-4 bg-gray-100 rounded-2xl mb-4">
                    <Users size={32} className="text-gray-400" />
                  </div>
                  <p className="text-gray-600">No students found</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {searchTerm || filterSponsored !== 'all' ? 'Try adjusting your search or filter' : 'Add your first student to get started'}
                  </p>
                </div>
              ) : (
                filteredStudents.map((student, index) => (
                  <motion.div 
                    key={student._id} 
                    className="p-4 hover:bg-gray-50/50 transition"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Image */}
                      <div className="flex-shrink-0 w-full sm:w-20 h-20">
                        {student.imageUrl ? (
                          <img
                            src={student.imageUrl}
                            alt={student.name}
                            className="w-full h-full object-cover rounded-xl border shadow-sm"
                            onError={(e) => e.target.src = 'https://via.placeholder.com/80x80?text=No+Image&bg=f0f0f0'}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center">
                            <span className="text-gray-400 text-xs">No Image</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900 truncate">{student.name}</h3>
                            <p className="text-sm text-gray-500">ID: {student.idNumber} • {student.class}</p>
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => setSelectedStudent(student)}
                              className="p-2 text-gray-500 hover:text-[#8CA9B4] rounded-lg hover:bg-[#8CA9B4]/10 transition"
                              title="Quick View"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => handleEdit(student)}
                              className="p-2 text-gray-500 hover:text-[#2b473f] rounded-lg hover:bg-[#2b473f]/10 transition"
                              title="Edit"
                            >
                              <Edit3 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(student._id)}
                              className="p-2 text-gray-500 hover:text-[#932528] rounded-lg hover:bg-[#932528]/10 transition"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        
                        <div className="mt-2 text-sm text-gray-600 space-y-1">
                          <div className="flex flex-wrap gap-1">
                            <span className="px-2 py-1 bg-[#2b473f]/10 text-[#2b473f] text-xs rounded-lg">
                              Born: {formatDate(student.dateOfBirth)}
                            </span>
                            {student.age && (
                              <span className="px-2 py-1 bg-[#8CA9B4]/10 text-[#2b473f] text-xs rounded-lg">
                                Age: {student.age}
                              </span>
                            )}
                            {student.sponsorNotes && (
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-lg font-medium">
                                Sponsored
                              </span>
                            )}
                          </div>
                          
                          <p className="line-clamp-2 text-xs">
                            {student.personality || 'Bright'} learner with strengths in {student.academicStrengths || 'various subjects'}.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[#2b473f]">Student Details</h3>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <div className="p-6">
                {selectedStudent.imageUrl && (
                  <img
                    src={selectedStudent.imageUrl}
                    alt={selectedStudent.name}
                    className="w-32 h-32 rounded-2xl object-cover mx-auto mb-4 shadow-md"
                  />
                )}
                <div className="space-y-3">
                  <DetailRow label="Name" value={selectedStudent.name} />
                  <DetailRow label="ID Number" value={selectedStudent.idNumber} />
                  <DetailRow label="Class" value={selectedStudent.class} />
                  <DetailRow label="Date of Birth" value={formatDate(selectedStudent.dateOfBirth)} />
                  <DetailRow label="Age" value={selectedStudent.age} />
                  <DetailRow label="Personality" value={selectedStudent.personality} />
                  <DetailRow label="Academic Strengths" value={selectedStudent.academicStrengths} />
                  <DetailRow label="Family Background" value={selectedStudent.familyBackground} />
                  <DetailRow label="Aspirations" value={selectedStudent.aspirations} />
                  {selectedStudent.sponsorNotes && (
                    <DetailRow label="Sponsor Notes" value={selectedStudent.sponsorNotes} />
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Reusable Components
const InputField = ({ label, name, value, onChange, type = "text", required = false, min, max }) => (
  <div>
    <label className="block text-xs font-semibold text-[#2b473f] mb-2">{label}</label>
    <input
      name={name}
      type={type}
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full text-sm px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8CA9B4] focus:border-[#2b473f] transition bg-white"
    />
  </div>
);

const TextAreaField = ({ label, name, value, onChange, rows = 2 }) => (
  <div>
    <label className="block text-xs font-semibold text-[#2b473f] mb-2">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      className="w-full text-sm px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8CA9B4] focus:border-[#2b473f] transition resize-none bg-white"
    />
  </div>
);

const DetailRow = ({ label, value }) => (
  value && (
    <div>
      <span className="text-xs font-semibold text-[#2b473f]">{label}:</span>
      <p className="text-sm text-gray-700 mt-1">{value}</p>
    </div>
  )
);

export default Dashboard;