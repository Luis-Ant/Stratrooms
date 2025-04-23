import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCourseById } from "../services/courseService.js";

const GroupDetail = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const groupData = await getCourseById(groupId);
        setGroup(groupData);
      } catch (err) {
        setError(err.message || "Error al obtener la información del grupo.");
      } finally {
        setLoading(false);
      }
    };

    fetchGroupDetails();
  }, [groupId]);

  if (loading) {
    return <div className="p-4">Cargando información del grupo...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (!group) {
    return <div className="p-4">Grupo no encontrado.</div>;
  }

  return (
    <div className="bg-indigo-100 p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold text-indigo-700 mb-4">
        {group.nombreCurso}
      </h2>{" "}
      {/* Ajusta según la propiedad del nombre */}
      {group.descripcionCurso && (
        <p className="text-gray-700 mb-2">{group.descripcionCurso}</p>
      )}
      {/* Aquí puedes mostrar más detalles del grupo basados en la información de 'group' */}
      {group.idMateria && (
        <p className="text-gray-700 mb-2">Materia: {group.idMateria}</p>
      )}
      {group.idProfesor && (
        <p className="text-gray-700 mb-2">Profesor: {group.idProfesor}</p>
      )}
    </div>
  );
};

export default GroupDetail;
