const Jewelry = require('../models/Jewelry');
const User = require('../models/User');

const seedData = async () => {
  try {
    // Check if data already exists
    const jewelryCount = await Jewelry.countDocuments();
    if (jewelryCount > 0) {
      console.log('Database already seeded');
      return;
    }

    // Create a default admin user if it doesn't exist
    let adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      adminUser = new User({
        firebaseUid: 'seed-admin-123',
        email: 'admin@jewelryhub.com',
        displayName: 'Admin User',
        role: 'admin'
      });
      await adminUser.save();
      console.log('Admin user created');
    }

    // Sample jewelry data
    const sampleJewelry = [
      {
        name: 'Classic Gold Ring',
        description: 'Elegant 18k gold ring with traditional design, perfect for daily wear or special occasions.',
        category: 'rings',
        subcategory: 'gold',
        gender: 'women',
        material: 'gold',
        price: 1299.99,
        weight: 3.5,
        weightUnit: 'grams',
        dimensions: {
          length: 18,
          width: 18,
          height: 2,
          unit: 'mm'
        },
        images: [{
          url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop',
          publicId: 'sample-gold-ring-1',
          alt: 'Classic Gold Ring'
        }],
        tags: ['classic', 'elegant', 'daily-wear'],
        featured: true,
        inStock: true,
        createdBy: adminUser._id
      },
      {
        name: 'Silver Diamond Necklace',
        description: 'Stunning sterling silver necklace featuring a brilliant cut diamond pendant.',
        category: 'necklaces',
        subcategory: 'silver',
        gender: 'women',
        material: 'silver',
        price: 899.99,
        weight: 8.2,
        weightUnit: 'grams',
        dimensions: {
          length: 45,
          width: 12,
          height: 3,
          unit: 'mm'
        },
        images: [{
          url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop',
          publicId: 'sample-silver-necklace-1',
          alt: 'Silver Diamond Necklace'
        }],
        tags: ['diamond', 'pendant', 'elegant'],
        featured: true,
        inStock: true,
        createdBy: adminUser._id
      },
      {
        name: 'Rose Gold Earrings',
        description: 'Beautiful rose gold earrings with pearl accents, perfect for formal events.',
        category: 'earrings',
        subcategory: 'pearl',
        gender: 'women',
        material: 'rose_gold',
        price: 649.99,
        weight: 4.1,
        weightUnit: 'grams',
        dimensions: {
          length: 25,
          width: 15,
          height: 8,
          unit: 'mm'
        },
        images: [{
          url: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=400&fit=crop',
          publicId: 'sample-rose-gold-earrings-1',
          alt: 'Rose Gold Pearl Earrings'
        }],
        tags: ['rose-gold', 'pearl', 'formal'],
        featured: false,
        inStock: true,
        createdBy: adminUser._id
      },
      {
        name: 'Men\'s Platinum Watch',
        description: 'Luxury platinum watch with leather strap, featuring a minimalist design.',
        category: 'watches',
        subcategory: 'platinum',
        gender: 'men',
        material: 'platinum',
        price: 2499.99,
        weight: 85,
        weightUnit: 'grams',
        dimensions: {
          length: 42,
          width: 42,
          height: 12,
          unit: 'mm'
        },
        images: [{
          url: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=400&fit=crop',
          publicId: 'sample-platinum-watch-1',
          alt: 'Men\'s Platinum Watch'
        }],
        tags: ['luxury', 'minimalist', 'leather-strap'],
        featured: true,
        inStock: true,
        createdBy: adminUser._id
      },
      {
        name: 'Sterling Silver Bracelet',
        description: 'Delicate sterling silver bracelet with intricate chain design.',
        category: 'bracelets',
        subcategory: 'silver',
        gender: 'women',
        material: 'silver',
        price: 299.99,
        weight: 12.5,
        weightUnit: 'grams',
        dimensions: {
          length: 190,
          width: 3,
          height: 2,
          unit: 'mm'
        },
        images: [{
          url: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=400&fit=crop',
          publicId: 'sample-silver-bracelet-1',
          alt: 'Sterling Silver Bracelet'
        }],
        tags: ['delicate', 'chain', 'everyday'],
        featured: false,
        inStock: true,
        createdBy: adminUser._id
      }
    ];

    // Insert sample jewelry
    await Jewelry.insertMany(sampleJewelry);
    console.log('Sample jewelry data seeded successfully');

  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

module.exports = seedData;
