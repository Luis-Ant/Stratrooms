import React, { createContext, useState, useEffect, useCallback } from "react";
import { login as loginService } from "../services/authService.js"; // Importar el servicio de login
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig.js";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado del usuario
  const navigate = useNavigate(); // Hook para redirigir después del login

  // Funcion para iniciar sesión
  const login = async (userData) => {
    try {
      // Llamar al servicio de login para autenticar al usuario
      const response = await loginService(userData.email, userData.password);
      const userInfo = {
        ...response,
      };
      setUser(userInfo);
      console.log("Usuario autenticado:", userInfo);

      // Redirigir según el tipo de usuario
      if (userInfo.tipoUsuario === "ADMINISTRADOR") {
        navigate("/dashboard/admin");
      } else if (userInfo.tipoUsuario === "PROFESOR") {
        navigate("/dashboard/profe");
      } else if (userInfo.tipoUsuario === "ALUMNO") {
        navigate("/dashboard/alumn");
      } else {
        navigate("/"); // Redirigir a una página por defecto si no coincide
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      throw error; // Manejar el error en el formulario si es necesario
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    navigate("/login"); // Redirigir al login al cerrar sesión
  };

  // Funcion para refrescar el token de acceso
  const refreshSession = useCallback(async () => {
    try {
      const response = await axiosInstance.post("/auth/refreshToken");
      console.log("Access token renovado");
    } catch (err) {
      console.error("Error al renovar el token:", err);
      logout(); // Cerrar sesión si no se puede renovar el token
    }
  }, [logout]);

  // Efecto para refrescar el token cada 14 minutos
  useEffect(() => {
    const interval = setInterval(() => {
      refreshSession(); // Refrescar el token cada cierto tiempo
    }, 14 * 60 * 1000); // Refrescar el token cada 14 minutos (antes de que expire el access token)
    return () => clearInterval(interval);
  }, [refreshSession]);

  // Efecto para verificar la sesión al cargar la app
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axiosInstance.post("/auth/verify");
        const { id, nombreUsuario, tipoUsuario } = response.data;

        // Actualizar el estado del usuario
        setUser({ id, nombreUsuario, tipoUsuario });
      } catch (err) {
        console.error("Sesión inválida o expirada:", err);
        logout();
      }
    };
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
