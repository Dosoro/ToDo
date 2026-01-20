import express from "express";
import authRoutes from "./authRoutes.js";
import todoRoutes from "./todoRoutes.js";

// ========================================
// API V1 ROUTES
// ========================================
const router = express.Router();

// Mount auth routes at /auth
router.use("/auth", authRoutes);

// Mount todo routes at /todos
router.use("/todos", todoRoutes);

// Future routes will go here
// route.use('/todos', todoRoutes);
// route.use('/users', userRoutes);

export default router;
