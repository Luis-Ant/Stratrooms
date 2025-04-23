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
