import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import DashboardContent from "../components/dashboardContent.jsx";

const AdminDashboard = () => {
  return (
    <Router>
      <div className="flex flex-1">
        <Sidebar />
        <div className="min-h-screen flex flex-col bg-gray-100">
          <Navbar />
          <div className="flex-1 flex items-center justify-center">
            <Routes>
              <Route path="/" element={<DashboardContent />} />
              <Route path="/branches" element={<DashboardContent />} />
              <Route path="/subjects" element={<DashboardContent />} />
              {/* Define rutas para otras opciones de tu menú */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default AdminDashboard;
