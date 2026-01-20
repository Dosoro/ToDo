import express from "express";
import {
  getMe,
  login,
  register,
  refresh,
} from "../../controllers/authController.js";
import { protect } from "../../middleware/auth.js";
import {
  registerValidation,
  loginValidation,
} from "../../middleware/validators.js";
import { validate } from "../../middleware/validate.js";

// ========================================
// AUTH ROUTES
// ========================================
const router = express.Router();

// POST /api/v1/auth/register
router.post("/register", registerValidation, validate, register);

// POST /api/v1/auth/login
router.post("/login", loginValidation, validate, login);

// POST /api/v1/auth/refresh
router.post("/refresh", refresh);

// GET /api/v1/auth/me (Protected route)
router.get("/me", protect, getMe);

export default router;
