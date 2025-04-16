import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Hook para redirigir después del login

  const login = (userData) => {
    const userInfo = {
      ...userData.user,
      tipoUsuario: userData.user.tipoUsuario,
      nombreUsuario: userData.user.nombreUsuario,
    };
    setUser(userInfo);

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
  };

  const logout = () => {
    setUser(null);
    navigate("/login"); // Redirigir al login al cerrar sesión
  };

  // const refreshSession = useCallback(async () => {
  //   try {
  //     const response = await axiosInstance.post("/refreshToken", {
  //       refreshToken: Cookies.get("refreshToken"),
  //     });
  //     // Actualizar el access token en las cookies
  //     Cookies.remove("accessToken"); // Eliminar el token anterior
  //     Cookies.set("accessToken", response.data.accessToken, {
  //       httpOnly: true,
  //       secure: true,
  //       sameSite: "strict",
  //     });
  //   } catch (err) {
  //     console.error("Error refreshing token:", err);
  //     logout();
  //   }
  // }, [logout]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     refreshSession(); // Refrescar el token cada cierto tiempo
  //   }, 14 * 60 * 1000); // Refrescar el token cada 14 minutos (antes de que expire el access token)
  //   return () => clearInterval(interval);
  // }, [refreshSession]);

  // useEffect(() => {
  //   const checkSession = async () => {
  //     const refreshToken = Cookies.get("refreshToken");
  //     if (refreshToken) {
  //       try {
  //         await refreshSession(); // Intentar renovar el access token al cargar la app
  //       } catch (err) {
  //         console.error("Session expired:", err);
  //         logout();
  //       }
  //     }
  //   };
  //   checkSession();
  // }, [refreshSession]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
