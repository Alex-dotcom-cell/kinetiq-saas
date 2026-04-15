import express from "express";
import { register, login, getMe } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * =========================
 * REGISTER USER
 * =========================
 */
router.post("/register", register);

/**
 * =========================
 * LOGIN USER
 * =========================
 */
router.post("/login", login);

/**
 * =========================
 * GET CURRENT USER
 * =========================
 */
router.get("/me", authenticateToken, getMe);

export default router;