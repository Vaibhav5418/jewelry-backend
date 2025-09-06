const express = require('express');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { verifyFirebaseToken } = require('../middleware/firebaseAuth');
const {
  register,
  login,
  firebaseAuth,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  logout,
  getUserById,
  getAllUsers,
  updateUserRole,
  toggleUserStatus,
  promoteToAdmin
} = require('../controllers/authController');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/firebase-auth', firebaseAuth);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/promote-admin', promoteToAdmin); // For setup purposes only

// Protected routes (support both JWT and Firebase tokens)
router.get('/profile', verifyFirebaseToken, getProfile);
router.put('/profile', verifyFirebaseToken, updateProfile);
router.put('/change-password', verifyFirebaseToken, changePassword);
router.post('/logout', verifyFirebaseToken, logout);

// Admin routes (support both JWT and Firebase tokens)
router.get('/users', verifyFirebaseToken, requireRole('admin'), getAllUsers);
router.get('/users/:userId', verifyFirebaseToken, requireRole('admin'), getUserById);
router.put('/users/:userId/role', verifyFirebaseToken, requireRole('admin'), updateUserRole);
router.patch('/users/:userId/toggle-status', verifyFirebaseToken, requireRole('admin'), toggleUserStatus);

module.exports = router;
