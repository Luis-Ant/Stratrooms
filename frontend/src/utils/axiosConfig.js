import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001", // URL base del backend
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Permitir el envío de cookies automáticamente
});

// Interceptor para manejar errores de autenticación
axiosInstance.interceptors.response.use(
  (response) => response, // Devolver la respuesta si no hay errores
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 (no autorizado) y no se ha intentado renovar el token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Marcar la solicitud como reintentada

      try {
        // Intentar renovar el token llamando a la ruta /auth/refreshToken
        await axiosInstance.post("/auth/refreshToken");

        // Reintentar la solicitud original
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Error al renovar el token:", refreshError);
        // Si no se puede renovar el token, redirigir al login
        window.location.href = "/login";
      }
    }

    // Rechazar la promesa si no es un error 401 o si la renovación falla
    return Promise.reject(error);
  }
);

export default axiosInstance;
