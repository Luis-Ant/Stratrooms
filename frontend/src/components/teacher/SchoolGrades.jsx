import React from "react";
import UserAvatar from "../common/UserAvatar.jsx";
import {
  EyeIcon,
  ChatBubbleLeftRightIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/solid";

const SchoolGrades = ({
  enrolledStudents,
  user,
  onExportGrades,
  onOpenStudentFile,
  onMessageStudent,
}) => {
  // Mock grades for demonstration. In a real app, these would come from your API.
  // You might need to fetch assignments and submissions to calculate grades.
  // For simplicity, let's assume `student.grade` exists or calculate a dummy grade.
  const getStudentGrade = (studentId) => {
    // Replace with actual logic to fetch/calculate student's grade
    // For now, a simple mock:
    const gradesMap = {
      22: "8.5/10", // Example: idAlumno 22 has 8.5/10
      53: "9.0/10",
      12: "7.0/10",
      57: "6.5/10",
      // ... more grades
    };
    return gradesMap[studentId] || "_ /10"; // Default if no grade found
  };

  const handleExportClick = () => {
    console.log("Export grades clicked!");
    // Call the parent's handler for exporting
    if (onExportGrades) {
      onExportGrades();
    }
  };

  return (
    <div className="space-y-6">
      {/* Export Button */}
      <div className="flex justify-end">
        {/* Only teacher can export */}
        {user.tipoUsuario === "PROFESOR" && (
          <button
            onClick={handleExportClick}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                       dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-offset-gray-900"
          >
            <ArrowDownTrayIcon
              className="-ml-1 mr-2 h-5 w-5"
              aria-hidden="true"
            />
            Export
          </button>
        )}
      </div>

      {/* Grades Table */}
      <div className="overflow-x-auto rounded-lg shadow dark:border dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
              >
                Full Name of Student
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
              >
                School Grades
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
              >
                Options
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {enrolledStudents.length > 0 ? (
              enrolledStudents.map((student) => (
                <tr
                  key={student.idUsuario}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <UserAvatar user={student} size="md" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {`${student.nombreUsuario || ""} ${
                            student.apllPatUsuario || ""
                          }`}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {student.nombreUsuario
                            ? `@${student.nombreUsuario
                                .toLowerCase()
                                .replace(/\s/g, "")}`
                            : "@username"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                    {getStudentGrade(student.idUsuario)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      {/* Only teacher can see these options */}
                      {user.tipoUsuario === "PROFESOR" && (
                        <>
                          <button
                            onClick={() =>
                              onOpenStudentFile &&
                              onOpenStudentFile(student.idUsuario)
                            }
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-500 flex items-center"
                            title="Open File"
                          >
                            <EyeIcon className="h-5 w-5 mr-1" />
                            Open File
                          </button>
                          <button
                            onClick={() =>
                              onMessageStudent &&
                              onMessageStudent(student.idUsuario)
                            }
                            className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-500 flex items-center"
                            title="Message Student"
                          >
                            <ChatBubbleLeftRightIcon className="h-5 w-5 mr-1" />
                            Messages
                          </button>
                        </>
                      )}
                      {/* Students might see a different set of options or just their own grade */}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No enrolled students to display grades.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SchoolGrades;
