import jwt from "jsonwebtoken";
import env from "../config/env.js";

// Generate access token (short-lived)
export const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, env.jwt.secret, {
    expiresIn: env.jwt.expire,
  });
};

// Generate refresh token (long-lived)
export const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, env.jwt.refreshSecret, {
    expiresIn: env.jwt.refreshExpire,
  });
};

// Verify access token
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, env.jwt.secret);
  } catch (error) {
    return null;
  }
};

// Verify refresh token
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, env.jwt.refreshSecret);
  } catch (error) {
    return null;
  }
};
