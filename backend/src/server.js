// backend/src/server.js
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env (in parent directory)
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

// Validate critical environment variables
if (!process.env.JWT_SECRET) {
  console.error('❌ Missing JWT_SECRET in .env');
  process.exit(1);
}

// Optional: Validate email config if you plan to use it
if (process.env.EMAIL_USER && !process.env.EMAIL_PASS) {
  console.warn('⚠️ EMAIL_USER set but EMAIL_PASS missing. Email notifications will be disabled.');
}

const connectDB = require('./config/db');
const app = express();

// ✅ Allowed origins — corrected with no trailing spaces
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'https://anointedvessels.netlify.app'
];

app.use(require('cors')({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., mobile apps, cron jobs, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin} not in allowed list`));
    }
  },
  credentials: true
}));

app.use(require('helmet')());
app.use(require('morgan')('combined'));
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/sponsorship', require('./routes/sponsorshipRoutes')); // ✅ Added sponsorship routes

// Global error handler
app.use((err, req, res, next) => {
  console.error('💥 Global error:', err);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Handle 404 for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server after DB connection
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    // 🔥 MUST bind to 0.0.0.0 for Render to detect the port
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