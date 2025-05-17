import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../../services/courseService";
import { getAllSubjects } from "../../services/subjectsService";
import { getAllTeachers } from "../../services/teacherService";
import { getAllBranches } from "../../services/sedeService";
import { courseColumns } from "../../config/tableColumns";
import CrudContainer from "./CrudContainer";
import Icon from "../home/Icon";
import * as yup from "yup";

function GroupsContent() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);

  const courseValidationSchema = yup.object().shape({
    nombreCurso: yup.string().required("El nombre del curso es requerido"),
    descripcionCurso: yup.string(),
    idMateria: yup.number().required("La materia es requerida"),
    idProfesor: yup.number().required("El profesor es requerido"),
    idSede: yup.number().required("La sede es requerida"),
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [coursesData, subjectsData, teachersData, branchesData] =
          await Promise.all([
            getAllCourses(),
            getAllSubjects(),
            getAllTeachers(),
            getAllBranches(),
          ]);
        setCourses(coursesData);
        setSubjects(subjectsData);
        setTeachers(teachersData);
        setBranches(branchesData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCreate = async (formData) => {
    const response = await createCourse(formData);
    setCourses((prevCourses) => [...prevCourses, response]);
  };

  const handleUpdate = async (course, formData) => {
    const response = await updateCourse(course.idCurso, formData);
    setCourses((prevCourses) =>
      prevCourses.map((c) =>
        c.idCurso === response.idCurso ? { ...c, ...response } : c
      )
    );
  };

  const handleDelete = async (course) => {
    await deleteCourse(course.idCurso);
    setCourses((prevCourses) =>
      prevCourses.filter((c) => c.idCurso !== course.idCurso)
    );
  };

  const handleAdd = () => {
    setEditing(false);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleRowClick = (course) => {
    navigate(`/groups/${course.idCurso}`);
  };

  const formFields = [
    {
      label: "Nombre del Curso",
      key: "nombreCurso",
      type: "text",
      placeholder: "Ingrese el nombre del curso",
      required: true,
      icon: (
        <Icon
          name="class"
          className="w-6 h-6 text-gray-500 dark:text-gray-400"
        />
      ),
    },
    {
      label: "Descripción",
      key: "descripcionCurso",
      type: "textarea",
      placeholder: "Descripción del curso",
      icon: (
        <Icon
          name="description"
          className="w-6 h-6 text-gray-500 dark:text-gray-400"
        />
      ),
    },
    {
      label: "Materia",
      key: "idMateria",
      type: "select",
      options: subjects.map((subject) => ({
        value: subject.idMateria,
        label: subject.nombreMateria,
      })),
      required: true,
      icon: (
        <Icon
          name="subject"
          className="w-6 h-6 text-gray-500 dark:text-gray-400"
        />
      ),
    },
    {
      label: "Profesor",
      key: "idProfesor",
      type: "select",
      options: teachers.map((teacher) => ({
        value: teacher.idUsuario,
        label: `${teacher.nombreUsuario} ${teacher.apllPatUsuario}`,
      })),
      required: true,
      icon: (
        <Icon
          name="person"
          className="w-6 h-6 text-gray-500 dark:text-gray-400"
        />
      ),
    },
    {
      label: "Sede",
      key: "idSede",
      type: "select",
      options: branches.map((branch) => ({
        value: branch.idSede,
        label: branch.nombreSede,
      })),
      required: true,
      icon: (
        <Icon
          name="location_on"
          className="w-6 h-6 text-gray-500 dark:text-gray-400"
        />
      ),
    },
  ];

  return (
    <CrudContainer
      title="Cursos"
      data={courses}
      columns={courseColumns}
      formFields={formFields}
      validationSchema={courseValidationSchema}
      onAdd={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      onRowClick={handleRowClick}
      loading={loading}
      error={error}
      username={user.nombreUsuario}
      entityName="Curso"
      onAddClick={handleAdd}
      onEditClick={handleEdit}
    />
  );
}

export default GroupsContent;
