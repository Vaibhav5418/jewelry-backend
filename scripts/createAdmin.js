const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jewelry_showcase');
    console.log('Connected to MongoDB');

    // Admin user details
    const adminEmail = 'admin@jewelryhub.com';
    const adminData = {
      firebaseUid: 'admin-seed-123', // This will be replaced when you login with Google
      email: adminEmail,
      firstName: 'Admin',
      lastName: 'User',
      displayName: 'Admin User',
      role: 'admin',
      isActive: true,
      emailVerified: true
    };

    // Check if admin already exists
    let admin = await User.findOne({ email: adminEmail });
    
    if (admin) {
      // Update existing admin
      admin.role = 'admin';
      admin.isActive = true;
      await admin.save();
      console.log('✅ Admin user updated successfully!');
    } else {
      // Create new admin
      admin = new User(adminData);
      await admin.save();
      console.log('✅ Admin user created successfully!');
    }

    console.log('Admin Details:');
    console.log('- Email:', admin.email);
    console.log('- Role:', admin.role);
    console.log('- Active:', admin.isActive);
    console.log('\n🔑 To login as admin:');
    console.log('1. Go to your frontend');
    console.log('2. Click "Login with Google"');
    console.log('3. Use Google account with email:', adminEmail);
    console.log('4. You will automatically get admin access!');

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the script
createAdminUser();
