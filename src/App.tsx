import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import ProjectDetail from "@/pages/ProjectDetail";
import Practice from "@/pages/Practice";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/practice/:id" element={<Practice />} />
      </Routes>
    </Router>
  );
}
