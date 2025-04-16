import axiosInstance from "../utils/axiosConfig";

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post("/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error en el servicio de login:", error);
    throw error;
  }
};
