// backend/src/routes/authRoutes.js
const express = require('express');
const { loginAdmin, registerAdmin, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @route   POST /api/auth/login
 * @desc    Login admin and return JWT
 * @access  Public
 */
router.post('/login', loginAdmin);

/**
 * @route   POST /api/auth/register
 * @desc    Register a new admin
 * @access  Public (⚠️ Disable in production or restrict to super-admins)
 */
router.post('/register', registerAdmin);

/**
 * @route   GET /api/auth/me
 * @desc    Get currently logged-in admin profile
 * @access  Private
 */
router.get('/me', protect, getMe);

module.exports = router;