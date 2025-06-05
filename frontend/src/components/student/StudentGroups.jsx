import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyCourses } from "../../services/courseService.js";
import { Card } from "../common/card.jsx";
import { CardSkeleton } from "../loading/cardSkeleton.jsx";
import ErrorContent from "../error/errorContent";

export default function TeacherGroups() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const coursesData = await getMyCourses();
        setCourses(coursesData);
      } catch (error) {
        setError(error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleCourseClick = (idCurso) => {
    navigate(`/groups/${idCurso}`);
  };

  if (loading) {
    return (
      <section className="flex h-full py-20 bg-gray-200 dark:bg-gray-900">
        <div className="sm:px-6 py-8 w-full max-w-screen-xl px-4 mx-auto lg:px-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">
            My Groups
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return <ErrorContent message={error.message || `Failed to load Group`} />;
  }

  return (
    <section className="flex h-full py-20 bg-gray-200 dark:bg-gray-900">
      <div className=" sm:px-6 py-8 w-full max-w-screen-xl px-4 mx-auto lg:px-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">
          My Groups
        </h1>

        {courses.length === 0 ? (
          <div className="text-center py-12 animate-in fade-in duration-500">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              You have no courses assigned
            </h3>
            <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
              Please contact your administrator to assign you courses.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <Card
                key={course.idCurso}
                className="group cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-800 animate-in fade-in slide-in-from-bottom-4"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "both",
                }}
                user={course.Usuario}
                title={course.nombreCurso}
                teacher={`${course.Usuario?.nombreUsuario || ""} ${
                  course.Usuario?.apllPatUsuario || ""
                }`}
                description={course.descripcionCurso}
                location={course.Sede?.nombreSede}
                students={course.Inscripcions?.length || 0}
                handleCourseClick={() => handleCourseClick(course.idCurso)}
                imageUrl={
                  course.imagenCurso ||
                  "https://images.pexels.com/photos/247839/pexels-photo-247839.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
