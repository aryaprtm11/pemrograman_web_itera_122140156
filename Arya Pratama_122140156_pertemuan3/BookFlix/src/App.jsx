import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import Navbar from "./components/Navbar/Navbar";

export default function App() {
  return (
    <Router>
      <div className="bg-[#141414] min-h-screen text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </div>
    </Router>
  );
}