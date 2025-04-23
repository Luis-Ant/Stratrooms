import React, { useState, useEffect, useContext, Children } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllCourses } from "../services/courseService.js";
import { cn } from "../utils/utils.js";
import { motion, AnimatePresence } from "framer-motion";

import BranchIcon from "../assets/icons/branchesIcon.svg?raw";
import SubjectIcon from "../assets/icons/subjectsIcon.svg?raw";
import AdminIcon from "../assets/icons/adminIcon.svg?raw";
import TeacherIcon from "../assets/icons/teacherIcon.svg?raw";
import StudentIcon from "../assets/icons/studentIcon.svg?raw";
import GroupIcon from "../assets/icons/groupsIcon.svg?raw";
import CourseIcon from "../assets/icons/courseIcon.svg?raw";
import LogoutIcon from "../assets/icons/logoutIcon.svg?raw";
import MenuIcon from "../assets/icons/menuIcon.svg?raw";
import FelchLeftIcon from "../assets/icons/flechLeftIcon.svg?raw";
import FlechDownIcon from "../assets/icons/flechDownIcon.svg?raw";
import PlusIcon from "../assets/icons/plusIcon.svg?raw";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isGroupsOpen, setIsGroupsOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleGroups = () => {
    setIsGroupsOpen(!isGroupsOpen);
  };

  useEffect(() => {
    const coursesData = async () => {
      try {
        const response = await getAllCourses();
        //
        console.log("Cursos obtenidos", response); //Dep
        //
        setCourses(response);
      } catch (error) {
        console.error("Error obteniendo cursos:", error);
      }
    };
    coursesData();
  }, []);

  const sidebarItems = [
    {
      label: "Branches",
      icon: (
        <div
          dangerouslySetInnerHTML={{ __html: BranchIcon }}
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
        />
      ),
      route: "/branches",
    },
    {
      label: "Subjects",
      icon: (
        <div
          dangerouslySetInnerHTML={{ __html: SubjectIcon }}
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
        />
      ),
      route: "/subjects",
    },
    {
      label: "Admins",
      icon: (
        <div
          dangerouslySetInnerHTML={{ __html: AdminIcon }}
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
        />
      ),
      route: "/admins",
    },
    {
      label: "Teachers",
      icon: (
        <div
          dangerouslySetInnerHTML={{ __html: TeacherIcon }}
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
        />
      ),
      route: "/teachers",
    },
    {
      label: "Students",
      icon: (
        <div
          dangerouslySetInnerHTML={{ __html: StudentIcon }}
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
        />
      ),
      route: "/students",
    },
    {
      label: "Groups",
      icon: (
        <div
          dangerouslySetInnerHTML={{ __html: GroupIcon }}
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
        />
      ),
      route: "/groups",
      onClick: toggleGroups,
      Children: courses,
    },
    {
      label: "Log Out",
      icon: (
        <div
          dangerouslySetInnerHTML={{ __html: LogoutIcon }}
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
        />
      ),
      route: "/logout",
    },
  ];

  const handleItemClick = (route) => {
    navigate(route);
  };

  // Animation variants
  const courseVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2 },
      },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2 },
      },
    },
  };

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-20",
        "border-r border-gray-300 dark:border-gray-600"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-600 truncate">
        <button
          variant="ghost"
          onClick={toggleSidebar}
          className="flex items-center ml-2 text-gray-900 dark:text-white hover:text-primary-700 dark:hover:text-primary-400 cursor-pointer"
        >
          {isOpen ? (
            <>
              <div
                dangerouslySetInnerHTML={{ __html: FelchLeftIcon }}
                className="w-6 h-6 mr-3 text-gray-800 dark:text-white"
                aria-hidden="true"
              />
              Dashboard
            </>
          ) : (
            <>
              <div
                dangerouslySetInnerHTML={{ __html: MenuIcon }}
                className="w-6 h-6 mr-3 text-gray-800 dark:text-white"
                aria-hidden="true"
              />
            </>
          )}
        </button>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item, index) => (
          <div key={index}>
            <div
              className={cn(
                "flex items-center gap-2 p-2 rounded-md transition-colors duration-30",
                "hover:text-white dark:hover:text-gray-900 hover:bg-primary-700 dark:hover:bg-primary-300",
                "cursor-pointer",
                "font-medium",
                { active: location.pathname === item.route }
              )}
              onClick={() => handleItemClick(item.route)}
            >
              <div className="flex items-center gap-2">
                {item.icon}
                {isOpen && <span className="truncate">{item.label}</span>}
              </div>
              {item.Children && isOpen && (
                <div
                  dangerouslySetInnerHTML={{ __html: FlechDownIcon }}
                  className={cn(
                    "w-6 h-6 mr-3 text-gray-800 dark:text-white transition-transform ml-auto",
                    isGroupsOpen ? "rotate-180" : "rotate-0"
                  )}
                  aria-hidden="true"
                />
              )}
            </div>
            <AnimatePresence>
              {isGroupsOpen && isOpen && item.Children && (
                <motion.div
                  variants={courseVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="ml-8 space-y-1"
                >
                  {item.Children.slice(0, 5).map((course) => (
                    <div
                      key={course.idCurso}
                      className={cn(
                        "flex items-center gap-2 p-2 rounded-md transition-colors duration-30",
                        "hover:text-white dark:hover:text-gray-900 hover:bg-primary-700 dark:hover:bg-primary-300",
                        "cursor-pointer",
                        "font-medium"
                      )}
                      onClick={() => {
                        //  navegar a la ruta del curso
                        console.log(`Navigating to ${course.route}`);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          dangerouslySetInnerHTML={{ __html: CourseIcon }}
                          className="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                        />
                        {course.nombreCurso}
                      </div>
                    </div>
                  ))}
                  {item.Children.length > 5 && (
                    <div className="p-2 text-gray-400">...</div>
                  )}
                  <button
                    variant="ghost"
                    size="sm"
                    className="ml-2 text-gray-900 dark:text-white hover:text-primary-700 dark:hover:text-primary-400 cursor-pointer"
                    onClick={() => {
                      //  Navegar a la lista completa de cursos
                      console.log("Navegar a todos los cursos");
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        dangerouslySetInnerHTML={{ __html: PlusIcon }}
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                      />
                      <span>See more...</span>
                    </div>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
