import React, { createContext, useState, useEffect, useCallback } from "react";
import {
  login as loginService,
  logout as logoutService,
  refreshToken as refreshTokenService,
  verifyToken as verifyTokenService,
} from "../services/authService.js";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado del usuario
  const [loading, setLoading] = useState(true); // Estado de carga

  // Funcion para iniciar sesión
  const login = useCallback(async (userData) => {
    try {
      const response = await loginService(userData.email, userData.password);
      const userInfo = { ...response };
      setUser(userInfo);
      //
      console.log("Usuario autenticado context:", userInfo); // Depuracion
      //
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      throw error;
    }
  }, []);

  // Función para cerrar sesión
  const logout = useCallback(async () => {
    try {
      await logoutService(); // Llamar al servicio para cerrar sesión
      setUser(null); // Limpiar el estado del usuario
      //
      console.log("Sesión cerrada"); // Depuracion
      //
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  }, []);

  // Funcion para refrescar el token de acceso
  const refreshSession = useCallback(async () => {
    try {
      await refreshTokenService();
      console.log("Access token renovado", response); // Depuracion
    } catch (err) {
      console.error("Error al renovar el token:", err);
      logout(); // Cerrar sesión si no se puede renovar el token
    }
  }, [logout]);

  // Efecto para verificar la sesión al cargar la app
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await verifyTokenService();
        const { id, nombreUsuario, tipoUsuario } = response.decoded;
        if (
          !user ||
          user.id !== id ||
          user.nombreUsuario !== nombreUsuario ||
          user.tipoUsuario !== tipoUsuario
        )
          setUser({ id, nombreUsuario, tipoUsuario });
        //
        console.log("Usuario verificado en checkSesion:"); // Depuracion
        //
      } catch (err) {
        console.warn(
          "Access token inválido o expirado, intentando renovarlo..."
        );
        try {
          await refreshTokenService();
          const response = await verifyTokenService();
          const { id, nombreUsuario, tipoUsuario } = response.decoded;
          if (
            !user ||
            user.id !== id ||
            user.nombreUsuario !== nombreUsuario ||
            user.tipoUsuario !== tipoUsuario
          )
            setUser({ id, nombreUsuario, tipoUsuario });
          //
          console.log("Usuario verificado en RefrescarToken:"); // Depuracion
          //
        } catch (refreshError) {
          console.error(
            "Error al renovar el token al cargar la app:",
            refreshError
          );
          logout();
        }
      } finally {
        setLoading(false); // Cambiar el estado de carga a falso
      }
    };
    checkSession();
  }, [logout]);

  // Efecto para refrescar el token cada 14 minutos
  useEffect(() => {
    if (user) {
      const interval = setInterval(() => {
        refreshSession();
      }, 14 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [refreshSession, user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
