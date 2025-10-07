const Student = require('../models/Student');
const SponsorshipInterest = require('../models/SponsorshipInterest'); // ✅ NEW
const nodemailer = require('nodemailer');

// Email configuration
const EMAIL_CONFIG = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
};

const createTransporter = () => {
  return nodemailer.createTransporter(EMAIL_CONFIG);
};

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

  if (!sponsorName || !sponsorEmail || !sponsorPhone || !studentId) {
    return res.status(400).json({ 
      message: 'Sponsor name, email, phone, and student ID are required' 
    });
  }

  try {
    // Verify student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // ✅ CREATE INTEREST RECORD (don't mark student as sponsored yet!)
    const interest = new SponsorshipInterest({
      studentId,
      sponsorName,
      sponsorEmail,
      sponsorPhone,
      message
    });

    await interest.save();

    // Send emails if configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = createTransporter();
      
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: sponsorEmail,
        ...getSponsorConfirmationEmail(sponsorName, student.name)
      });

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
      message: 'Thank you! We’ve received your sponsorship interest and will contact you soon.',
      interestId: interest._id
    });

  } catch (err) {
    console.error('❌ Sponsorship Interest Error:', err);
    
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        message: Object.values(err.errors).map(e => e.message)[0] 
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