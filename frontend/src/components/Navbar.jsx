import React, { useContext } from "react";
import { AuthContext } from "../context/authContext.jsx";
import ThemeSwitcher from "../components/themeSwitcher.jsx";
import Logo from "../assets/logo.svg";
import Ring from "../assets/icons/ring.svg?raw";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  // Función para obtener iniciales
  const getInitials = (name, surname) => {
    if (!name || !surname) return "";
    return `${name.charAt(0)}${surname.charAt(0)}`.toUpperCase();
  };

  return (
    <nav className="w-full px-4 py-2 border-b  border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 flex justify-between items-center ">
      <div className="flex items-center space-x-2">
        <img src={Logo} alt="Mi Logo" className="h-15 w-15 pr-3" />
        <span className="text-2xl font-semibold pr-10  text-black dark:text-white">
          Stratrooms
        </span>
      </div>
      <div className="flex-1 mx-4 text-xm text-black dark:text-white justify-between sm:flex hidden">
        <span>
          Welcome {user.nombreUsuario} {user.apllPatUsuario}
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <button
          variant="ghost"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <div
            dangerouslySetInnerHTML={{ __html: Ring }}
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
          />
        </button>
        <ThemeSwitcher />
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              {getInitials(user.nombreUsuario, user.apllPatUsuario)}
            </span>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
