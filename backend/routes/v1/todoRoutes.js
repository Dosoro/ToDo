import express from "express";
import {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../../controllers/todoController.js";
import { protect } from "../../middleware/auth.js";
import {
  createTodoValidation,
  updateTodoValidation,
} from "../../middleware/validators.js";
import { validate } from "../../middleware/validate.js";

// ========================================
// TODO ROUTES (All Protected)
// ========================================
const router = express.Router();

// All routes  are protected (require authentication)
router.use(protect);

// GET /api/v1/todos - Get all todos
// POST /api/v1/todos - Create todo
router
  .route("/")
  .get(getTodos)
  .post(createTodoValidation, validate, createTodo);

// GET /api/v1/todos/:id - Get single todo
// PUT /api/v1/todos/:id - Update todo
// DELETE /api/v1/todos/:id - Delete todo
router
  .route("/:id")
  .get(getTodo)
  .put(updateTodoValidation, validate, updateTodo)
  .delete(deleteTodo);

export default router;
