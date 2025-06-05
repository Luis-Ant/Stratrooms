import express from "express";
import courseController from "../controllers/courseController.js";
import { verifyToken } from "../middlewares/adminMiddleware.js";
import { verifyCourseAccess } from "../middlewares/courseAccessMiddleware.js";

const router = express.Router();

// Rutas que requieren permisos de profesor o alumno
router.get("/mycourses", verifyCourseAccess, courseController.getMyCourses);

// Ruta para obtener un curso específico (requiere verificación de inscripción)
router.get(
  "/mycourses/:id",
  verifyCourseAccess,
  courseController.getCourseById
);

// Rutas que requieren permisos de administrador
router.post("/create", verifyToken, courseController.createCourse);
router.get("/all", verifyToken, courseController.getAllCourses);
router.get("/:id", verifyToken, courseController.getCourseById);
router.put("/:id", verifyToken, courseController.updateCourse);
router.delete("/:id", verifyToken, courseController.deleteCourse);
router.post("/enroll", verifyToken, courseController.enrollInCourse);
router.post("/unenroll", verifyToken, courseController.unenrollFromCourse);

export default router;
