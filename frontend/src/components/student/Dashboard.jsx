import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Welcome from "../home/Welcome.jsx";
import Groups from "./StudentGroups.jsx";
import GroupDetail from "./StudentGroupDetail.jsx";
import Calendar from "../home/Calendar.jsx";

function Dashboard() {
  const location = useLocation();
  const [content, setContent] = useState(null);

  useEffect(() => {
    switch (location.pathname) {
      case "/groups":
        setContent(<Groups />);
        break;
      case location.pathname.startsWith("/groups/") &&
        location.pathname !== "/groups":
        setContent(<GroupDetail />);
        break;
      case "/calendar":
        setContent(<Calendar />);
        break;
      default:
        setContent(<Welcome />);
        break;
    }
  }, [location.pathname]);

  return <>{content}</>;
}

export default Dashboard;
