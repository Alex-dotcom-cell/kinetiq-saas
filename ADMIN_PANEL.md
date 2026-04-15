# Kinetiq Admin Panel Documentation

Complete Content Management System (CMS) for the Kinetiq Personal Trainer SaaS platform.

## 📋 Table of Contents

- [Overview](#overview)
- [Access Admin Panel](#access-admin-panel)
- [Login Credentials](#login-credentials)
- [Features](#features)
- [Navigation](#navigation)
- [Managing Content](#managing-content)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

The Admin Panel is a comprehensive content management system (CMS) built with React, allowing admins to manage all website content without touching code.

### Key Features
- ✅ Secure JWT-based authentication
- ✅ Role-based access control (admin-only)
- ✅ Real-time content updates
- ✅ Intuitive dashboard
- ✅ Dark theme UI
- ✅ Responsive design
- ✅ Protected routes
- ✅ Error handling & notifications

---

## 🔐 Access Admin Panel

### URL
```
http://localhost:5173/admin/login
```

### Requirements
1. ✅ Backend server running on `http://localhost:5000`
2. ✅ Frontend server running on `http://localhost:5173`
3. ✅ MongoDB database connected to backend
4. ✅ Valid admin credentials

---

## 👤 Login Credentials

After running database seed script:

### Default Admin Account
```
Email:    admin@kinetiq.com
Password: admin123456
```

### First Time Setup
1. Go to `http://localhost:5173/admin/login`
2. Enter credentials above
3. Click "Login"
4. You'll be redirected to the dashboard

⚠️ **IMPORTANT**: Change these credentials in production!

---

## ✨ Features

### Authentication
- ✅ Email/password login
- ✅ JWT token management
- ✅ Session persistence (localStorage)
- ✅ Automatic logout on token expiry
- ✅ Protected routes with auto-redirect

### Content Management
- ✅ **Hero Section**: Edit title, subtitle, image
- ✅ **About Section**: Edit text and image
- ✅ **Services**: CRUD operations with pricing
- ✅ **Testimonials**: Manage client testimonials with ratings
- ✅ **Results**: Showcase before/after transformations
- ✅ **Weight Loss Program**: Edit program details

### User Experience
- ✅ Dashboard with statistics
- ✅ Quick links to content sections
- ✅ Form validations
- ✅ Success/error notifications
- ✅ Confirmation dialogs for deletions
- ✅ Loading states
- ✅ Responsive layout

---

## 🗺️ Navigation

### Admin Panel Structure
```
/admin/login              Login page
/admin/dashboard          Dashboard with overview
/admin/hero              Edit hero section
/admin/about             Edit about section
/admin/services          Manage services (CRUD)
/admin/testimonials      Manage testimonials (CRUD)
/admin/results           Manage results (CRUD)
/admin/program           Edit weight loss program
```

### Sidebar Menu
The admin panel has a persistent sidebar with quick access to all sections:
- Dashboard
- Hero Section
- About Section
- Services
- Testimonials
- Results
- Weight Loss Program

---

## 📝 Managing Content

### 1. Hero Section

**Location**: `/admin/hero`

**Fields**:
- Title (text)
- Subtitle (textarea)
- Image URL (text)

**Actions**:
- Edit hero content
- Reset to saved values
- Save changes with real-time validation

**API**: `PUT /api/admin/hero`

---

### 2. About Section

**Location**: `/admin/about`

**Fields**:
- About Text (textarea)
- Image URL (text)

**Actions**:
- Edit about content
- Reset to saved values
- Save changes

**API**: `PUT /api/admin/about`

---

### 3. Services

**Location**: `/admin/services`

**Fields**:
- Service Title (text, required)
- Description (textarea, required)
- Price (number, optional)

**Actions**:
- Create new service
- View all services in table
- Edit existing service
- Delete service
- Real-time list updates

**APIs**:
- `POST /api/admin/services` - Create
- `PUT /api/admin/services/:id` - Update
- `DELETE /api/admin/services/:id` - Delete
- `GET /api/content/services` - Fetch all

**Example Service**:
```json
{
  "title": "Personal Training",
  "description": "One-on-one personalized training sessions",
  "price": 75
}
```

---

### 4. Testimonials

**Location**: `/admin/testimonials`

**Fields**:
- Client Name (text, required)
- Testimonial Text (textarea, required)
- Rating (1-5 stars, default 5)

**Actions**:
- Create new testimonial
- View all testimonials as cards
- Edit testimonial
- Delete testimonial
- Star ratings display

**APIs**:
- `POST /api/admin/testimonials` - Create
- `PUT /api/admin/testimonials/:id` - Update
- `DELETE /api/admin/testimonials/:id` - Delete
- `GET /api/content/testimonials` - Fetch all

**Example Testimonial**:
```json
{
  "name": "Sarah Johnson",
  "text": "Transformed my body and mindset. The best investment in myself!",
  "rating": 5
}
```

---

### 5. Results

**Location**: `/admin/results`

**Fields**:
- Before Image URL (text)
- After Image URL (text)
- Description (textarea)

**Actions**:
- Create transformation result
- View results as cards with images
- Edit result details
- Delete result
- Image preview display

**APIs**:
- `POST /api/admin/results` - Create
- `PUT /api/admin/results/:id` - Update
- `DELETE /api/admin/results/:id` - Delete
- `GET /api/content/results` - Fetch all

**Example Result**:
```json
{
  "beforeImage": "https://example.com/before.jpg",
  "afterImage": "https://example.com/after.jpg",
  "description": "Lost 30 lbs in 3 months with consistent training"
}
```

---

### 6. Weight Loss Program

**Location**: `/admin/program`

**Fields**:
- Program Title (text)
- Program Description (textarea)

**Actions**:
- Edit program details
- Reset to saved values
- Save changes

**API**: `PUT /api/admin/program`

---

## 🎨 UI Components

### Layout
- **AdminLayout**: Main wrapper with header and sidebar
- **AdminHeader**: Top navigation with user info and logout
- **AdminSidebar**: Persistent navigation menu

### Forms
- Input fields with validation
- Textarea for longer content
- Number inputs for prices
- Select dropdowns for ratings
- Submit/Cancel buttons

### Tables
- Sortable/filterable tables for lists
- Action buttons (Edit, Delete)
- Hover effects
- Loading states

### Messages
- Success notifications (green)
- Error notifications (red)
- Auto-dismiss after 3 seconds
- Clear messaging

### Stats Cards
- Dashboard overview
- Count displays
- Hover effects

---

## 🔄 Workflow Example

### Adding a New Service

1. Navigate to `/admin/services`
2. Click **"+ Add Service"** button
3. Fill in the form:
   - Title: "Group Classes"
   - Description: "High-energy group fitness classes"
   - Price: 25
4. Click **"Create Service"**
5. See success notification
6. Service appears in the table immediately

### Editing a Service

1. Navigate to `/admin/services`
2. Find the service in the table
3. Click **"Edit"** button
4. Modify the fields
5. Click **"Update Service"**
6. Confirm success notification

### Deleting a Service

1. Navigate to `/admin/services`
2. Click **"Delete"** button
3. Confirm in dialog
4. Service removed from list

---

## 🛠️ Technical Details

### Technology Stack
- **React 19**: UI framework
- **React Router**: Navigation
- **Fetch API**: HTTP requests
- **LocalStorage**: Token persistence
- **Tailwind CSS**: Styling

### State Management
- **React Context**: Authentication state
- **LocalStorage**: JWT token
- **useState**: Component state
- **useEffect**: Data fetching

### Authentication Flow
1. Login with email/password
2. Backend returns JWT token
3. Token stored in localStorage
4. Token included in all requests via headers
5. Protected routes check token validity
6. Automatic redirect on unauthorized access

### API Integration
- Base URL: `http://localhost:5000/api`
- All admin requests: `/api/admin/*`
- All public content: `/api/content/*`
- Authentication: `/api/auth/*`

---

## 📊 Dashboard Statistics

The dashboard displays:
- **Total Services**: Number of services
- **Total Testimonials**: Number of testimonials
- **Total Results**: Number of transformation results

Quick links to all content sections for easy access.

---

## 🔒 Security Features

- ✅ JWT token-based authentication
- ✅ Role-based access control (admin-only)
- ✅ Protected routes with auto-redirect
- ✅ Token validation on page load
- ✅ Automatic logout functionality
- ✅ CORS enabled
- ✅ Password hashing on backend

---

## 🐛 Troubleshooting

### Can't Login
**Problem**: "Login failed" message
**Solutions**:
1. Ensure backend is running on `http://localhost:5000`
2. Check MongoDB connection
3. Verify database has been seeded
4. Check credentials (admin@kinetiq.com / admin123456)

### Backend Connection Error
**Problem**: "Network error" or no response
**Solutions**:
1. Start backend: `cd backend && npm run dev`
2. Verify port is 5000
3. Check API_BASE_URL in `/client/src/services/api.js`
4. Check CORS is enabled in backend

### Lost Session
**Problem**: Logged out unexpectedly
**Solutions**:
1. Check localStorage in browser DevTools
2. Verify JWT token hasn't expired (7 days default)
3. Login again
4. Check server logs for errors

### Form Not Submitting
**Problem**: Save button doesn't work
**Solutions**:
1. Check all required fields are filled
2. Check browser console for errors
3. Verify backend is running
4. Check network tab for failed requests

### Images Not Loading
**Problem**: Image URL shows placeholder
**Solutions**:
1. Verify image URL is valid
2. Check CORS on image hosting
3. Use public image URLs
4. Test URL in browser first

---

## 📱 Mobile Support

The admin panel is fully responsive:
- Desktop: Full sidebar navigation
- Tablet: Optimized layout
- Mobile: Touch-friendly buttons
- All features available on all devices

---

## 🚀 Best Practices

### Content Creation
- ✅ Use descriptive titles
- ✅ Keep descriptions clear and concise
- ✅ Use valid image URLs
- ✅ Test content on live site
- ✅ Keep backups of important content

### Image URLs
- ✅ Use HTTPS URLs
- ✅ Test URLs before saving
- ✅ Use images optimized for web
- ✅ Keep consistent image sizes
- ✅ Consider CDN for better performance

### Testimonials
- ✅ Get written permission
- ✅ Use real client names
- ✅ Keep quotes authentic
- ✅ Use accurate ratings
- ✅ Update regularly

### Services
- ✅ List all services
- ✅ Clear descriptions
- ✅ Accurate pricing
- ✅ Professional titles
- ✅ Consistent formatting

---

## 📞 Support

For technical issues:
1. Check this documentation
2. Review browser console errors
3. Check backend logs
4. Verify database connection
5. Ensure all services are running

---

## 🎓 Next Steps

1. ✅ Login to admin panel
2. ✅ Explore each section
3. ✅ Add sample content
4. ✅ Test frontend displays content
5. ✅ Change admin credentials
6. ✅ Set up production environment

---

**Last Updated**: April 2026  
**Admin Panel Status**: ✅ Production Ready
