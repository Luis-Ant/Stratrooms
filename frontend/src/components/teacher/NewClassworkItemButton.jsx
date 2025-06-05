import React, { useState, useRef, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";

const NewClassworkItemButton = ({ onNewItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (type) => {
    onNewItem(type);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                     dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-offset-gray-900"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          New
        </button>
      </div>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="origin-top-left absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            <button
              onClick={() => handleOptionClick("homework")}
              className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white"
              role="menuitem"
              tabIndex="-1"
            >
              <svg
                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-300 dark:group-hover:text-gray-100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m7 0V5m0 0a2 2 0 012-2h4a2 2 0 012 2v10a2 2 0 01-2 2H9a2 2 0 01-2-2V5a2 2 0 012-2h4z"
                ></path>
              </svg>{" "}
              {/* Icono de Homework/Document */}
              Homework
            </button>
            <button
              onClick={() => handleOptionClick("material")}
              className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white"
              role="menuitem"
              tabIndex="-1"
            >
              <svg
                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-300 dark:group-hover:text-gray-100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.205 5 7.5 5S4.168 5.477 3 6.253v13C4.168 19.523 5.795 20 7.5 20s3.332-.477 4.5-1.253m0-13C13.168 5.477 14.795 5 16.5 5c1.705 0 3.332.477 4.5 1.253v13C19.832 19.523 18.205 20 16.5 20c-1.705 0-3.332-.477-4.5-1.253"
                ></path>
              </svg>{" "}
              {/* Icono de Material/Book */}
              Material
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewClassworkItemButton;
