import mongoose from 'mongoose';
import 'dotenv/config';
import Admin from './src/models/Admin.js'; // ✅ Changed from User to Admin

const updateAdminRoles = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('❌ MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');

    // Only keep your email
    const adminEmails = [
      'fanteskorri36@gmail.com'
    ];

    for (const email of adminEmails) {
      const result = await Admin.updateOne( // ✅ Using Admin model
        { email },
        { $set: { role: 'admin' } }
      );

      if (result.matchedCount === 0) {
        console.log(`❌ No admin found with email: ${email}`);
      } else if (result.modifiedCount === 0) {
        console.log(`⚠️  Admin ${email} already had role:admin or no change needed`);
      } else {
        console.log(`✅ Successfully updated role to 'admin' for: ${email}`);
      }
    }

    console.log('🎉 Admin roles update completed.');
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating admin roles:', error.message);
    process.exit(1);
  }
};

updateAdminRoles();