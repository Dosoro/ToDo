import { useAuth } from "../context/AuthContext";

function Home() {
  const { user, logout } = useAuth();

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
        <h2 className="text-2xl font-bold mb-4">Your Todos</h2>
        <p className="text-gray-600">Todo list coming soon...</p>
      </div>
    </div>
  );
}

export default Home;
