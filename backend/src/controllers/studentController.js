// backend/src/controllers/studentController.js
const Student = require('../models/Student');
const json2csv = require('json2csv').parse;

// REMOVE cloudinary config and all upload logic

const getStudents = async (req, res) => {
  try {
    const students = await Student.find().select('-__v');
    res.json(students);
  } catch (err) {
    console.error('❌ Get Students Error:', err.message);
    res.status(500).json({ message: 'Failed to fetch students' });
  }
};

const createStudent = async (req, res) => {
  console.log('📄 Create student body:', req.body);

  const {
    idNumber,
    name,
    dateOfBirth,
    class: studentClass,
    age,
    personality,
    academicStrengths,
    overallPerformance,
    familyBackground,
    financialSituation,
    aspirations,
    supportNeeded,
    achievements,
    // Sponsorship fields - NEW
    isSponsored,
    sponsorName,
    sponsorEmail,
    sponsorPhone,
    sponsorNotes,
    imageUrl  // ← Now required from frontend
  } = req.body;

  // ✅ Validate imageUrl instead of file
  if (!imageUrl) {
    return res.status(400).json({ message: 'Student photo URL is required' });
  }

  try {
    const student = new Student({
      idNumber: idNumber?.trim(),
      name: name?.trim(),
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      class: studentClass?.trim(),
      age: age ? parseInt(age, 10) : undefined,
      personality: personality?.trim(),
      academicStrengths: academicStrengths?.trim(),
      overallPerformance: overallPerformance?.trim(),
      familyBackground: familyBackground?.trim(),
      financialSituation: financialSituation?.trim(),
      aspirations: aspirations?.trim(),
      supportNeeded: supportNeeded?.trim(),
      achievements: achievements 
        ? achievements.split(',').map(s => s.trim()).filter(s => s)
        : [],
      // Sponsorship fields - NEW
      isSponsored: Boolean(isSponsored),
      sponsorName: sponsorName?.trim(),
      sponsorEmail: sponsorEmail?.trim(),
      sponsorPhone: sponsorPhone?.trim(),
      sponsorNotes: sponsorNotes?.trim(),
      imageUrl, // ← Directly from frontend
    });

    await student.save();
    res.status(201).json(student);
  } catch (err) {
    console.error('❌ Create Student Error:', err.message);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        message: Object.values(err.errors).map(e => e.message)[0] 
      });
    }
    res.status(500).json({ message: 'Failed to create student. Please try again.' });
  }
};

const updateStudent = async (req, res) => {
  console.log('📄 Update student body:', req.body);
  
  const {
    idNumber,
    name,
    dateOfBirth,
    class: studentClass,
    age,
    personality,
    academicStrengths,
    overallPerformance,
    familyBackground,
    financialSituation,
    aspirations,
    supportNeeded,
    achievements,
    // Sponsorship fields - NEW
    isSponsored,
    sponsorName,
    sponsorEmail,
    sponsorPhone,
    sponsorNotes,
    imageUrl
  } = req.body;
  
  const { id } = req.params;

  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Update all fields (including imageUrl)
    student.idNumber = idNumber?.trim() || student.idNumber;
    student.name = name?.trim() || student.name;
    student.dateOfBirth = dateOfBirth ? new Date(dateOfBirth) : student.dateOfBirth;
    student.class = studentClass?.trim() || student.class;
    student.age = age ? parseInt(age, 10) : student.age;
    student.personality = personality?.trim() || student.personality;
    student.academicStrengths = academicStrengths?.trim() || student.academicStrengths;
    student.overallPerformance = overallPerformance?.trim() || student.overallPerformance;
    student.familyBackground = familyBackground?.trim() || student.familyBackground;
    student.financialSituation = financialSituation?.trim() || student.financialSituation;
    student.aspirations = aspirations?.trim() || student.aspirations;
    student.supportNeeded = supportNeeded?.trim() || student.supportNeeded;
    student.achievements = achievements
      ? achievements.split(',').map(s => s.trim()).filter(s => s)
      : student.achievements;
    student.imageUrl = imageUrl || student.imageUrl; // Only update if provided
    
    // Sponsorship fields - NEW
    student.isSponsored = isSponsored !== undefined ? Boolean(isSponsored) : student.isSponsored;
    student.sponsorName = sponsorName?.trim() || student.sponsorName;
    student.sponsorEmail = sponsorEmail?.trim() || student.sponsorEmail;
    student.sponsorPhone = sponsorPhone?.trim() || student.sponsorPhone;
    student.sponsorNotes = sponsorNotes?.trim() || student.sponsorNotes;

    await student.save();
    res.json(student);
  } catch (err) {
    console.error('❌ Update Student Error:', err.message);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        message: Object.values(err.errors).map(e => e.message)[0] 
      });
    }
    res.status(500).json({ message: 'Failed to update student. Please try again.' });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    await student.deleteOne();
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    console.error('❌ Delete Student Error:', err.message);
    res.status(500).json({ message: 'Failed to delete student' });
  }
};

// NEW: Export students to CSV
const exportStudents = async (req, res) => {
  try {
    const students = await Student.find().select('-__v');
    
    // Format the data for CSV
    const csvData = students.map(student => ({
      'Student ID': student.idNumber,
      'Name': student.name,
      'Date of Birth': student.dateOfBirth ? student.dateOfBirth.toISOString().split('T')[0] : '',
      'Class': student.class,
      'Age': student.age || '',
      'Personality': student.personality || '',
      'Academic Strengths': student.academicStrengths || '',
      'Overall Performance': student.overallPerformance || '',
      'Family Background': student.familyBackground || '',
      'Financial Situation': student.financialSituation || '',
      'Aspirations': student.aspirations || '',
      'Support Needed': student.supportNeeded || '',
      'Achievements': Array.isArray(student.achievements) ? student.achievements.join('; ') : student.achievements || '',
      'Is Sponsored': student.isSponsored ? 'Yes' : 'No',
      'Sponsor Name': student.sponsorName || '',
      'Sponsor Email': student.sponsorEmail || '',
      'Sponsor Phone': student.sponsorPhone || '',
      'Sponsor Notes': student.sponsorNotes || '',
      'Image URL': student.imageUrl || '',
      'Created At': student.createdAt ? student.createdAt.toISOString() : '',
      'Updated At': student.updatedAt ? student.updatedAt.toISOString() : ''
    }));

    // Convert to CSV
    const csv = json2csv(csvData, {
      fields: Object.keys(csvData[0] || {}),
      header: true,
      delimiter: ','
    });

    // Set headers for file download
    res.header('Content-Type', 'text/csv');
    res.header('Content-Disposition', 'attachment; filename=students_export.csv');
    res.status(200).send(csv);
  } catch (err) {
    console.error('❌ Export Students Error:', err.message);
    res.status(500).json({ message: 'Failed to export students' });
  }
};

module.exports = {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  exportStudents,
};