import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import TodoForm from "../components/TodoForm";
import * as todoAPI from "../api/todos";

function Home() {
  const { user, logout } = useAuth();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  // Fetch todos when component mounts
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await todoAPI.getTodos();
      setTodos(response.data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  const handleTodoCreated = () => {
    fetchTodos();
  };

  const handleToggle = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id);
      await todoAPI.updateTodo(id, { completed: !todo.completed });
      fetchTodos();
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await todoAPI.deleteTodo(id);
      fetchTodos();
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  }; // ← Close handleDelete here

  // Filter todos (OUTSIDE handleDelete)
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // Add this for 'all'
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-3xl">Welcome, {user?.name}!</h1>
          <p className="text-gray-600 mb-4">Email: {user?.email}</p>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        <TodoForm onTodoCreated={handleTodoCreated} />
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Your Todos</h2>
          {loading ? (
            <p>Loading...</p>
          ) : todos.length === 0 ? (
            <p className="text-gray-600">No todos yet. Create one above!</p>
          ) : (
            <div className="space-y-2">
              {/* Filter buttons */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-white"}`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("completed")}
                  className={`px-4 py-2 rounded ${filter === "completed" ? "bg-blue-500 text-white" : "bg-white"}`}
                >
                  Completed
                </button>
                <button
                  onClick={() => setFilter("active")}
                  className={`px-4 py-2 rounded ${filter === "active" ? "bg-blue-500 text-white" : "bg-white"}`}
                >
                  Active
                </button>
              </div>
              {filteredTodos.map((todo) => (
                <div
                  key={todo._id}
                  className="bg-white p-4 rounded-lg shadow flex items-center gap-4"
                >
                  {/* Checkbox to toggle complete */}
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggle(todo._id)}
                    className="w-5 h-5"
                  />

                  {/* Todo text */}
                  <div className="flex-1">
                    <h3
                      className={`font-semibold ${todo.completed ? "line-through text-gray-400" : ""}`}
                    >
                      {todo.title}
                    </h3>
                    {todo.description && (
                      <p className="text-gray-600 text-sm">
                        {todo.description}
                      </p>
                    )}
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => handleDelete(todo._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
