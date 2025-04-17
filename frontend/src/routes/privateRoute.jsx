import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />; // Redirigir al login si no está autenticado
  }

  if (!allowedRoles.includes(user.tipoUsuario)) {
    return <Navigate to="/" />; // Redirigir si no tiene permiso
  }

  return children; // Renderizar la página si tiene permiso
};

export default PrivateRoute;
