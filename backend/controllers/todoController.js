import Todo from "../models/Todo.js";

// ========================================
// GET ALL TODOS (with filters, pagination, sorting)
// ========================================
// @desc   Get all todos for logged-in user
// @route  GET /api/v1/todos
// @access Private
export const getTodos = async (req, res) => {
  try {
    // Build base query - always filter by user
    const query = { userId: req.user._id };

    // ========== FILTERS ==========
    // Add completed filter if provided
    if (req.query.completed !== undefined) {
      query.completed = req.query.completed === "true";
    }

    // 3. Add search filter if provided
    if (req.query.search) {
      query.title = { $regex: req.query.search, $options: "i" };
    }

    // 4. Add priority filter if provided
    if (req.query.priority) {
      query.priority = req.query.priority;
    }

    // ========== PAGINATION & SORTING ==========
    const allowedSortFields = ["createdAt", "title", "priority", "dueDate"];
    // ...filters...
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    let sortBy = req.query.sortBy || "createdAt";
    const order = req.query.order || "desc";

    // Validation
    if (page < 1 || limit < 1 || limit > 100) {
      return res.status(400).json({
        error: "Invalid pagination parameters",
      });
    }

    if (!allowedSortFields.includes(sortBy)) {
      sortBy = "createdAt";
    }

    const skip = (page - 1) * limit;
    const total = await Todo.countDocuments(query);

    // Fetch paginated, sorted, filtered todos
    const todo = await Todo.find(query)
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      count: todo.length,
      total: total,
      page: page,
      pages: totalPages,
      data: todo,
    });

    // Eo Pagionation
  } catch (error) {
    console.error("Error in getTodos:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ========================================
// GET SINGLE TODO
// ========================================
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

// ========================================
// CREATE TODO
// ========================================
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

// ========================================
// UPDATE TODO
// ========================================
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

// ========================================
// DELETE TODO
// ========================================
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
