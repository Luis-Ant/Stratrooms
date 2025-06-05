import React, { useState } from "react";
import NewClassworkItemButton from "../teacher/NewClassworkItemButton";
import { BookOpen, FileText, ArrowRight, MoreVertical } from "lucide-react";

const ClassworkSection = ({ course, user }) => {
  const [classwork, setClasswork] = useState([
    {
      id: "cw1",
      type: "homework",
      title: "Homework: Introduction to React",
      dueDate: "2024-06-15T23:59:00Z",
    },
    {
      id: "cw2",
      type: "material",
      title: "Material: Advanced Components and Hooks",
    },
    {
      id: "cw3",
      type: "homework",
      title: "Project: Building a Todo App",
      dueDate: "2024-06-20T23:59:00Z",
    },
    {
      id: "cw4",
      type: "material",
      title: "Material: State Management with Redux",
    },
    {
      id: "cw5",
      type: "homework",
      title: "Assignment: Custom Hooks Implementation",
      dueDate: "2024-06-25T23:59:00Z",
    },
    {
      id: "cw6",
      type: "material",
      title: "Material: React Router and Navigation",
    },
    {
      id: "cw7",
      type: "homework",
      title: "Quiz: React Fundamentals",
      dueDate: "2024-06-28T23:59:00Z",
    },
    {
      id: "cw8",
      type: "material",
      title: "Material: Testing in React with Jest",
    },
    {
      id: "cw9",
      type: "homework",
      title: "Final Project: E-commerce Application",
      dueDate: "2024-07-05T23:59:00Z",
    },
    {
      id: "cw10",
      type: "material",
      title: "Material: Performance Optimization in React",
    },
    {
      id: "cw11",
      type: "homework",
      title: "Assignment: Context API Implementation",
      dueDate: "2024-07-10T23:59:00Z",
    },
    {
      id: "cw12",
      type: "material",
      title: "Material: React Security Best Practices",
    },
    {
      id: "cw13",
      type: "homework",
      title: "Group Project: Social Media Dashboard",
      dueDate: "2024-07-15T23:59:00Z",
    },
    {
      id: "cw14",
      type: "material",
      title: "Material: Advanced CSS in React",
    },
    {
      id: "cw15",
      type: "homework",
      title: "Assignment: Form Handling and Validation",
      dueDate: "2024-07-20T23:59:00Z",
    },
    {
      id: "cw16",
      type: "material",
      title: "Material: React Design Patterns",
    },
    {
      id: "cw17",
      type: "homework",
      title: "Project: Real-time Chat Application",
      dueDate: "2024-07-25T23:59:00Z",
    },
    {
      id: "cw18",
      type: "material",
      title: "Material: React and TypeScript Integration",
    },
    {
      id: "cw19",
      type: "homework",
      title: "Assignment: Authentication Implementation",
      dueDate: "2024-07-30T23:59:00Z",
    },
    {
      id: "cw20",
      type: "material",
      title: "Material: React Deployment Strategies",
    },
  ]);

  const [filter, setFilter] = useState("all"); // 'all', 'homework', 'material'

  const filteredClasswork = classwork.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleNewItem = (type) => {
    // Lógica para añadir un nuevo elemento (Homework o Material)
    // Aquí podrías abrir un modal o navegar a una página para crear el elemento
    const newItem = {
      id: `cw${Date.now()}`,
      type: type,
      title: `${type === "homework" ? "Nueva Tarea" : "Nuevo Material"}`,
      // Puedes añadir más propiedades aquí (ej. description, files, etc.)
    };
    setClasswork([newItem, ...classwork]); // Añadir al principio
    console.log(`Crear nuevo: ${type}`);
    // TODO: Llamar a tu servicio para guardar en el backend
  };

  const handleEditItem = (itemId) => {
    console.log(`Editar item: ${itemId}`);
    // TODO: Lógica para editar (abrir modal de edición, etc.)
  };

  const handleDeleteItem = (itemId) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este elemento?")
    ) {
      setClasswork(classwork.filter((item) => item.id !== itemId));
      console.log(`Eliminar item: ${itemId}`);
      // TODO: Llamar a tu servicio para eliminar del backend
    }
  };

  return (
    <div className="w-full">
      {/* New button visible only for teachers */}
      {user.tipoUsuario === "PROFESOR" && (
        <div className="mx-10">
          <NewClassworkItemButton onNewItem={handleNewItem} />
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Classwork
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("homework")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === "homework"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              Homework
            </button>
            <button
              onClick={() => setFilter("material")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === "material"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              Materials
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredClasswork.length > 0 ? (
            filteredClasswork.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      item.type === "homework"
                        ? "bg-blue-100 dark:bg-blue-900"
                        : "bg-green-100 dark:bg-green-900"
                    }`}
                  >
                    {item.type === "homework" ? (
                      <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                    ) : (
                      <FileText className="w-5 h-5 text-green-600 dark:text-green-300" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    {item.dueDate && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Due: {formatDate(item.dueDate)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {user.tipoUsuario === "PROFESOR" && (
                    <div className="relative">
                      <button
                        onClick={() => {
                          // Toggle menu for this item
                          const menu = document.getElementById(
                            `menu-${item.id}`
                          );
                          if (menu) {
                            menu.classList.toggle("hidden");
                          }
                        }}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      </button>
                      <div
                        id={`menu-${item.id}`}
                        className="hidden absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-10"
                      >
                        <button
                          onClick={() => handleEditItem(item.id)}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
              No classwork items yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassworkSection;
