import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Register from "./components/Register/Register";
import LibrarianDashboard from "./pages/LibrarianDashboard/LibrarianDashboard";
import Listing from "./pages/Listing/Listing";
import Setting from "./pages/Setting/Setting";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import AuthGuard from "./components/AuthGuard/AuthGuard";
import BookEntry from "./pages/BookEntry/BookEntry";

function App() {
  return (
    <>
      <Router>
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/register"
            element={
              <AuthGuard>
                <Register />
              </AuthGuard>
            }
          />
          <Route
            path="/add-books"
            element={
              <AuthGuard>
                <BookEntry />
              </AuthGuard>
            }
          />
          <Route
            element={
              <AuthGuard>
                <Layout />
              </AuthGuard>
            }
          >
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/lib-dashboard" element={<LibrarianDashboard />} />
            <Route path="/listing" element={<Listing />} />
            <Route path="/setting" element={<Setting />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
