// backend/src/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

    if (!uri) {
      throw new Error('No MongoDB URI defined in environment variables');
    }

    // ⚠️ useNewUrlParser and useUnifiedTopology are DEPRECATED in Mongoose 6+
    // They are enabled by default — no need to specify them
    await mongoose.connect(uri);

    console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error('💥 Fatal MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;