import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";

function Home() {
  const [apiKey, setApiKey] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!apiKey.trim()) return;
    localStorage.setItem("apifyApiKey", apiKey.trim());
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-200 via-white to-purple-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">🔐 Apify Dashboard</h1>
        <input
          type="text"
          placeholder="Enter your Apify API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 flex items-center justify-center gap-2"
        >
          <LogIn size={18} />
          Login
        </button>
      </div>
    </div>
  );
}

export default Home;
