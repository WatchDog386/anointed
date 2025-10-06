// backend/src/server.js
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env (in parent directory)
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

// Validate critical environment variable
if (!process.env.JWT_SECRET) {
  console.error('❌ Missing JWT_SECRET in .env');
  process.exit(1);
}

const connectDB = require('./config/db');
const app = express();

// ✅ Allowed origins — corrected with no trailing spaces
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'https://anointedvessels.netlify.app' // ← No spaces!
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

// Global error handler
app.use((err, req, res, next) => {
  console.error('💥 Global error:', err);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server after DB connection
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    // 🔥 MUST bind to 0.0.0.0 for Render to detect the port
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error('💥 Fatal startup error:', error.message);
    process.exit(1);
  }
};

startServer();