import express from "express";
import authRoutes from "./authRoutes.js";

const router = express.Router();

// Mount auth routes at /auth
router.use("/auth", authRoutes);

// Future routes will go here
// route.use('/todos', todoRoutes);
// route.use('/users', userRoutes);

export default router;
