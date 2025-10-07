// backend/src/controllers/sponsorshipController.js
const Student = require('../models/Student');
const nodemailer = require('nodemailer');

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

const getSponsorConfirmationEmail = (sponsorName, studentName) => ({
  subject: `Thank You for Your Interest in Sponsoring ${studentName}`,
  html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #2b473f; text-align: center;">Thank You for Your Generous Heart!</h2>
    <p>Dear ${sponsorName},</p>
    <p>Thank you for expressing interest in sponsoring <strong>${studentName}</strong>.</p>
    <p>We will contact you shortly to complete the process.</p>
    <p>Blessings,<br>Anointed Vessels Christian School Team</p>
  </div>`
});

const getAdminNotificationEmail = (sponsorInfo, studentName) => ({
  subject: `New Sponsorship Interest - ${studentName}`,
  html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #932528; text-align: center;">New Sponsorship Request</h2>
    <p><strong>Student:</strong> ${studentName}</p>
    <p><strong>Sponsor:</strong> ${sponsorInfo.sponsorName} (${sponsorInfo.sponsorEmail})</p>
    <p>Please review in the admin dashboard.</p>
  </div>`
});

const submitSponsorshipInterest = async (req, res) => {
  const { sponsorName, sponsorEmail, sponsorPhone, message, studentId } = req.body;

  if (!sponsorName || !sponsorEmail || !sponsorPhone || !studentId) {
    return res.status(400).json({ 
      message: 'All fields are required.' 
    });
  }

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // ✅ IMMEDIATELY MARK AS SPONSORED (to match frontend expectation)
    student.isSponsored = true;
    student.sponsorName = sponsorName;
    student.sponsorEmail = sponsorEmail;
    student.sponsorPhone = sponsorPhone;
    student.sponsorNotes = message || 'Interest submitted via website';
    await student.save();

    // ✅ Send emails (optional)
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
        ...getAdminNotificationEmail({ sponsorName, sponsorEmail, sponsorPhone, message }, student.name)
      });
    }

    res.status(201).json({ 
      message: 'Thank you! Your sponsorship interest has been received.',
      studentId: student._id
    });

  } catch (err) {
    console.error('Sponsorship Error:', err);
    res.status(500).json({ 
      message: 'Failed to process sponsorship. Please try again.' 
    });
  }
};

module.exports = { submitSponsorshipInterest };