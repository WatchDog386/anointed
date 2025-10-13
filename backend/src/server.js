// backend/src/server.js
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load environment variables from .env (in parent directory)
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

// Validate critical environment variables
if (!process.env.JWT_SECRET) {
  console.error('❌ Missing JWT_SECRET in .env');
  process.exit(1);
}

// Optional: Warn if email config incomplete
if (process.env.EMAIL_USER && !process.env.EMAIL_PASS) {
  console.warn('⚠️ EMAIL_USER set but EMAIL_PASS missing. Email notifications will be disabled.');
}

const app = express();

// ✅ Allowed origins — now includes your custom domain
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'https://anointedvessels.netlify.app',
  'https://anointed-3v54.onrender.com',
  'https://anointedvesselschool.com', // ✅ <-- Your custom domain added
  'https://www.anointedvesselschool.com' // ✅ <-- Handles "www" version too
];

// ✅ CORS setup
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps, Postman, internal calls)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.warn(`🚫 CORS blocked request from: ${origin}`);
        return callback(new Error(`CORS blocked: ${origin} not in allowed list`));
      }
    },
    credentials: true,
  })
);

// ✅ Security & logging middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));

// ✅ Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/sponsorship', require('./routes/sponsorshipRoutes'));

// ✅ Handle undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error('💥 Global error:', err.message);
  res.status(500).json({ message: 'Something went wrong on the server.' });
});

// ✅ Start server after DB connection
const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;
    // 🔥 Bind to 0.0.0.0 so Render detects your server
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Backend running on port ${PORT}`);
      console.log(`✅ CORS allowed origins: ${allowedOrigins.join(', ')}`);
    });
  } catch (error) {
    console.error('💥 Fatal startup error:', error.message);
    process.exit(1);
  }
};

startServer();
