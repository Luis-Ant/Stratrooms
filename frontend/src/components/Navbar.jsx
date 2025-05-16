import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext.jsx";
import ThemeSwitcher from "../components/themeSwitcher.jsx";
import Logo from "../assets/logo.svg";
import Ring from "../assets/icons/ring.svg?raw";
import Close from "../assets/icons/close.svg";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);

  // Función para obtener iniciales
  const getInitials = (name, surname) => {
    if (!name || !surname) return "";
    return `${name.charAt(0)}${surname.charAt(0)}`.toUpperCase();
  };

  //Función para desplegar información del usuario de la foto
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowUserInfo(false); 
  };
  
  //Función para desplegar notificaciones del usuario del icono
  const toggleUserInfo = () => {
    setShowUserInfo(!showUserInfo);
    setShowNotifications(false); 
  };
  
  //Función para cerrar el panel de usuario
  const closeUserInfo = () => {
    setShowUserInfo(false);
  };

  return (
    <nav className="w-full px-4 py-2 border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 flex justify-between items-center">
      {/* Logo y título */}
      <div className="flex items-center space-x-2">
        <img src={Logo} alt="Mi Logo" className="h-15 w-15 pr-3" />
        <span className="text-2xl font-semibold pr-10 text-black dark:text-white">
          Stratrooms
        </span>
      </div>

      {/* Mensaje de bienvenida */}
      <div className="flex-1 mx-4 text-xm text-black dark:text-white justify-between sm:flex hidden">
        <span>
          Welcome {user.nombreUsuario} {user.apllPatUsuario}
        </span>
      </div>

      {/* Íconos de notificaciones, tema y usuario */}
      <div className="flex items-center space-x-4">
        {/* Ícono de notificaciones */}
        <div className="relative">
          <button
            onClick={toggleNotifications}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
          >
            <div
              dangerouslySetInnerHTML={{ __html: Ring }}
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
            />
          </button>
        </div>
        {/* Theme Switcher */}
        <ThemeSwitcher />

        {/* Círculo del usuario */}
        <div className="relative">
          <button
            onClick={toggleUserInfo}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
          >
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
              <span className="font-medium text-gray-600 dark:text-gray-300">
                {getInitials(user.nombreUsuario, user.apllPatUsuario)}
              </span>
            </div>
          </button>

          {/* Dropdown de información del usuario */}
          {showUserInfo && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-700 shadow-lg rounded-md p-4 z-10">
              <div className="flex flex-col items-center space-y-3 relative">
                {/* se muestra el correo */}
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  {user.email}
                </h4>
                
                {/* Botón para cerrar (colocado como elemento absoluto) */}
                <button 
                  onClick={closeUserInfo}
                  className="absolute top-0 right-0 p-1"
                >
                  <img className="w-5 h-5" src={Close} alt="close" />
                </button>
                
                {/* imagen del usuario */}
                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
                  <span className="font-medium text-gray-600 dark:text-gray-300">
                    {getInitials(user.nombreUsuario, user.apllPatUsuario)}
                  </span>
                </div>
                
                {/* saludo */}
                <p className="text-sm text-gray-700 dark:text-gray-200">
                  <strong>¡Hi, </strong> {user.nombreUsuario} {user.apllPatUsuario} <strong>!</strong>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;