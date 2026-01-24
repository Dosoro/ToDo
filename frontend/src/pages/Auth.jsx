import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

function Auth() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg p-8 shadow-md w-96">
        <div className="flex mb-6 border-b">
          <button
            className={`flex-1 py-2 text-center transition ${
              activeTab === "login"
                ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 text-center transition ${
              activeTab === "register"
                ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>
        {activeTab === "login" ? <Login /> : <Register />}
      </div>
    </div>
  );
}

export default Auth;
