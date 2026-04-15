import express from "express";
import {
    getHero, updateHero,
    getAbout, updateAbout,
    getServices, createService, updateService, deleteService,
    getProgram, updateProgram,
    getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial,
    getResults, createResult, updateResult, deleteResult
} from "../controllers/contentController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Public routes (no auth required)
router.get("/hero", getHero);
router.get("/about", getAbout);
router.get("/services", getServices);
router.get("/program", getProgram);
router.get("/testimonials", getTestimonials);
router.get("/results", getResults);

// Admin routes (auth + admin role required)
router.put("/hero", authenticateToken, requireAdmin, updateHero);
router.put("/about", authenticateToken, requireAdmin, updateAbout);
router.post("/services", authenticateToken, requireAdmin, createService);
router.put("/services/:id", authenticateToken, requireAdmin, updateService);
router.delete("/services/:id", authenticateToken, requireAdmin, deleteService);
router.put("/program", authenticateToken, requireAdmin, updateProgram);
router.post("/testimonials", authenticateToken, requireAdmin, createTestimonial);
router.put("/testimonials/:id", authenticateToken, requireAdmin, updateTestimonial);
router.delete("/testimonials/:id", authenticateToken, requireAdmin, deleteTestimonial);
router.post("/results", authenticateToken, requireAdmin, createResult);
router.put("/results/:id", authenticateToken, requireAdmin, updateResult);
router.delete("/results/:id", authenticateToken, requireAdmin, deleteResult);

export default router;