import api from "./axios.js";

// Register user
export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// Login user
export const login = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};

// Get current user
export const getCurrentUser = async () => {
  const response = await api.get("auth/me");
  return response.data;
};

// Logout user
export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
