import db from "../config/database.js";
const { Usuario, Curso, Inscripcion, Materia, Sede } = db;

const courseService = {
  // Crear nuevo curso
  createCourse: async (data) => {
    try {
      const profesor = await Usuario.findOne({
        where: {
          idUsuario: data.idProfesor,
          tipoUsuario: "PROFESOR",
        },
      });

      if (!profesor) {
        throw new Error("Profesor no encontrado o no es un profesor válido");
      }

      const newCourse = await Curso.create({
        idMateria: data.idMateria,
        idProfesor: data.idProfesor,
        idSede: data.idSede,
        nombreCurso: data.nombreCurso,
        descripcionCurso: data.descripcionCurso,
      });

      return await Curso.findByPk(newCourse.idCurso, {
        include: [
          { model: Materia },
          { model: Usuario },
          { model: Sede },
          { model: Inscripcion },
        ],
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },
  // Obtener todos los cursos
  getAllCourses: async () => {
    try {
      const courses = await Curso.findAll({
        include: [
          { model: Materia },
          { model: Usuario },
          { model: Sede },
          { model: Inscripcion },
        ],
      });
      return courses;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  // Obtener un curso por ID
  getCourseById: async (id) => {
    try {
      const course = await Curso.findByPk(id, {
        include: [
          { model: Materia },
          { model: Usuario },
          { model: Sede },
          { model: Inscripcion },
        ],
      });
      if (!course) {
        throw new Error("Curso no encontrado");
      }
      return course;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  // Actualizar un curso
  updateCourse: async (id, data) => {
    try {
      const profesor = await Usuario.findOne({
        where: {
          idUsuario: data.idProfesor,
          tipoUsuario: "PROFESOR",
        },
      });
      if (!profesor) {
        throw new Error("Profesor no encontrado o no es un profesor válido");
      }

      if (profesor.idUsuario !== data.idProfesor) {
        data.idProfesor = profesor.idUsuario;
      }

      const course = await Curso.findByPk(id);
      if (!course) {
        throw new Error("Curso no encontrado");
      }
      await course.update(data);

      return await Curso.findByPk(id, {
        include: [
          { model: Materia },
          { model: Usuario },
          { model: Sede },
          { model: Inscripcion },
        ],
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },
  // Eliminar un curso
  deleteCourse: async (id) => {
    try {
      const course = await Curso.findByPk(id);
      if (!course) {
        throw new Error("Curso no encontrado");
      }
      await course.destroy();
      return { message: "Curso eliminado con éxito" };
    } catch (error) {
      throw new Error(error.message);
    }
  },
  // Inscribirse en un curso
  enrollInCourse: async (data) => {
    try {
      const student = await Usuario.findOne({
        where: {
          idUsuario: data.idUsuario,
          tipoUsuario: "ALUMNO",
        },
      });

      if (!student) {
        throw new Error("El usuario no es un alumno válido");
      }

      const existingEnrollment = await Inscripcion.findOne({
        where: {
          idCurso: data.idCurso,
          idAlumno: data.idUsuario,
        },
      });

      if (existingEnrollment) {
        throw new Error("El usuario ya está inscrito en este curso");
      }

      const enrollment = await Inscripcion.create({
        idCurso: data.idCurso,
        idAlumno: data.idUsuario,
      });

      const course = await Curso.findByPk(data.idCurso, {
        include: [
          { model: Materia },
          { model: Usuario },
          { model: Sede },
          { model: Inscripcion },
        ],
      });

      return course;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  // Desinscribirse de un curso
  unenrollFromCourse: async (data) => {
    try {
      const enrollment = await Inscripcion.findOne({
        where: {
          idCurso: data.idCurso,
          idAlumno: data.idUsuario,
        },
      });
      if (!enrollment) {
        throw new Error("El usuario no está inscrito en este curso");
      }
      await enrollment.destroy();

      const course = await Curso.findByPk(data.idCurso, {
        include: [
          { model: Materia },
          { model: Usuario },
          { model: Sede },
          { model: Inscripcion },
        ],
      });

      return course;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  // Obtener cursos del usuario
  getMyCourses: async (userId, userType) => {
    try {
      let courses;
      if (userType === "ALUMNO") {
        courses = await Inscripcion.findAll({
          where: { idAlumno: userId },
          include: [
            {
              model: Curso,
              include: [
                { model: Materia },
                { model: Usuario },
                { model: Sede },
              ],
            },
          ],
        });
      } else if (userType === "PROFESOR") {
        courses = await Curso.findAll({
          where: { idProfesor: userId },
          include: [
            { model: Materia },
            { model: Usuario },
            { model: Sede },
            { model: Inscripcion },
          ],
        });
      } else {
        throw new Error("Tipo de usuario no válido");
      }
      return courses;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  // Verificar si un usuario está inscrito en un curso
  verifyEnrollment: async (userId, courseId, userType) => {
    try {
      if (userType === "ALUMNO") {
        const enrollment = await Inscripcion.findOne({
          where: {
            idCurso: courseId,
            idAlumno: userId,
          },
        });
        return !!enrollment;
      } else if (userType === "PROFESOR") {
        const course = await Curso.findOne({
          where: {
            idCurso: courseId,
            idProfesor: userId,
          },
        });
        return !!course;
      }
      return false;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default courseService;
