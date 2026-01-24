import { useState } from "react";
import { createTodo } from "../api/todos";

function TodoForm({ onTodoCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // TODO: Call createTodo API
    try {
      await createTodo({ title, description });
      onTodoCreated();
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || "Todo creation failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input for title */}
      <div className="bg-white rounded-lg flex flex-col gap-2 items-center justify-center p-4">
        <h2 className="text-2xl font-bold">Add Todo</h2>
        <input
          type="text"
          id="title"
          placeholder="Title"
          className="bg-white text-black border-black rounded-lg ring-1 p-2 w-xl"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* Input for description */}
        <textarea
          id="description"
          placeholder="Description"
          className="bg-white text-black border-black rounded-lg ring-1 p-2 w-xl"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Show error message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-500 w-xl rounded-lg p-4 text-white"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
