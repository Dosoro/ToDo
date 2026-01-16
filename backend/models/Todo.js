import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
      maxlength: [200, "Title cannot be more than 200 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot be more than 1000 characters"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dueDate: {
      type: Date,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries (find todos by user)
todoSchema.index({ userId: 1 });

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
