import React, { createContext, useState, useEffect, useCallback } from "react";
import {
  login as loginService,
  logout as logoutService,
  refreshToken as refreshTokenService,
  verifyToken as verifyTokenService,
} from "../services/authService.js";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Funcion para iniciar sesión
  const login = useCallback(async (userData) => {
    try {
      const response = await loginService(userData.email, userData.password);
      const userInfo = { ...response };
      setUser(userInfo);
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      throw error;
    }
  }, []);

  // Función para cerrar sesión
  const logout = useCallback(async () => {
    try {
      await logoutService();
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  }, []);

  // Funcion para refrescar el token de acceso
  const refreshSession = useCallback(async () => {
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
    } catch (refreshError) {
      console.error(
        "Error al renovar el token al cargar la app:",
        refreshError
      );
      logout();
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
      } catch (err) {
        console.warn(
          "Access token inválido o expirado, intentando renovarlo..."
        );
        refreshSession(); // Intentar refrescar el token
      } finally {
        setLoading(false); // Cambiar el estado de carga a falso
      }
    };
    checkSession();
  }, [logout]);

  // Efecto para refrescar el token de acceso
  useEffect(() => {
    if (user) {
      const interval = setInterval(() => {
        refreshSession();
      }, 14 * 60 * 1000); // 14 minutos
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
