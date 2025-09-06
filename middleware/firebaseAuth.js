const admin = require('../config/firebaseAdmin');
const User = require('../models/User');
const { isAdminEmail } = require('../config/adminConfig');

// Verify Firebase token
const verifyFirebaseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    // Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Find user by Firebase UID
    let user = await User.findOne({ firebaseUid: decodedToken.uid });
    
    if (!user) {
      // Check if this is an admin email
      const isAdmin = isAdminEmail(decodedToken.email);
      
      // If user doesn't exist, create a new one
      user = new User({
        firebaseUid: decodedToken.uid,
        email: decodedToken.email,
        firstName: decodedToken.name?.split(' ')[0] || 'User',
        lastName: decodedToken.name?.split(' ').slice(1).join(' ') || '',
        displayName: decodedToken.name || decodedToken.email,
        photoURL: decodedToken.picture || '',
        emailVerified: decodedToken.email_verified || false,
        role: isAdmin ? 'admin' : 'user' // Auto-assign admin role for specific emails
      });
      await user.save();
      console.log(`New user created: ${user.email} with role: ${user.role}`);
    } else {
      // Check if this user should be admin (in case they were created before admin setup)
      const shouldBeAdmin = isAdminEmail(decodedToken.email);
      
      // Update last login and role if needed
      user.lastLogin = new Date();
      if (decodedToken.name) user.displayName = decodedToken.name;
      if (decodedToken.picture) user.photoURL = decodedToken.picture;
      
      // Update role if this email should be admin
      if (shouldBeAdmin && user.role !== 'admin') {
        user.role = 'admin';
        console.log(`User ${user.email} promoted to admin on login`);
      }
      
      await user.save();
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({ error: 'Account is deactivated. Please contact support.' });
    }

    // Add user info to request
    req.user = {
      _id: user._id,
      userId: user._id,
      email: user.email,
      role: user.role,
      firebaseUid: user.firebaseUid
    };

    next();
  } catch (error) {
    console.error('Firebase token verification error:', error);
    
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({ error: 'Token expired' });
    }
    if (error.code === 'auth/invalid-id-token') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    if (error.code === 'auth/argument-error') {
      return res.status(401).json({ error: 'Invalid token format' });
    }
    
    res.status(500).json({ error: 'Token verification failed' });
  }
};

module.exports = { verifyFirebaseToken };
