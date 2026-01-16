import express from "express";
import { getMe, login, register } from "../../controllers/authController.js";
import { protect } from "../../middleware/auth.js";

const router = express.Router();

// POST /api/v1/auth/register
router.post("/register", register);

// POST /api/v1/auth/login
router.post("/login", login);

// GET /api/v1/auth/me (Protected route)
router.get("/me", protect, getMe);

export default router;
