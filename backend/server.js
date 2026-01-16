import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import env from "./config/env.js";
import connectDB from "./config/database.js";
import v1Routes from "./routes/v1/index.js";

const app = express();

// Security middleware
app.use(helmet());

// CORS - allow frontend to make requests
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);

// Logging middleware (only in development)
if (env.env === "development") {
  app.use(morgan("dev"));
}

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/v1", v1Routes);

// Test route
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running!",
    timestamp: new Date(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Connect to database and start server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port} in ${env.env} mode`);
      console.log(`Health check: http://localhost:${env.port}/api/v1/health`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
