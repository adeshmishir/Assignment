import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Dashboard from "./pages/Dashboard";
import Result from "./pages/Result";


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <Routes>
          <Route path="/" element={<Home />} />
         
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/result" element={<Result />} />

          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
