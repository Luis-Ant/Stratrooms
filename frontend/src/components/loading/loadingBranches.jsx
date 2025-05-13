import React from "react";

function LoadingBranches() {
  return (
    <div
      className="relative overflow-x-auto shadow-md sm:rounded-lg animate-pulse"
      role="status"
      aria-busy="true"
    >
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3 text-center w-3/4 h-8 bg-gray-300 rounded-md"></th>
            <th className="px-6 py-3 text-center w-1/4 h-8 bg-gray-300 rounded-md"></th>
            <th className="px-6 py-3 text-center w-1/4 h-8 bg-gray-300 rounded-md"></th>
            {/* Cambiado 'class' a 'className' aquí */}
            {typeof onEdit !== "undefined" && (
              <th className="px-6 py-3 text-center w-24 h-8 bg-gray-300 rounded-md"></th>
            )}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              colspan="3"
              className="px-6 py-4 text-center text-gray-700 dark:text-gray-300 w-full h-8 bg-gray-300 rounded-md"
            ></td>
            {/* Cambiado 'class' a 'className' aquí */}
            {typeof onEdit !== "undefined" && (
              <td className="px-6 py-4 text-right space-x-2 w-24 h-8">
                <div className="w-full h-10 bg-gray-300 rounded-md"></div>
              </td>
            )}
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4 text-center w-3/4 h-8 bg-gray-300 rounded-md"></td>
            <td className="px-6 py-4 text-center w-1/4 h-8 bg-gray-300 rounded-md"></td>
            <td className="px-6 py-4 text-center w-1/4 h-8 bg-gray-300 rounded-md"></td>
            {/* Cambiado 'class' a 'className' aquí */}
            {typeof onEdit !== "undefined" && (
              <td className="px-6 py-4 text-right space-x-2 w-24 h-8">
                <div className="w-full h-10 bg-gray-300 rounded-md"></div>
              </td>
            )}
          </tr>
          <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4 text-center w-3/4 h-8 bg-gray-300 rounded-md"></td>
            <td className="px-6 py-4 text-center w-1/4 h-8 bg-gray-300 rounded-md"></td>
            <td className="px-6 py-4 text-center w-1/4 h-8 bg-gray-300 rounded-md"></td>
            {/* Cambiado 'class' a 'className' aquí */}
            {typeof onEdit !== "undefined" && (
              <td className="px-6 py-4 text-right space-x-2 w-24 h-8">
                <div className="w-full h-10 bg-gray-300 rounded-md"></div>
              </td>
            )}
          </tr>
          <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4 text-center w-3/4 h-8 bg-gray-300 rounded-md"></td>
            <td className="px-6 py-4 text-center w-1/4 h-8 bg-gray-300 rounded-md"></td>
            <td className="px-6 py-4 text-center w-1/4 h-8 bg-gray-300 rounded-md"></td>
            {/* Cambiado 'class' a 'className' aquí */}
            {typeof onEdit !== "undefined" && (
              <td className="px-6 py-4 text-right space-x-2 w-24 h-8">
                <div className="w-full h-10 bg-gray-300 rounded-md"></div>
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default LoadingBranches;
