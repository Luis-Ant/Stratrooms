import jwt from "jsonwebtoken";
import courseService from "../services/courseService.js";

const verifyCourseAccess = async (req, res, next) => {
  try {
    console.log("Verificando acceso al curso");
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res
        .status(401)
        .json({ error: "Acceso no autorizado: Token no proporcionado" });
    }

    // Verificar el token de acceso
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = decoded;

    // Verificar que el usuario sea profesor o alumno
    if (
      req.user.tipoUsuario !== "PROFESOR" &&
      req.user.tipoUsuario !== "ALUMNO"
    ) {
      return res.status(403).json({
        error: "Acceso denegado. Solo profesores y alumnos pueden acceder",
      });
    }

    // Si es una ruta de verificación de inscripción o acceso a curso específico
    if (req.params.id) {
      const isEnrolled = await courseService.verifyEnrollment(
        req.user.idUsuario,
        req.params.id,
        req.user.tipoUsuario
      );

      if (!isEnrolled) {
        return res.status(403).json({
          error: "Acceso denegado. No tienes permiso para acceder a este curso",
        });
      }
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: "Error al verificar el token" });
  }
};

export { verifyCourseAccess };
