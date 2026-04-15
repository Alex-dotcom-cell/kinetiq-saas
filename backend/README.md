# Kinetiq Backend API

Complete backend API for Kinetiq Personal Trainer SaaS platform built with Node.js, Express, and MongoDB.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [Database Setup](#database-setup)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Default Credentials](#default-credentials)

## ✨ Features

- ✅ JWT-based authentication (Register, Login, Get Profile)
- ✅ Role-based access control (Admin, User)
- ✅ Full CRUD operations for content management
- ✅ Public API for fetching content
- ✅ Protected admin endpoints
- ✅ MongoDB integration with Mongoose
- ✅ Password hashing with bcryptjs
- ✅ CORS enabled for frontend integration
- ✅ Request logging with Morgan
- ✅ Comprehensive error handling

## 🛠️ Tech Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **CORS**: cors middleware
- **Logging**: Morgan
- **Environment**: dotenv

## 📁 Project Structure

```
backend/
├── config/
│   ├── database.js          # MongoDB connection
│   └── constants.js         # App constants, roles, messages
├── models/
│   ├── User.js              # User schema
│   ├── HeroSection.js       # Hero section schema
│   ├── AboutSection.js      # About section schema
│   ├── Service.js           # Service schema
│   ├── Testimonial.js       # Testimonial schema
│   ├── Result.js            # Result schema
│   └── Program.js           # Program schema
├── controllers/
│   ├── authController.js    # Auth logic (register, login, getMe)
│   ├── contentController.js # Public content endpoints
│   └── adminController.js   # Admin content management
├── middleware/
│   ├── authMiddleware.js    # JWT verification
│   ├── adminMiddleware.js   # Admin role check
│   ├── errorHandler.js      # Error handling
│   └── requestLogger.js     # Request logging
├── routes/
│   ├── authRoutes.js        # Auth routes
│   ├── contentRoutes.js     # Content routes
│   └── adminRoutes.js       # Admin routes
├── server.js                # Express app & server entry point
├── seed.js                  # Database seeding script
├── package.json             # Dependencies
├── .env.example             # Environment variables template
└── .gitignore              # Git ignore file
```

## 📦 Installation

### Prerequisites
- Node.js v18 or higher
- MongoDB (local or cloud Atlas)
- npm or yarn

### Steps

1. **Navigate to backend directory**:
```bash
cd backend
```

2. **Install dependencies**:
```bash
npm install
```

3. **Create .env file**:
```bash
cp .env.example .env
```

## ⚙️ Configuration

Edit `.env` file with your settings:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database - Choose one:
# Option 1: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/kinetiq

# Option 2: MongoDB Atlas (Cloud)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kinetiq

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### Database Setup

#### Option 1: Local MongoDB
```bash
# Install MongoDB locally or use Docker
# macOS with Homebrew:
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Docker:
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

#### Option 2: MongoDB Atlas (Recommended for production)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

## 🚀 Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Expected Output
```
✓ MongoDB connected successfully
✓ Server running on http://localhost:5000
✓ Frontend URL: http://localhost:5173
✓ Environment: development
```

### Test Connection
```bash
curl http://localhost:5000/api/health
```

## 🌱 Database Seeding

Populate database with initial data:

```bash
node seed.js
```

This creates:
- ✅ Admin user (admin@kinetiq.com / admin123456)
- ✅ Regular user (user@example.com / password123)
- ✅ Hero section
- ✅ About section
- ✅ 4 services
- ✅ 3 testimonials
- ✅ 2 results
- ✅ Training program

**⚠️ WARNING**: Seeding will clear all existing data. Use only for initial setup.

## 🔐 Default Credentials

After seeding database:

**Admin User**:
- Email: `admin@kinetiq.com`
- Password: `admin123456`
- Role: `admin`

**Regular User**:
- Email: `user@example.com`
- Password: `password123`
- Role: `user`

### Change Credentials After First Setup
Use the `/api/auth/register` endpoint to create new admin account, then delete the default one.

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register         - Register new user
POST   /api/auth/login            - Login user
GET    /api/auth/me               - Get current user (requires token)
```

### Public Content (No authentication required)
```
GET    /api/content/hero          - Get hero section
GET    /api/content/about         - Get about section
GET    /api/content/services      - Get all services
GET    /api/content/testimonials  - Get all testimonials
GET    /api/content/results       - Get all results
GET    /api/content/program       - Get training program
```

### Admin Content (Requires authentication + admin role)
```
PUT    /api/admin/hero                - Update hero section
PUT    /api/admin/about               - Update about section
POST   /api/admin/services            - Create service
PUT    /api/admin/services/:id        - Update service
DELETE /api/admin/services/:id        - Delete service
POST   /api/admin/testimonials        - Create testimonial
PUT    /api/admin/testimonials/:id    - Update testimonial
DELETE /api/admin/testimonials/:id    - Delete testimonial
POST   /api/admin/results             - Create result
PUT    /api/admin/results/:id         - Update result
DELETE /api/admin/results/:id         - Delete result
PUT    /api/admin/program             - Update program
```

## 🔐 Authentication

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@kinetiq.com",
    "password": "admin123456"
  }'
```

### Using Token for Protected Routes
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🛡️ Security Notes

1. **Change JWT_SECRET** in production - Use a strong random string
2. **Change MONGODB_URI** - Use MongoDB Atlas for production
3. **Use HTTPS** in production
4. **Never commit .env file** - It's in .gitignore
5. **Use environment variables** for sensitive data
6. **Rotate admin credentials** after initial setup
7. **Enable MongoDB authentication** in production

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Start MongoDB or check connection string in .env

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**: Update `FRONTEND_URL` in .env to match your frontend URL

### Token Invalid Error
```
"message": "Unauthorized access"
```
**Solution**: Ensure token is sent in Authorization header: `Bearer TOKEN`

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Change PORT in .env or kill process using port 5000

## 📚 Next Steps

1. ✅ Backend API is ready
2. → Connect frontend to backend endpoints
3. → Implement image upload functionality
4. → Add payment integration
5. → Deploy to production

## 📞 Support

For issues or questions, refer to the main project README.md

---

**Last Updated**: April 2026  
**Backend Status**: ✅ Production Ready
