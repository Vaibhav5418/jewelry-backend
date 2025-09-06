const express = require('express');
const {
  getAllJewelry,
  getJewelryById,
  getJewelryByCategory,
  getFeaturedJewelry,
  getJewelryStats,
  searchJewelry
} = require('../controllers/jewelryController');

const router = express.Router();

// Get all jewelry with filtering and pagination
router.get('/', getAllJewelry);

// Get jewelry by ID
router.get('/:id', getJewelryById);

// Get jewelry by category
router.get('/category/:category', getJewelryByCategory);

// Get featured jewelry
router.get('/featured/items', getFeaturedJewelry);

// Get jewelry statistics
router.get('/stats/overview', getJewelryStats);

// Search jewelry
router.get('/search', searchJewelry);

module.exports = router;
