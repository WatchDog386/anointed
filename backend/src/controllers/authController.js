const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await Admin.create({
      email,
      password: hashedPassword,
    });

    if (admin) {
      return res.status(201).json({
        _id: admin._id,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      return res.status(400).json({ message: 'Invalid admin data' });
    }
  } catch (err) {
    console.error('❌ Register Error:', err.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // 🔍 Debug: log incoming credentials (remove in production!)
    console.log('🔍 Login attempt with email:', email);
    console.log('🔒 Password received (length):', password.length);

    const admin = await Admin.findOne({ email });

    if (!admin) {
      console.log('❌ No admin found with email:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 🔍 Debug: check if password field looks like a bcrypt hash
    console.log('🔑 Stored password (first 10 chars):', admin.password.substring(0, 10));

    const isMatch = await bcrypt.compare(password, admin.password);

    if (isMatch) {
      console.log('✅ Login successful for:', email);
      return res.json({
        _id: admin._id,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      console.log('❌ Password mismatch for:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    console.error('❌ Login Error:', err.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select('-password');
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    return res.json(admin);
  } catch (err) {
    console.error('❌ GetMe Error:', err.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getMe,
};