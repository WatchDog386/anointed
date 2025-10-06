// createAdmin.mjs
import mongoose from 'mongoose';
import 'dotenv/config';
import Admin from './src/models/Admin.js';

const createAdmins = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('❌ MONGODB_URI is not defined in environment variables. Check your .env file.');
    }

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ Connected to MongoDB');

    // 🔥 Both admins included
    const admins = [
      { email: 'fanteskorri36@gmail.com', password: 'fantes36' },
      { email: 'benardmusereke@gmail.com', password: 'Musereke1' }
    ];

    // Validate password length (min 6 characters)
    for (const admin of admins) {
      if (admin.password.length < 6) {
        throw new Error(`❌ Password for ${admin.email} is too short. Must be at least 6 characters.`);
      }
    }

    for (const adminData of admins) {
      const { email, password } = adminData;

      // 🔥 Delete existing admin to ensure clean reset
      const deleted = await Admin.deleteOne({ email });
      if (deleted.deletedCount > 0) {
        console.log(`🗑️  Existing admin ${email} deleted.`);
      }

      // 🔥 Create fresh admin (password will be hashed if your Admin model has pre-save hook)
      const newAdmin = new Admin({ email, password });
      await newAdmin.save();
      console.log(`✅ Admin created successfully → Email: ${email}, Password: ${password}`);
    }

    console.log('🎉 All admin(s) reset and created successfully.');

    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Fatal error during admin creation:');
    console.error(error.message);
    if (error.name === 'ValidationError') {
      console.error('📄 Validation failed. Check password length or email format.');
    }
    if (error.name === 'MongoServerSelectionError') {
      console.error('🌐 Could not connect to MongoDB. Check your MONGODB_URI and network.');
    }
    process.exit(1);
  }
};

createAdmins();