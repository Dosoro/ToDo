import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth.jsx";
import { useAuth } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<h1>Home Page (coming soon)</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
