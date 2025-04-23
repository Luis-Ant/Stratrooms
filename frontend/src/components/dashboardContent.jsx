import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BranchesContent from "../components/branchesContent.jsx";
import SubjectsContent from "../components/SubjectsContent.jsx";

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
      default:
        setContent(<div>Bienvenido al Dashboard</div>);
        break;
    }
  }, [location.pathname]);

  return <div>{content}</div>;
}

export default DashboardContent;
