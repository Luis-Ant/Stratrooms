import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/StudentSidebar.jsx";
import DashboardContent from "../components/dashboardContent.jsx";
import LogoutPage from "../pages/Logout.jsx";
import GroupDetail from "../components/groupDetail.jsx";


const AlumnoDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <Routes>
            <Route path="/" element={<DashboardContent />} />
            <Route path="/branches" element={<DashboardContent />} />
            <Route path="/subjects" element={<DashboardContent />} />
            <Route path="/admins" element={<DashboardContent />} />
            <Route path="/teachers" element={<DashboardContent />} />
            <Route path="/students" element={<DashboardContent />} />
            <Route path="/groups" element={<DashboardContent />} />
            <Route path="/groups/:groupId" element={<GroupDetail />} />
            <Route path="/logout" element={<LogoutPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AlumnoDashboard;

