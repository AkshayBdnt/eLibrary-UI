import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Register from "./components/Register/Register";
import LibrarianDashboard from "./pages/LibrarianDashboard/LibrarianDashboard";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <>
      <Router>
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/:display?" element={<Home />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/lib-dashboard" element={<LibrarianDashboard />} />
          <Route path="/sidebar" element={<Sidebar />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;