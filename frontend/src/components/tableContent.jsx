import React from "react";

export function TableContent({
  data = [],
  columns,
  onAdd,
  onEdit,
  onDelete,
  title = "Items",
}) {
  // Si no se especifican columnas, deducirlas del primer objeto
  const cols = React.useMemo(() => {
    if (columns && columns.length) return columns;
    if (data.length > 0) return Object.keys(data[0]);
    return [];
  }, [columns, data]);

  return (
    <section className="flex items-center h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-screen-xl px-4 mx-auto lg:px-12">
        {/* Header */}
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg mb-6">
          <div className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
            <div>
              <h5 className="mr-3 font-semibold dark:text-white">{title}</h5>
              <p className="text-gray-500 dark:text-gray-400">
                Gestiona tus {title.toLowerCase()} o añade uno nuevo
              </p>
            </div>
            {onAdd && (
              <button
                onClick={onAdd}
                type="button"
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 mr-2 -ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                </svg>
                Add new {title.slice(0, -1)}
              </button>
            )}
          </div>
        </div>

        {/* Tabla */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {cols.map((col) => (
                  <th key={col} className="px-6 py-3">
                    {col.charAt(0).toUpperCase() + col.slice(1)}
                  </th>
                ))}
                {(onEdit || onDelete) && (
                  <th className="px-6 py-3">
                    <span className="sr-only"> Actions </span>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {data.length === 0 && (
                <tr>
                  <td
                    colSpan={cols.length + (onEdit || onDelete ? 1 : 0)}
                    className="px-6 py-4 text-center text-gray-700 dark:text-gray-300"
                  >
                    No data available.
                  </td>
                </tr>
              )}
              {data.map((row, idx) => (
                <tr
                  key={idx}
                  className={`${
                    idx < data.length - 1
                      ? "bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                      : "bg-white dark:bg-gray-800"
                  } hover:bg-gray-50 dark:hover:bg-gray-600`}
                >
                  {cols.map((col, i) => (
                    <td
                      key={i}
                      className={
                        i === 0
                          ? "px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          : "px-6 py-4"
                      }
                    >
                      {row[col]}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="px-6 py-4 text-right space-x-2">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
