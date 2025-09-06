const mongoose = require('mongoose');
const User = require('../models/User');
const { isAdminEmail } = require('../config/adminConfig');
require('dotenv').config();

const fixAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jewelry_showcase');
    console.log('Connected to MongoDB');

    const adminEmail = 'sonivaibhav037@gmail.com';
    
    // Find the user
    let user = await User.findOne({ email: adminEmail });
    
    if (!user) {
      console.log('❌ User not found. Please login with Google first to create the user.');
      return;
    }

    console.log('👤 Found user:', {
      email: user.email,
      currentRole: user.role,
      firebaseUid: user.firebaseUid
    });

    // Check if this email should be admin
    const shouldBeAdmin = isAdminEmail(adminEmail);
    console.log('🔍 Should be admin:', shouldBeAdmin);

    if (shouldBeAdmin && user.role !== 'admin') {
      // Update user to admin
      user.role = 'admin';
      await user.save();
      console.log('✅ User promoted to admin successfully!');
    } else if (user.role === 'admin') {
      console.log('✅ User is already admin!');
    } else {
      console.log('❌ This email is not configured as admin email.');
    }

    // Show final status
    const updatedUser = await User.findOne({ email: adminEmail });
    console.log('\n📊 Final Status:');
    console.log('- Email:', updatedUser.email);
    console.log('- Role:', updatedUser.role);
    console.log('- Active:', updatedUser.isActive);

    console.log('\n🚀 Next Steps:');
    console.log('1. Restart your backend server');
    console.log('2. Logout from frontend');
    console.log('3. Login again with Google');
    console.log('4. You should now see admin access!');

  } catch (error) {
    console.error('❌ Error fixing admin user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the script
fixAdminUser();
