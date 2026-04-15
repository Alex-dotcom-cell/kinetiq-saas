# KINETIQ SaaS - Personal Trainer Platform

## Project Overview

This is a full-stack SaaS application for a personal trainer portfolio with:
- **Frontend**: React + Vite (http://localhost:5174)
- **Backend**: Node.js + Express (http://localhost:5001)
- **Database**: MongoDB Atlas
- **Authentication**: JWT-based with role-based access control
- **Admin Panel**: CMS-style content management system

## Project Structure

```
kinetiq-saas/
├── client/                           # Frontend (React)
│   ├── public/
│   ├── src/
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx      # Auth state management
│   │   ├── services/
│   │   │   └── api.js               # API service layer
│   │   ├── routes/
│   │   │   └── ProtectedRoute.jsx   # Protected route component
│   │   ├── pages/
│   │   │   ├── Home.jsx             # Main portfolio page (dynamic)
│   │   │   ├── Login.jsx            # Login page
│   │   │   ├── Register.jsx         # Register page
│   │   │   └── Admin.jsx            # Admin panel
│   │   ├── components/
│   │   ├── App.jsx                  # Main app router
│   │   └── main.jsx                 # App entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                           # Backend (Node.js + Express)
│   ├── config/
│   │   └── database.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js        # Auth logic
│   │   └── contentController.js     # Content CRUD logic
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT authentication
│   │   └── roleMiddleware.js        # Role-based access control
│   ├── models/
│   │   ├── User.js
│   │   ├── Hero.js
│   │   ├── About.js
│   │   ├── Service.js
│   │   ├── Program.js
│   │   ├── Testimonial.js
│   │   └── Result.js
│   ├── routes/
│   │   ├── authRoutes.js            # /api/auth/*
│   │   ├── contentRoutes.js         # /api/content/*
│   │   └── adminRoutes.js           # /api/admin/*
│   ├── server.js                    # Main server file
│   ├── seed.js                      # Database seeding script
│   ├── package.json
│   └── .env                         # Environment variables
│
└── README.md                         # This file
```

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- npm or yarn package manager
- Git

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd kinetiq-saas

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Configure Environment Variables

**Server (.env)**
```
PORT=5001
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname
JWT_SECRET=your-super-secret-key-change-in-production
```

**Frontend (.env or vite.config.js)**
- The API base URL is already configured in `src/services/api.js`
- Default: `http://localhost:5001/api`

### 3. Seed the Database

This populates the database with initial content and creates an admin user:

```bash
cd server
npm run seed
```

**Admin Credentials (after seeding):**
- Email: `admin@kinetiq.com`
- Password: `admin123`

### 4. Start the Application

**Terminal 1 - Start Backend Server:**
```bash
cd server
node server.js
# Server will run on http://localhost:5001
```

**Terminal 2 - Start Frontend Dev Server:**
```bash
cd client
npm run dev
# App will run on http://localhost:5174 (or next available port)
```

## API Documentation

### Authentication Endpoints

```
POST /api/auth/register
- Email, password, name (optional)
- Returns: user object, JWT token

POST /api/auth/login
- Email, password
- Returns: user object, JWT token

GET /api/auth/me
- Requires: Authorization header with JWT token
- Returns: current user object
```

### Content Endpoints (Public)

```
GET /api/content/hero         # Get hero section content
GET /api/content/about        # Get about section content
GET /api/content/services     # Get all services
GET /api/content/program      # Get weight loss program
GET /api/content/testimonials # Get all testimonials
GET /api/content/results      # Get all results (before/after)
```

### Admin Content Endpoints (Protected - Admin Only)

```
PUT /api/content/hero         # Update hero section
PUT /api/content/about        # Update about section
POST /api/content/services    # Create service
PUT /api/content/services/:id # Update service
DELETE /api/content/services/:id # Delete service
PUT /api/content/program      # Update program
POST /api/content/testimonials    # Create testimonial
PUT /api/content/testimonials/:id # Update testimonial
DELETE /api/content/testimonials/:id # Delete testimonial
POST /api/content/results     # Create result
PUT /api/content/results/:id  # Update result
DELETE /api/content/results/:id # Delete result
```

### Admin User Management (Protected - Admin Only)

```
GET /api/admin/users          # Get all users
PUT /api/admin/users/:id      # Update user (role, name)
DELETE /api/admin/users/:id   # Delete user
```

## Authentication & Authorization

### JWT Token
- Tokens are stored in `localStorage` under key `token`
- Sent in Authorization header: `Bearer <token>`
- Expires after 7 days

### Roles
- **user**: Regular user/client
- **admin**: Admin with full access to CMS and user management

### Protected Routes (Frontend)
```javascript
// Usage:
<ProtectedRoute adminOnly={false}>
  <YourComponent />
</ProtectedRoute>

// For admin-only routes:
<ProtectedRoute adminOnly={true}>
  <AdminComponent />
</ProtectedRoute>
```

## Admin Panel Features

### Dashboard
Located at: `http://localhost:5174/admin`

**Available Sections:**
1. **Content Management**
   - Edit Hero Section
   - Edit About Section
   - Edit Weight Loss Program

2. **User Management** (Coming Soon)
   - View all users
   - Change user roles
   - Delete users

3. **Services** (Coming Soon)
   - Create/Edit/Delete services

4. **Testimonials** (Coming Soon)
   - Create/Edit/Delete testimonials

## Frontend Integration

### Using the API Service

```javascript
import api from '../services/api';

// Login
const response = await api.login({ email, password });
// Token is automatically stored in localStorage

// Get content
const hero = await api.getHero();
const services = await api.getServices();

// Admin: Update content
await api.updateHero({ title, subtitle, description });
await api.createService({ title, description, icon, ... });
```

### Auth Context Usage

```javascript
import { useAuth } from '../contexts/AuthContext';

export function MyComponent() {
  const { user, login, logout, isAdmin } = useAuth();

  if (!user) return <div>Not logged in</div>;
  if (isAdmin()) return <div>Admin Dashboard</div>;
  return <div>Regular user page</div>;
}
```

## Database Models

### User
```javascript
{
  email: string (unique),
  password: string (hashed),
  name: string,
  role: 'user' | 'admin',
  createdAt: date
}
```

### Hero
```javascript
{
  title: string,
  subtitle: string,
  description: string,
  imageUrl: string,
  ctaText: string,
  ctaLink: string,
  updatedAt: date
}
```

### About
```javascript
{
  title: string,
  description: string,
  experience: string,
  imageUrl: string,
  stats: [{ label, value }],
  certifications: [string],
  updatedAt: date
}
```

### Service
```javascript
{
  title: string,
  description: string,
  icon: string,
  features: [string],
  price: string,
  popular: boolean,
  order: number,
  updatedAt: date
}
```

### Program
```javascript
{
  title: string,
  description: string,
  duration: string,
  features: [{ title, description, icon }],
  results: [{ label, value }],
  updatedAt: date
}
```

### Testimonial
```javascript
{
  name: string,
  content: string,
  achievement: string,
  rating: number (1-5),
  imageUrl: string,
  order: number,
  updatedAt: date
}
```

### Result
```javascript
{
  title: string,
  description: string,
  beforeImage: string,
  afterImage: string,
  transformation: string,
  order: number,
  updatedAt: date
}
```

## Development Workflow

### Making Changes to Backend

1. Edit files in `/server`
2. If you added new routes, import them in `server.js`
3. If you added new models, create them in `/server/models`
4. Restart the server (if not using nodemon)

### Making Changes to Frontend

1. Edit files in `/client/src`
2. Vite will hot-reload automatically
3. Check browser console for errors

### Seeding Database Again

If you need to reset and reseed the database:

```bash
cd server
npm run seed
```

This will:
- Clear all collections
- Recreate default content
- Create admin user (admin@kinetiq.com / admin123)

## Deployment

### Backend Deployment (Heroku, Railway, etc.)

1. Ensure `.env` variables are set in the hosting platform
2. Push code to your repository
3. Deploy using platform's CLI or GitHub integration
4. Verify MongoDB URI is accessible from hosting platform

### Frontend Deployment (Vercel, Netlify, etc.)

1. Update `API_BASE_URL` in `src/services/api.js` to production backend URL
2. Build the project: `npm run build`
3. Deploy the `dist` folder to your hosting service

## Troubleshooting

### Backend won't start
```
Error: MONGO_URI is missing in .env file
→ Add MONGO_URI to server/.env

SyntaxError in routes
→ Check for duplicate code or missing imports
```

### Frontend can't connect to backend
```
CORS error
→ Ensure backend CORS is configured for frontend URL
→ Check that API_BASE_URL is correct in api.js

Network error
→ Ensure backend server is running on port 5001
```

### Login not working
```
Invalid token
→ Check JWT_SECRET matches between login and request
→ Verify token is being stored in localStorage

User not found
→ Ensure database is seeded or user exists
→ Check email spelling
```

## Next Steps & Future Enhancements

### Currently Implemented
✅ User authentication with JWT
✅ Role-based access control
✅ Content management (Hero, About, Services, Program, Testimonials, Results)
✅ Admin panel with content editors
✅ Dynamic homepage loading content from API
✅ Protected routes for admin

### Recommended Enhancements
- [ ] Image upload functionality
- [ ] Email notifications for contact form
- [ ] Payment integration (Stripe/PayPal)
- [ ] Client dashboard for booking/progress tracking
- [ ] Email verification for registration
- [ ] Password reset functionality
- [ ] Advanced analytics and reporting
- [ ] API rate limiting
- [ ] Unit and integration tests
- [ ] API documentation with Swagger
- [ ] Database backups and recovery
- [ ] CDN integration for images

## Support & Questions

For issues or questions:
1. Check the troubleshooting section above
2. Review API documentation
3. Check browser console and server logs
4. Verify all environment variables are set correctly

---

**Happy coding! 🚀**