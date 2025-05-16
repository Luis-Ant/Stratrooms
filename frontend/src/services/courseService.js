import axiosInstance from "../utils/axiosConfig.js";

// Funcion para obtener todos los cursos
export const getAllCourses = async () => {
  try {
    const response = await axiosInstance.get("/course/all");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo cursos:", error);
    throw error;
  }
};

// Función para obtener un curso por su ID
export const getCourseById = async (id) => {
  try {
    const response = await axiosInstance.get(`/course/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el curso con ID ${id}:`, error);
    throw error;
  }
};


// Añade esta función a courseService.js
export const getCoursesByTeacher = async (teacherId) => {
  try {
    const response = await axiosInstance.get(`/course/teacher/${teacherId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener cursos del profesor con ID ${teacherId}:`, error);
    throw error;
  }
};
