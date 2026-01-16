import Todo from "../models/Todo.js";

// @desc   Get all todos for logged-in user
// @route  GET /api/v1/todos
// @access Private
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    console.error("Error in getTodos:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc   Get single todo
// @route  GET /api/v1/todos/:id
// @access Private
export const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    // Check if todo belongs to user
    if (todo.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access this todo",
      });
    }

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    console.error("Error in getTodo:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc   Create new todo
// @route  POST /api/v1/todos
// @access Private
export const createTodo = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    // Create todo with userId from authenticated user
    const todo = await Todo.create({
      title,
      description,
      priority,
      dueDate,
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    console.error("Error in createTodo:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc   Update todo
// @route  PUT /api/v1/todos/:id
// @access Private
export const updateTodo = async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    // Check if todo belongs to user
    if (todo.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this todo",
      });
    }

    // Update todo
    todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    console.error("Error in updateTodo:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc   Delete todo
// @route  DELETE /api/v1/todos/:id
// @access Private
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    // Check if todo belongs to user
    if (todo.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete  this todo",
      });
    }

    // Delete todo
    await todo.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.error("Error in deleteTodo:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
