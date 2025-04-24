import axiosInstance from "../utils/axiosConfig.js";

// Funcion para obtener todas las sedes
export const getAllBranches = async () => {
  try {
    const response = await axiosInstance.get("/branch/all");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo sedes:", error);
    throw error;
  }
};
