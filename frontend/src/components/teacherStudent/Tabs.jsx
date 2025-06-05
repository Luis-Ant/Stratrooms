import React from "react";

export function Tabs({ tabs, activeTabId, onTabChange }) {
  return (
    <div className="flex border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-t-2xl shadow-md">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`px-6 py-3 text-lg font-medium focus:outline-none transition-colors duration-200
            ${
              activeTabId === tab.id
                ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
