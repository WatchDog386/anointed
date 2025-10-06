// backend/src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

/**
 * Middleware to protect routes
 * Ensures user has a valid JWT
 */
const protect = async (req, res, next) => {
  let token;

  try {
    // Check for Bearer token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch admin (excluding password)
      req.user = await Admin.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, admin not found' });
      }

      return next();
    }

    // No token provided
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  } catch (err) {
    console.error('❌ Auth Middleware Error:', err.message);
    // More specific error messages for debugging
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Not authorized, token expired' });
    }
    return res.status(401).json({ message: 'Not authorized, token verification failed' });
  }
};

module.exports = { protect };