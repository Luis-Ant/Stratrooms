import { useContext } from "react";
import { AuthContext } from "../../context/authContext.jsx";
import { useNotification } from "../../context/NotificationContext.jsx";
import Notification from "../notifications/Notification.jsx";
import ThemeSwitcher from "./ThemeSwitcher.jsx";
import Icon from "./Icon.jsx";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { notification, closeNotification } = useNotification();

  // Función para obtener iniciales
  const getInitials = (name, surname) => {
    if (!name || !surname) return "";
    return `${name.charAt(0)}${surname.charAt(0)}`.toUpperCase();
  };

  return (
    <nav className="relative w-full px-4 py-2 border-b border-gray-300 dark:border-gray-600 bg-gray-50 text-gray-900 dark:text-white dark:bg-gray-800 flex justify-between items-center">
      {/* Logo and Title */}
      <div className="flex items-center space-x-2">
        <div
          className="w-15 h-15 text-gray-800 dark:text-white"
          aria-hidden="true"
        >
          <Icon name="logo" className="w-15 h-15" />
        </div>
        <span className="text-2xl font-semibold pr-10 text-black dark:text-white">
          Stratrooms
        </span>
      </div>
      {/* Actions: Notifications, Theme Switcher, Divider, Avatar */}
      <div className="flex items-center">
        {/* Notification button */}
        <div className="relative">
          <button
            variant="ghost"
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          >
            <Icon
              name={notification ? "notification-on" : "notification-off"}
              className="w-6 h-6"
            />
          </button>
          {/* Notification Component */}
          <Notification
            notification={notification}
            onClose={closeNotification}
          />
        </div>
        {/* Theme switcher */}
        <div className="mx-2">
          <ThemeSwitcher />
        </div>
        {/* Divider */}
        <div className="h-6 w-0.5 bg-gray-300 dark:bg-gray-600 mx-2" />
        {/* User avatar */}
        <button className="flex items-center justify-end gap-4 p-2 rounded-full cursor-pointer">
          <div class="hidden sm:block font-medium dark:text-white">
            <div>{user.nombreUsuario}</div>
            <div class="text-sm flex justify-end text-gray-500 dark:text-gray-400">
              {user.apllPatUsuario}
            </div>
          </div>
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
