import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import {
  updateHero,
  updateAbout,
  createService,
  updateService,
  deleteService,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  createResult,
  updateResult,
  deleteResult,
  updateProgram,
} from '../controllers/adminController.js';

const router = express.Router();

// Apply auth middleware to all admin routes
router.use(authMiddleware, adminMiddleware);

// ============= HERO SECTION =============
// PUT /api/admin/hero
router.put('/hero', updateHero);

// ============= ABOUT SECTION =============
// PUT /api/admin/about
router.put('/about', updateAbout);

// ============= SERVICES =============
// POST /api/admin/services
router.post('/services', createService);

// PUT /api/admin/services/:id
router.put('/services/:id', updateService);

// DELETE /api/admin/services/:id
router.delete('/services/:id', deleteService);

// ============= TESTIMONIALS =============
// POST /api/admin/testimonials
router.post('/testimonials', createTestimonial);

// PUT /api/admin/testimonials/:id
router.put('/testimonials/:id', updateTestimonial);

// DELETE /api/admin/testimonials/:id
router.delete('/testimonials/:id', deleteTestimonial);

// ============= RESULTS =============
// POST /api/admin/results
router.post('/results', createResult);

// PUT /api/admin/results/:id
router.put('/results/:id', updateResult);

// DELETE /api/admin/results/:id
router.delete('/results/:id', deleteResult);

// ============= PROGRAM =============
// PUT /api/admin/program
router.put('/program', updateProgram);

export default router;
