import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getCourseById,
  enrollInCourse,
  unenrollFromCourse,
} from "../../services/courseService";
import { getAllStudents } from "../../services/studentService";
import { UserPlus, UserMinus } from "lucide-react";

function GroupDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [availableStudents, setAvailableStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEnrollDialog, setShowEnrollDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeTab, setActiveTab] = useState("info");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [courseData, studentsData] = await Promise.all([
          getCourseById(id),
          getAllStudents(),
        ]);
        setCourse(courseData);
        setStudents(studentsData);
        updateAvailableStudents(courseData, studentsData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const updateAvailableStudents = (courseData, allStudents) => {
    const enrolledIds = new Set(
      courseData.Inscripcions.map((insc) => insc.idAlumno)
    );
    setAvailableStudents(
      allStudents.filter((student) => !enrolledIds.has(student.idUsuario))
    );
  };

  const handleEnroll = async () => {
    if (!selectedStudent) return;
    try {
      await enrollInCourse({
        idCurso: course.idCurso,
        idUsuario: selectedStudent,
      });
      const updatedCourse = await getCourseById(id);
      setCourse(updatedCourse);
      updateAvailableStudents(updatedCourse, students);
      setShowEnrollDialog(false);
      setSelectedStudent(null);
    } catch (err) {
      setError(err);
    }
  };

  const handleUnenroll = async (studentId) => {
    try {
      await unenrollFromCourse({
        idCurso: course.idCurso,
        idUsuario: studentId,
      });
      const updatedCourse = await getCourseById(id);
      setCourse(updatedCourse);
      updateAvailableStudents(updatedCourse, students);
    } catch (err) {
      setError(err);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!course) return <div>Curso no encontrado</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{course.nombreCurso}</h1>
        <button
          onClick={() => setShowEnrollDialog(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Inscribir Alumno
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex">
          <button
            className={`py-2 px-4 border-b-2 ${
              activeTab === "info"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("info")}
          >
            Información del Curso
          </button>
          <button
            className={`ml-8 py-2 px-4 border-b-2 ${
              activeTab === "students"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("students")}
          >
            Alumnos Inscritos
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "info" && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Detalles del Curso</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium">Materia</h3>
                <p className="text-gray-600">{course.Materia?.nombreMateria}</p>
              </div>
              <div>
                <h3 className="font-medium">Profesor</h3>
                <p className="text-gray-600">
                  {course.Usuario?.nombreUsuario}{" "}
                  {course.Usuario?.apllPatUsuario}
                </p>
              </div>
              <div>
                <h3 className="font-medium">Sede</h3>
                <p className="text-gray-600">{course.Sede?.nombreSede}</p>
              </div>
              <div>
                <h3 className="font-medium">Descripción</h3>
                <p className="text-gray-600">{course.descripcionCurso}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "students" && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Alumnos Inscritos</h2>
            {course.Inscripcions?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Apellido
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {course.Inscripcions.map((inscripcion) => {
                      const student = students.find(
                        (s) => s.idUsuario === inscripcion.idAlumno
                      );
                      return (
                        <tr key={inscripcion.idInscripcion}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {student?.nombreUsuario}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {student?.apllPatUsuario}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {student?.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => handleUnenroll(student.idUsuario)}
                              className="inline-flex items-center px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                            >
                              <UserMinus className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                No hay alumnos inscritos en este curso
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal de Inscripción */}
      {showEnrollDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Inscribir Alumno</h2>
            <p className="text-gray-600 mb-4">
              Selecciona un alumno para inscribir en el curso
            </p>
            <select
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              value={selectedStudent || ""}
              onChange={(e) => setSelectedStudent(e.target.value)}
            >
              <option value="">Selecciona un alumno</option>
              {availableStudents.map((student) => (
                <option key={student.idUsuario} value={student.idUsuario}>
                  {student.nombreUsuario} {student.apllPatUsuario}
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                onClick={() => setShowEnrollDialog(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                onClick={handleEnroll}
                disabled={!selectedStudent}
              >
                Inscribir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GroupDetail;
