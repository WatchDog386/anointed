// backend/src/models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    idNumber: {
      type: String,
      required: [true, 'Student ID number is required'],
      trim: true,
      match: [/^\d+$/, 'ID number must be numeric']
    },
    name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required'],
    },
    class: {
      type: String,
      required: [true, 'Class is required'],
      trim: true,
    },
    age: {
      type: Number,
      min: [3, 'Student must be at least 3 years old'],
      max: [20, 'Student must be under 20 years old'],
    },
    personality: {
      type: String,
      trim: true,
    },
    academicStrengths: {
      type: String,
      trim: true,
    },
    overallPerformance: {
      type: String,
      trim: true,
    },
    familyBackground: {
      type: String,
      trim: true,
    },
    financialSituation: {
      type: String,
      trim: true,
    },
    aspirations: {
      type: String,
      trim: true,
    },
    supportNeeded: {
      type: String,
      trim: true,
    },
    achievements: {
      type: [String],
      default: [],
    },
    sponsorNotes: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, 'Student photo is required'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);