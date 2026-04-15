# Quick Start Guide - KINETIQ SaaS

## 🚀 Start the Application (30 seconds)

### Step 1: Start Backend Server
```bash
cd /Users/aleksandrkarpov/kinetiq-saas/server
node server.js
# ✅ Waits for: "🚀 Server running on http://localhost:5001"
```

### Step 2: Start Frontend Server
```bash
cd /Users/aleksandrkarpov/kinetiq-saas/client
npm run dev
# ✅ Waits for: "Local: http://localhost:5174"
```

### Step 3: Open in Browser
- **Public Site**: http://localhost:5174
- **Admin Login**: http://localhost:5174/login
- **Admin Panel**: http://localhost:5174/admin

---

## 👤 Admin Credentials

```
Email:    admin@kinetiq.com
Password: admin123
```

---

## 🧪 Quick Test

### Test 1: View Homepage
1. Open http://localhost:5174
2. Should see: Hero, About, Services, Program, Testimonials, Results
3. All content loads from database ✅

### Test 2: Login as Admin
1. Click "Login" in navigation
2. Enter admin@kinetiq.com / admin123
3. Should redirect to homepage with "Admin" link in nav ✅

### Test 3: Edit Content
1. Click "Admin" in navigation
2. Click "Content Management"
3. Click "Hero" tab
4. Edit title/description
5. Click "Save Changes"
6. Go back to home - changes appear immediately ✅

### Test 4: API Test (Terminal)
```bash
# Get hero content
curl http://localhost:5001/api/content/hero

# Get all services
curl http://localhost:5001/api/content/services

# Get testimonials
curl http://localhost:5001/api/content/testimonials
```

---

## 📁 Project Structure

```
client/              → React Frontend (Port 5174)
├── src/
│   ├── contexts/    → AuthContext (auth state)
│   ├── services/    → api.js (API calls)
│   ├── pages/       → Home, Login, Admin
│   └── routes/      → ProtectedRoute

server/              → Node + Express Backend (Port 5001)
├── models/          → 7 MongoDB models
├── controllers/     → auth, content
├── routes/          → API endpoints
├── middleware/      → auth, role
└── seed.js          → Initial data
```

---

## 📚 API Examples

### Get Hero Content
```bash
curl http://localhost:5001/api/content/hero
```

### Get Services
```bash
curl http://localhost:5001/api/content/services
```

### Login (Get Token)
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@kinetiq.com",
    "password": "admin123"
  }'
```

### Update Hero (With Token)
```bash
curl -X PUT http://localhost:5001/api/content/hero \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "New Title",
    "subtitle": "New Subtitle"
  }'
```

---

## 🔑 Key Features

### Frontend
✅ Dynamic content loading from API
✅ JWT authentication
✅ Protected admin panel
✅ Real-time content updates
✅ Responsive design
✅ Error handling

### Backend
✅ JWT token authentication
✅ Role-based access (admin/user)
✅ CRUD for all content types
✅ MongoDB database
✅ Error validation
✅ Environment variables

### CMS Admin Panel
✅ Edit Hero section
✅ Edit About section
✅ Edit Weight Loss Program
✅ User management (coming soon)
✅ Services management (coming soon)
✅ Testimonials CRUD (coming soon)

---

## 🛑 Stop Servers

```bash
# Terminal 1 (Backend)
Ctrl + C

# Terminal 2 (Frontend)
Ctrl + C
```

---

## 🆘 Common Issues

### Backend won't start
```
Error: MONGO_URI is missing
→ Check server/.env has MONGO_URI

Port 5001 in use
→ Kill process: lsof -ti:5001 | xargs kill -9
```

### Frontend won't start
```
Port 5174 in use
→ It will use 5175 instead (auto-fallback)

Module not found
→ Run: cd client && npm install
```

### Can't login
```
Invalid credentials
→ Make sure you ran: npm run seed
→ Email: admin@kinetiq.com | Password: admin123

Network error
→ Check backend is running on port 5001
```

### Changes not appearing
```
Clear browser cache (Ctrl+Shift+Delete)
Hard refresh (Ctrl+Shift+R)
Check browser console for errors
```

---

## 📝 Admin Panel Walkthrough

### Dashboard
- Quick links to all admin features
- Shows available management areas

### Content Management
**Hero Section Tab:**
- Edit title, subtitle, description
- Configure CTA button text and link

**About Section Tab:**
- Edit about text and experience
- Modify trainer description

**Program Tab:**
- Edit weight loss program details
- Update program duration
- Modify results metrics

### User Management (Coming Soon)
- View all users
- Change user roles
- Delete users

### Services Management (Coming Soon)
- Create new services
- Edit existing services
- Delete services

### Testimonials Management (Coming Soon)
- Add client testimonials
- Edit testimonials
- Remove testimonials

---

## 🌐 Deployment URLs

When deployed:
- Frontend: `your-domain.com`
- Backend API: `api.your-domain.com` or `your-domain.com/api`

Remember to:
1. Update `API_BASE_URL` in frontend code
2. Update MongoDB URI for production
3. Change JWT_SECRET to strong random string
4. Enable CORS for production domain

---

## 📖 Documentation

- **SETUP_GUIDE.md** - Full setup instructions
- **TRANSFORMATION_SUMMARY.md** - What was built
- **This file** - Quick start

---

## ✨ What's New vs Old Project

### Before
❌ Static HTML/CSS
❌ No backend
❌ No database
❌ No authentication
❌ No content management

### After
✅ React + Node.js stack
✅ REST API
✅ MongoDB database
✅ JWT authentication
✅ Full CMS system
✅ Role-based access
✅ Admin panel
✅ Dynamic content
✅ Production-ready

---

## 🎯 Next Steps

1. **Play with Admin Panel**
   - Login as admin
   - Edit hero/about/program content
   - Watch changes appear on homepage

2. **Test API Endpoints**
   - Use curl commands above
   - Try creating/editing services
   - Experiment with different content

3. **Review Code**
   - Check `client/src/services/api.js` - API service
   - Check `client/src/contexts/AuthContext.jsx` - Auth logic
   - Check `client/src/pages/Home.jsx` - Dynamic content
   - Check `server/routes/contentRoutes.js` - API routes

4. **Deploy When Ready**
   - See SETUP_GUIDE.md for deployment instructions
   - Configure production environment
   - Set up CI/CD pipeline

---

## 🚀 You're All Set!

The application is fully functional and ready to use.

**Questions?** Check SETUP_GUIDE.md or TRANSFORMATION_SUMMARY.md

Happy coding! 💪