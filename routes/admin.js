const express = require('express');
const { requireAdmin } = require('../middleware/auth');
const { verifyFirebaseToken } = require('../middleware/firebaseAuth');
const {
  getDashboardStats,
  getAllJewelryForAdmin,
  createJewelry,
  updateJewelry,
  deleteJewelry,
  toggleJewelryStatus
} = require('../controllers/adminController');

const router = express.Router();

// Get admin dashboard stats
router.get('/dashboard/stats', verifyFirebaseToken, requireAdmin, getDashboardStats);

// Get all jewelry for admin
router.get('/jewelry', verifyFirebaseToken, requireAdmin, getAllJewelryForAdmin);

// Create new jewelry
router.post('/jewelry', verifyFirebaseToken, requireAdmin, createJewelry);

// Update jewelry
router.put('/jewelry/:id', verifyFirebaseToken, requireAdmin, updateJewelry);

// Delete jewelry
router.delete('/jewelry/:id', verifyFirebaseToken, requireAdmin, deleteJewelry);

// Toggle jewelry status
router.patch('/jewelry/:id/toggle-status', verifyFirebaseToken, requireAdmin, toggleJewelryStatus);

module.exports = router;
