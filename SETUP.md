# Backend Setup Guide

## 🚀 Complete Backend Setup

Your backend is now fully configured with all necessary components!

## 📁 Project Structure

```
backend/
├── config/                 # Configuration files
│   ├── cloudinary.js      # Cloudinary image service config
│   └── firebase.js        # Firebase Admin SDK config
├── controllers/            # Business logic layer
│   ├── authController.js  # Authentication logic
│   ├── jewelryController.js # Jewelry management logic
│   └── adminController.js # Admin operations logic
├── middleware/             # Custom middleware
│   ├── auth.js            # Authentication & authorization
│   ├── errorHandler.js    # Global error handling
│   └── upload.js          # File upload handling
├── models/                 # Database schemas
│   ├── User.js            # User model
│   └── Jewelry.js         # Jewelry model
├── routes/                 # API endpoints
│   ├── auth.js            # Authentication routes
│   ├── jewelry.js         # Public jewelry routes
│   └── admin.js           # Admin-only routes
├── utils/                  # Utility functions
│   ├── database.js        # MongoDB connection
│   └── seedData.js        # Sample data seeding
├── uploads/                # Temporary file storage
├── server.js               # Main server file
├── package.json            # Dependencies & scripts
└── env                     # Environment variables
```

## 🔧 Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
Copy `env` to `.env` and fill in your credentials:

```bash
cp env .env
```

**Required Environment Variables:**
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - A secure random string for JWT tokens
- `CLOUDINARY_*` - Your Cloudinary credentials
- `FIREBASE_*` - Your Firebase Admin SDK credentials

### 3. Database Setup
- Install MongoDB locally or use MongoDB Atlas
- Create a database named `jewelry_showcase`
- The app will automatically create collections and indexes

### 4. Start Development Server
```bash
npm run dev
```

## 🌟 Features Implemented

### ✅ **Complete API Structure**
- **Authentication Routes**: `/api/auth/*`
- **Jewelry Routes**: `/api/jewelry/*`
- **Admin Routes**: `/api/admin/*`

### ✅ **Security Features**
- JWT-based authentication
- Role-based access control
- Rate limiting (100 requests/15min)
- CORS protection
- Helmet security headers
- Input validation & sanitization

### ✅ **Database Features**
- MongoDB with Mongoose ODM
- Optimized indexes for performance
- Text search capabilities
- Aggregation pipelines for statistics

### ✅ **Image Management**
- Cloudinary integration
- File upload validation
- Image optimization
- Organized folder structure

### ✅ **Error Handling**
- Global error middleware
- Proper HTTP status codes
- Detailed error logging
- Graceful shutdown handling

## 📊 API Endpoints

### **Public Endpoints**
- `GET /api/jewelry` - Get all jewelry with filtering
- `GET /api/jewelry/:id` - Get specific jewelry
- `GET /api/jewelry/category/:category` - Get by category
- `GET /api/jewelry/featured/items` - Get featured items
- `GET /api/jewelry/stats/overview` - Get statistics
- `GET /api/jewelry/search` - Search jewelry

### **Protected Endpoints**
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### **Admin Endpoints**
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/jewelry` - All jewelry for admin
- `POST /api/admin/jewelry` - Create new jewelry
- `PUT /api/admin/jewelry/:id` - Update jewelry
- `DELETE /api/admin/jewelry/:id` - Delete jewelry
- `PATCH /api/admin/jewelry/:id/toggle-status` - Toggle status

## 🎯 Sample Data

The backend automatically seeds sample jewelry data including:
- Gold rings
- Silver necklaces
- Rose gold earrings
- Platinum watches
- Sterling silver bracelets

## 🔍 Testing Your API

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Get Featured Jewelry
```bash
curl http://localhost:5000/api/jewelry/featured/items
```

### Get Jewelry by Category
```bash
curl http://localhost:5000/api/jewelry/category/rings
```

## 🚨 Common Issues & Solutions

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access for Atlas

### Firebase Configuration Error
- Download service account key from Firebase Console
- Ensure all Firebase variables are set in `.env`
- Check project ID and credentials

### Cloudinary Upload Error
- Verify Cloudinary credentials
- Check cloud name, API key, and secret
- Ensure account has upload permissions

## 📈 Performance Features

- **Database Indexing**: Optimized queries for fast performance
- **Pagination**: Efficient data loading with page limits
- **Caching**: React Query integration for frontend
- **Image Optimization**: Automatic Cloudinary transformations
- **Rate Limiting**: Prevents API abuse

## 🔐 Security Features

- **JWT Tokens**: Secure authentication
- **Role-based Access**: Admin/User permission system
- **Input Validation**: Prevents malicious data
- **CORS Protection**: Controlled cross-origin requests
- **Rate Limiting**: Prevents brute force attacks

## 🚀 Production Deployment

### Environment Variables
- Set `NODE_ENV=production`
- Use strong `JWT_SECRET`
- Configure production MongoDB URI
- Set up production Cloudinary account

### Security
- Enable HTTPS
- Set up proper CORS origins
- Configure firewall rules
- Monitor API usage

### Monitoring
- Set up logging (Winston/Morgan)
- Configure health checks
- Set up error tracking
- Monitor database performance

---

**Your backend is now production-ready! 🎉**
