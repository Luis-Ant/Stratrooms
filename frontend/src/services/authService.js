import axiosInstance from "../utils/axiosConfig.js";

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    return response.data; // Retornar los datos del usuario y los tokens
  } catch (error) {
    // Manejo detallado de errores
    if (error.response) {
      // Errores del servidor (4xx o 5xx)
      console.error("Error en el servidor:", error.response.data);
      throw new Error(error.response.data.message || "Error en el servidor.");
    } else if (error.request) {
      // No se recibió respuesta del servidor
      console.error("No se recibió respuesta del servidor:", error.request);
      throw new Error(
        "No se pudo conectar con el servidor. Intenta nuevamente."
      );
    } else {
      // Otros errores
      console.error("Error desconocido:", error.message);
      throw new Error("Ocurrió un error inesperado. Intenta nuevamente.");
    }
  }
};
