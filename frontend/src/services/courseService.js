import axiosInstance from "../utils/axiosConfig.js";

export const getAllCourses = async () => {
  try {
    const response = await axiosInstance.get("/course/all");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo cursos:", error);
    throw error;
  }
};

export const getCourseById = async (id) => {
  try {
    const response = await axiosInstance.get(`/course/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el curso con ID ${id}:`, error);
    throw error;
  }
};
