import React, { useState } from 'react';
import CourseContent from './CourseContent';

const GroupsContent = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Lista de cursos del profesor (simulando 3 grupos)
  const courses = [
    {
      id: 1,
      nombre: 'Curso de Matemáticas',
      descripcion: 'Grupo de matemáticas para 1er semestre.',
      posts: [],
      classWork: [],
      people: ['Estudiante A', 'Estudiante B', 'Profesor'],
      schoolGrades: { 'Estudiante A': 85, 'Estudiante B': 90 },
      nextDeliveries: 'You don’t have any tasks for this week',
    },
    {
      id: 2,
      nombre: 'Curso de Física',
      descripcion: 'Grupo de física para 2do semestre.',
      posts: [],
      classWork: [],
      people: ['Estudiante C', 'Estudiante D', 'Profesor'],
      schoolGrades: { 'Estudiante C': 78, 'Estudiante D': 92 },
      nextDeliveries: 'Entrega de proyecto el viernes',
    },
    {
      id: 3,
      nombre: 'Curso de Química',
      descripcion: 'Grupo de química para 3er semestre.',
      posts: [],
      classWork: [],
      people: ['Estudiante E', 'Estudiante F', 'Profesor'],
      schoolGrades: { 'Estudiante E': 88, 'Estudiante F': 95 },
      nextDeliveries: 'Examen final el próximo lunes',
    },
  ];

  if (selectedCourse) {
    return (
      <CourseContent
        course={selectedCourse}
        onBack={() => setSelectedCourse(null)}
      />
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-green-800 mb-4">My Groups</h2>
      {courses.length === 0 ? (
        <div className="text-gray-500">No hay grupos disponibles</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-green-100 p-4 rounded-lg shadow-md hover:bg-green-200 transition cursor-pointer"
              onClick={() => setSelectedCourse(course)}
            >
              <h3 className="text-lg font-semibold text-green-900">
                {course.nombre}
              </h3>
              <p className="text-gray-600">{course.descripcion}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupsContent;