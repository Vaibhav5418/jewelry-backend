const Jewelry = require('../models/Jewelry');
const cloudinary = require('../config/cloudinary');

// Get admin dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    const stats = await Jewelry.aggregate([
      {
        $group: {
          _id: null,
          totalItems: { $sum: 1 },
          activeItems: { $sum: { $cond: ['$isActive', 1, 0] } },
          featuredItems: { $sum: { $cond: ['$featured', 1, 0] } },
          totalValue: { $sum: '$price' },
          avgPrice: { $avg: '$price' }
        }
      }
    ]);

    const categoryStats = await Jewelry.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgPrice: { $avg: '$price' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const materialStats = await Jewelry.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$material',
          count: { $sum: 1 },
          avgPrice: { $avg: '$price' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      overview: stats[0] || {},
      categoryStats,
      materialStats
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ error: 'Failed to fetch admin statistics' });
  }
};

// Get all jewelry for admin
const getAllJewelryForAdmin = async (req, res) => {
  try {
    const jewelry = await Jewelry.find()
      .populate('createdBy', 'displayName')
      .sort({ createdAt: -1 })
      .select('-__v');

    res.json(jewelry);
  } catch (error) {
    console.error('Error fetching jewelry for admin:', error);
    res.status(500).json({ error: 'Failed to fetch jewelry' });
  }
};

// Create new jewelry
const createJewelry = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      subcategory,
      gender,
      material,
      price,
      weight,
      weightUnit,
      length,
      width,
      height,
      unit,
      tags,
      featured
    } = req.body;

    // Create jewelry item
    const jewelry = new Jewelry({
      name,
      description,
      category,
      subcategory,
      gender,
      material,
      price: parseFloat(price),
      weight: weight ? parseFloat(weight) : undefined,
      weightUnit,
      dimensions: {
        length: length ? parseFloat(length) : undefined,
        width: width ? parseFloat(width) : undefined,
        height: height ? parseFloat(height) : undefined,
        unit: unit || 'mm'
      },
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      featured: featured === 'true',
      createdBy: req.user._id
    });

    await jewelry.save();
    res.status(201).json(jewelry);
  } catch (error) {
    console.error('Error creating jewelry:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update jewelry
const updateJewelry = async (req, res) => {
  try {
    const jewelry = await Jewelry.findById(req.params.id);
    if (!jewelry) {
      return res.status(404).json({ error: 'Jewelry not found' });
    }

    const updateData = { ...req.body };
    
    // Parse numeric fields
    if (updateData.price) updateData.price = parseFloat(updateData.price);
    if (updateData.weight) updateData.weight = parseFloat(updateData.weight);
    if (updateData.length) updateData.length = parseFloat(updateData.length);
    if (updateData.width) updateData.width = parseFloat(updateData.width);
    if (updateData.height) updateData.height = parseFloat(updateData.height);
    if (updateData.tags) updateData.tags = updateData.tags.split(',').map(tag => tag.trim());
    if (updateData.featured !== undefined) updateData.featured = updateData.featured === 'true';

    const updatedJewelry = await Jewelry.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('createdBy', 'displayName');

    res.json(updatedJewelry);
  } catch (error) {
    console.error('Error updating jewelry:', error);
    res.status(500).json({ error: error.message });
  }
};

// Delete jewelry
const deleteJewelry = async (req, res) => {
  try {
    const jewelry = await Jewelry.findById(req.params.id);
    if (!jewelry) {
      return res.status(404).json({ error: 'Jewelry not found' });
    }

    // Delete images from Cloudinary if they exist
    if (jewelry.images && jewelry.images.length > 0) {
      const deletePromises = jewelry.images.map(image => 
        cloudinary.uploader.destroy(image.publicId)
      );
      await Promise.all(deletePromises);
    }

    await Jewelry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Jewelry deleted successfully' });
  } catch (error) {
    console.error('Error deleting jewelry:', error);
    res.status(500).json({ error: 'Failed to delete jewelry' });
  }
};

// Toggle jewelry status
const toggleJewelryStatus = async (req, res) => {
  try {
    const jewelry = await Jewelry.findByIdAndUpdate(
      req.params.id,
      { isActive: !req.body.isActive },
      { new: true }
    ).populate('createdBy', 'displayName');

    res.json(jewelry);
  } catch (error) {
    console.error('Error toggling jewelry status:', error);
    res.status(500).json({ error: 'Failed to toggle jewelry status' });
  }
};

module.exports = {
  getDashboardStats,
  getAllJewelryForAdmin,
  createJewelry,
  updateJewelry,
  deleteJewelry,
  toggleJewelryStatus
};
