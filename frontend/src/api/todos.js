import api from "./axios.js";

// Get Todos
export const getTodos = async () => {
  const response = await api.get("/todos");
  return response.data;
};

// Create Todos
export const createTodo = async (todoData) => {
  const response = await api.post("/todos", todoData);
  return response.data;
};

// Update Todos
export const updateTodo = async (id, todoData) => {
  const response = await api.put(`/todos/${id}`, todoData);
  return response.data;
};

// Delete Todos
export const deleteTodo = async (id) => {
  const response = await api.delete(`/todos/${id}`);
  return response.data;
};
