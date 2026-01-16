import { verifyAccessToken } from "../utils/jwt.js";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    // Check  if Authorization header exists and starts  with 'Bearer'
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Extract token from "Bearer <token>"
      token = req.headers.authorization.split(" ")[1];
    }

    // If no token found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this route",
      });
    }

    // Verify token
    const decoded = verifyAccessToken(token);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // Attach user to request (without password)
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    next(); // User is authenticated, proceed to next middleware/controller
  } catch (error) {
    console.error("Error in auth middleware:", error);
    res.status(401).json({
      success: false,
      message: "Not authorized to access  this route",
    });
  }
};
