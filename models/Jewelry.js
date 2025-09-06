const mongoose = require('mongoose');

const jewelrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'rings', 'necklaces', 'earrings', 'bracelets', 'anklets', 'pendants',
      'bangles', 'chains', 'sets', 'watches', 'other'
    ]
  },
  subcategory: {
    type: String,
    required: true,
    enum: [
      'gold', 'silver', 'platinum', 'diamond', 'pearl', 'gemstone',
      'traditional', 'modern', 'vintage', 'bridal', 'casual', 'formal'
    ]
  },
  gender: {
    type: String,
    required: true,
    enum: ['men', 'women', 'unisex']
  },
  material: {
    type: String,
    required: true,
    enum: ['gold', 'silver', 'platinum', 'rose_gold', 'white_gold', 'mixed']
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    },
    alt: String
  }],
  price: {
    type: Number,
    required: true,
    min: 0
  },
  weight: {
    type: Number,
    min: 0
  },
  weightUnit: {
    type: String,
    enum: ['grams', 'carats', 'ounces'],
    default: 'grams'
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    unit: {
      type: String,
      enum: ['mm', 'cm', 'inches'],
      default: 'mm'
    }
  },
  inStock: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  tags: [String],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for faster queries
jewelrySchema.index({ category: 1, subcategory: 1 });
jewelrySchema.index({ gender: 1 });
jewelrySchema.index({ material: 1 });
jewelrySchema.index({ featured: 1 });
jewelrySchema.index({ inStock: 1 });
jewelrySchema.index({ price: 1 });
jewelrySchema.index({ createdAt: -1 });

// Text search index
jewelrySchema.index({
  name: 'text',
  description: 'text',
  tags: 'text'
});

module.exports = mongoose.model('Jewelry', jewelrySchema);
