import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext.jsx";
import { useParams } from "react-router-dom";
import { getMyCourseById } from "../../services/courseService.js";
import { getAllStudents } from "../../services/studentService";
import ErrorContent from "../error/errorContent";
import { HeroBanner } from "../teacherStudent/HeroBanner.jsx";
import { Tabs } from "../teacherStudent/Tabs.jsx";
import CoursePosts from "../teacherStudent/CoursePosts.jsx";
import ClassworkSection from "../teacherStudent/ClassworkSection.jsx";
import PersonListItem from "../teacherStudent/PersonListItem.jsx";
import SchoolGrades from "../teacher/SchoolGrades.jsx";
import TeacherGroupDetailSkeleton from "../loading/TeacherGroupDetailSkeleton.jsx";

export default function TeacherGroupDetail() {
  const { user } = useContext(AuthContext);
  const { groupId } = useParams();
  const [course, setCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("post");

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fetch course details
        const courseData = await getMyCourseById(groupId);
        setCourse(courseData);
        // Fetch data for each tab (you might want to lazy load these based on activeTab)
        const studentsData = await getAllStudents();
        setStudents(studentsData);
      } catch (err) {
        console.error("Error fetching group details:", err);
        setError(
          err.response?.data?.message ||
            "Error al cargar los detalles del grupo. Por favor, intenta de nuevo."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGroupDetails();
  }, [groupId]);

  useEffect(() => {
    if (course && students.length > 0) {
      const enrolledStudentIds = new Set(
        course.Inscripcions.map((inscripcion) => inscripcion.idAlumno)
      );

      const filtered = students.filter((student) =>
        enrolledStudentIds.has(student.idUsuario)
      );
      setEnrolledStudents(filtered);
    }
  }, [course, students]);

  // Handlers for SchoolGrades component
  const handleExportGrades = () => {
    // Lógica para exportar calificaciones (ej. a CSV)
    console.log("Exporting grades for course:", course.nombreCurso);
    // You would typically generate a CSV/Excel file here from enrolledStudents and their grades
  };

  const handleOpenStudentFile = (studentId) => {
    // Lógica para abrir el expediente/perfil del alumno
    console.log(`Opening file for student ID: ${studentId}`);
    // Navigate to student profile page or open a modal
  };

  const handleMessageStudent = (studentId) => {
    // Lógica para enviar mensaje al alumno
    console.log(`Messaging student ID: ${studentId}`);
    // Open a chat/message modal or navigate to a chat page
  };

  // Define las pestañas para el componente Tabs
  const tabs = [
    { id: "post", label: "Posts" },
    { id: "classwork", label: "Class Work" },
    { id: "people", label: "People" },
    { id: "schoolgrades", label: "School Grades" },
  ];

  if (loading) {
    return <TeacherGroupDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="py-20 bg-gray-200 dark:bg-gray-900 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12 py-8">
          <ErrorContent message={error} />
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="py-20 bg-gray-200 dark:bg-gray-900 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12 py-8">
          <ErrorContent message="Course not found." />
        </div>
      </div>
    );
  }

  return (
    <section className="flex h-full py-20 bg-gray-200 dark:bg-gray-900">
      <div className="w-full max-w-screen-xl px-4 mx-auto">
        <section className="flex h-full flex-col">
          {/* Hero Banner Section */}
          <HeroBanner
            imageUrl={
              course.imagenCurso ||
              "https://images.pexels.com/photos/247839/pexels-photo-247839.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            title={course.nombreCurso}
            teacher={`${course.Usuario?.nombreUsuario || ""} ${
              course.Usuario?.apllPatUsuario || ""
            }`}
            user={course.Usuario}
          />
          {/* Main Content Area */}
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12 py-8 w-full relative z-10">
            {/* Tabs Navigation */}
            <Tabs
              tabs={tabs}
              activeTabId={activeTab}
              onTabChange={setActiveTab}
            />
            {/* Tab Content */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mt-6">
              {activeTab === "post" && (
                <CoursePosts course={course} user={user} />
              )}
              {activeTab === "classwork" && (
                <ClassworkSection course={course} user={user} />
              )}

              {activeTab === "people" && (
                <div className="space-y-6">
                  {/* Teachers Section */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white pb-2 border-b border-gray-200 dark:border-gray-700">
                    Teachers
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {course.Usuario ? (
                      <PersonListItem user={course.Usuario} />
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">
                        No teacher assigned to this group.
                      </p>
                    )}
                  </div>
                  {/* Students Section */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                    Students
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {enrolledStudents.length > 0 ? (
                      enrolledStudents.map((student) => (
                        <PersonListItem
                          key={student.idUsuario}
                          user={student}
                        />
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">
                        No students assigned to this group yet.
                      </p>
                    )}
                  </div>
                </div>
              )}
              {activeTab === "schoolgrades" && (
                <SchoolGrades
                  enrolledStudents={enrolledStudents}
                  user={user}
                  onExportGrades={handleExportGrades}
                  onOpenStudentFile={handleOpenStudentFile}
                  onMessageStudent={handleMessageStudent}
                />
              )}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
