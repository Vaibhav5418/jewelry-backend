const Jewelry = require('../models/Jewelry');

// Get all jewelry with filtering and pagination
const getAllJewelry = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      subcategory,
      gender,
      material,
      minPrice,
      maxPrice,
      search,
      featured,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = { isActive: true };
    
    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (gender) filter.gender = gender;
    if (material) filter.material = material;
    if (featured === 'true') filter.featured = true;
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    // Text search
    if (search) {
      filter.$text = { $search: search };
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const [jewelry, total] = await Promise.all([
      Jewelry.find(filter)
        .populate('createdBy', 'displayName')
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .select('-__v'),
      Jewelry.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(total / parseInt(limit));

    res.json({
      jewelry,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error fetching jewelry:', error);
    res.status(500).json({ error: 'Failed to fetch jewelry' });
  }
};

// Get jewelry by ID
const getJewelryById = async (req, res) => {
  try {
    const jewelry = await Jewelry.findById(req.params.id)
      .populate('createdBy', 'displayName')
      .select('-__v');

    if (!jewelry || !jewelry.isActive) {
      return res.status(404).json({ error: 'Jewelry not found' });
    }

    res.json(jewelry);
  } catch (error) {
    console.error('Error fetching jewelry:', error);
    res.status(500).json({ error: 'Failed to fetch jewelry' });
  }
};

// Get jewelry by category
const getJewelryByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 12, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    const filter = { category, isActive: true };
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [jewelry, total] = await Promise.all([
      Jewelry.find(filter)
        .populate('createdBy', 'displayName')
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .select('-__v'),
      Jewelry.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(total / parseInt(limit));

    res.json({
      jewelry,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error fetching jewelry by category:', error);
    res.status(500).json({ error: 'Failed to fetch jewelry by category' });
  }
};

// Get featured jewelry
const getFeaturedJewelry = async (req, res) => {
  try {
    const featuredJewelry = await Jewelry.find({ featured: true, isActive: true })
      .populate('createdBy', 'displayName')
      .sort({ createdAt: -1 })
      .limit(8)
      .select('-__v');

    res.json(featuredJewelry);
  } catch (error) {
    console.error('Error fetching featured jewelry:', error);
    res.status(500).json({ error: 'Failed to fetch featured jewelry' });
  }
};

// Get jewelry statistics
const getJewelryStats = async (req, res) => {
  try {
    const stats = await Jewelry.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          totalItems: { $sum: 1 },
          totalCategories: { $addToSet: '$category' },
          totalMaterials: { $addToSet: '$material' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      },
      {
        $project: {
          _id: 0,
          totalItems: 1,
          totalCategories: { $size: '$totalCategories' },
          totalMaterials: { $size: '$totalMaterials' },
          avgPrice: { $round: ['$avgPrice', 2] },
          minPrice: 1,
          maxPrice: 1
        }
      }
    ]);

    res.json(stats[0] || {});
  } catch (error) {
    console.error('Error fetching jewelry stats:', error);
    res.status(500).json({ error: 'Failed to fetch jewelry statistics' });
  }
};

// Search jewelry
const searchJewelry = async (req, res) => {
  try {
    const { q, page = 1, limit = 12 } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const filter = {
      $text: { $search: q },
      isActive: true
    };

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [jewelry, total] = await Promise.all([
      Jewelry.find(filter)
        .populate('createdBy', 'displayName')
        .sort({ score: { $meta: 'textScore' } })
        .skip(skip)
        .limit(parseInt(limit))
        .select('-__v'),
      Jewelry.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(total / parseInt(limit));

    res.json({
      jewelry,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems: total,
        itemsPerPage: parseInt(limit)
      },
      searchQuery: q
    });
  } catch (error) {
    console.error('Error searching jewelry:', error);
    res.status(500).json({ error: 'Failed to search jewelry' });
  }
};

module.exports = {
  getAllJewelry,
  getJewelryById,
  getJewelryByCategory,
  getFeaturedJewelry,
  getJewelryStats,
  searchJewelry
};
