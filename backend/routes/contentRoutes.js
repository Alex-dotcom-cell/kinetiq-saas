import express from 'express';
import {
  getHero,
  getAbout,
  getServices,
  getTestimonials,
  getResults,
  getProgram,
} from '../controllers/contentController.js';

const router = express.Router();

// GET /api/content/hero
router.get('/hero', getHero);

// GET /api/content/about
router.get('/about', getAbout);

// GET /api/content/services
router.get('/services', getServices);

// GET /api/content/testimonials
router.get('/testimonials', getTestimonials);

// GET /api/content/results
router.get('/results', getResults);

// GET /api/content/program
router.get('/program', getProgram);

export default router;
