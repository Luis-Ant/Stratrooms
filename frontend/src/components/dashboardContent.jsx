import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import WelcomeContent from "../components/welcomeContent.jsx";
import BranchesContent from "../components/branchesContent.jsx";
import SubjectsContent from "../components/subjectsContent.jsx";
import AdminsContent from "../components/adminsContent.jsx";
import TeachersContent from "../components/teachersContent.jsx";
import StudentsContent from "../components/studentContent.jsx";
import GroupsContent from "../components/groupsContent.jsx";
import GroupDetail from "../components/groupDetail.jsx";

function DashboardContent() {
  const location = useLocation();
  const [content, setContent] = useState(null);
  useEffect(() => {
    switch (location.pathname) {
      case "/branches":
        setContent(<BranchesContent />);
        break;
      case "/subjects":
        setContent(<SubjectsContent />);
        break;
      case "/admins":
        setContent(<AdminsContent />);
        break;
      case "/teachers":
        setContent(<TeachersContent />);
        break;
      case "/students":
        setContent(<StudentsContent />);
        break;
      case "/groups":
        setContent(<GroupsContent />);
        break;
      case location.pathname.startsWith("/groups/") &&
        location.pathname !== "/groups":
        setContent(<GroupDetail />);
        break;
      default:
        setContent(<WelcomeContent />);
        break;
    }
  }, [location.pathname]);

  return <div>{content}</div>;
}

export default DashboardContent;
