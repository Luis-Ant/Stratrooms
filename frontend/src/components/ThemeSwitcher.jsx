import React, { useState, useEffect } from "react";
import SunIcon from "../assets/icons/sun.svg?raw";
import MoonIcon from "../assets/icons/moon.svg?raw";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = window.document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <div
        dangerouslySetInnerHTML={{ __html: SunIcon }}
        className={`w-6 h-6 text-gray-800 ${theme === "dark" ? "" : "hidden"}`}
        aria-hidden="true"
      />
      <div
        dangerouslySetInnerHTML={{ __html: MoonIcon }}
        className={`w-6 h-6 text-gray-800 dark:text-white ${
          theme === "light" ? "" : "hidden"
        }`}
        aria-hidden="true"
      />
    </button>
  );
};

export default ThemeSwitcher;
