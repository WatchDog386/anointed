const mongoose = require('mongoose');

const SponsorshipInterestSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
    index: true
  },
  sponsorName: {
    type: String,
    required: true,
    trim: true
  },
  sponsorEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  sponsorPhone: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SponsorshipInterest', SponsorshipInterestSchema);