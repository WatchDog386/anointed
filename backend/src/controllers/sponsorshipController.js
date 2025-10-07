// backend/src/controllers/sponsorshipController.js
const Student = require('../models/Student');
const nodemailer = require('nodemailer');

// Email configuration - you'll need to set these in your .env file
const EMAIL_CONFIG = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
};

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransporter(EMAIL_CONFIG);
};

// Email templates
const getSponsorConfirmationEmail = (sponsorName, studentName) => {
  return {
    subject: `Thank You for Your Interest in Sponsoring ${studentName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2b473f; text-align: center;">Thank You for Your Generous Heart!</h2>
        <p>Dear ${sponsorName},</p>
        <p>Thank you for expressing interest in sponsoring <strong>${studentName}</strong> at Anointed Vessels Christian School.</p>
        <p>Your compassion and willingness to support a child's education and future is truly inspiring. We will review your application and contact you shortly to complete the sponsorship process.</p>
        <p><strong>What happens next:</strong></p>
        <ul>
          <li>Our team will review your sponsorship request</li>
          <li>We'll contact you within 2-3 business days</li>
          <li>Complete the sponsorship agreement and payment setup</li>
          <li>Begin your journey of transforming a child's life!</li>
        </ul>
        <p>If you have any questions, please don't hesitate to contact us.</p>
        <p>Blessings,<br>Anointed Vessels Christian School Team</p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
        <p style="font-size: 12px; color: #666;">
          This is an automated message. Please do not reply directly to this email.
        </p>
      </div>
    `
  };
};

const getAdminNotificationEmail = (sponsorInfo, studentName) => {
  return {
    subject: `New Sponsorship Interest - ${studentName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #932528; text-align: center;">New Sponsorship Request</h2>
        <p><strong>Student:</strong> ${studentName}</p>
        <p><strong>Sponsor Details:</strong></p>
        <ul>
          <li><strong>Name:</strong> ${sponsorInfo.sponsorName}</li>
          <li><strong>Email:</strong> ${sponsorInfo.sponsorEmail}</li>
          <li><strong>Phone:</strong> ${sponsorInfo.sponsorPhone}</li>
          ${sponsorInfo.message ? `<li><strong>Message:</strong> ${sponsorInfo.message}</li>` : ''}
        </ul>
        <p>Please log into the admin dashboard to review and process this sponsorship request.</p>
        <p><strong>Action Required:</strong> Update the student record to mark them as sponsored once the sponsorship is confirmed.</p>
      </div>
    `
  };
};

const submitSponsorshipInterest = async (req, res) => {
  const { 
    sponsorName, 
    sponsorEmail, 
    sponsorPhone, 
    message, 
    studentId 
  } = req.body;

  // Validation
  if (!sponsorName || !sponsorEmail || !sponsorPhone || !studentId) {
    return res.status(400).json({ 
      message: 'Sponsor name, email, phone, and student ID are required' 
    });
  }

  try {
    // Find the student
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check if student is already sponsored
    if (student.isSponsored) {
      return res.status(400).json({ 
        message: 'This student has already been sponsored. Thank you for your interest!' 
      });
    }

    // Update student record to mark as sponsored
    student.isSponsored = true;
    student.sponsorName = sponsorName;
    student.sponsorEmail = sponsorEmail;
    student.sponsorPhone = sponsorPhone;
    student.sponsorNotes = message || 'Sponsor showed interest through website form';
    
    await student.save();

    // Send confirmation emails (if email config is available)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = createTransporter();
      
      // Send to sponsor
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: sponsorEmail,
        ...getSponsorConfirmationEmail(sponsorName, student.name)
      });

      // Send to admin
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
        ...getAdminNotificationEmail(
          { sponsorName, sponsorEmail, sponsorPhone, message }, 
          student.name
        )
      });
    }

    res.status(201).json({ 
      message: 'Sponsorship interest submitted successfully! We will contact you shortly.',
      studentId: student._id
    });

  } catch (err) {
    console.error('❌ Sponsorship Interest Error:', err.message);
    
    // Handle validation errors from Mongoose
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        message: Object.values(err.errors).map(e => e.message)[0] 
      });
    }
    
    // Handle duplicate key errors (if any)
    if (err.code === 11000) {
      return res.status(400).json({ 
        message: 'This student has already been sponsored. Thank you for your interest!' 
      });
    }
    
    res.status(500).json({ 
      message: 'Failed to submit sponsorship interest. Please try again.' 
    });
  }
};

module.exports = {
  submitSponsorshipInterest
};