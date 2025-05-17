import React from "react";
import { AvatarCell } from "../components/common/UserAvatar.jsx";
import { formatDate } from "../utils/dateUtils";
import Icon from "../components/home/Icon";

// Columna de fecha de creación
const createdAtColumn = {
  header: "Created At",
  accessor: "createdAt",
  render: (row) => (
    <div className="flex justify-center">
      <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-cyan-900 text-cyan-200">
        <Icon name="calendar" className="w-3 h-3 mr-1" />
        {formatDate(row.createdAt)}
      </span>
    </div>
  ),
};

/**
 * Configuración de columnas base para usuarios
 */
export const baseUserColumns = [
  {
    header: "Avatar",
    accessor: "avatar",
    render: (user) => <AvatarCell teacher={user} />,
  },
  { header: "Name", accessor: "nombreUsuario" },
  { header: "Last Name", accessor: "apllPatUsuario" },
  { header: "Email", accessor: "email" },
];

/**
 * Configuración de columnas para profesores
 */
export const teacherColumns = [
  ...baseUserColumns,
  { header: "Branch", accessor: "branchName" },
  createdAtColumn,
];

/**
 * Configuración de columnas para administradores
 */
export const adminColumns = [...baseUserColumns, createdAtColumn];

/**
 * Configuración de columnas para estudiantes
 */
export const studentColumns = [
  ...baseUserColumns,
  { header: "Branch", accessor: "branchName" },
  createdAtColumn,
];

export const branchColumns = [
  { header: "Branch", accessor: "nombreSede" },
  { header: "Address", accessor: "direccionSede" },
  { header: "Phone", accessor: "telefonoSede" },
  { header: "Email", accessor: "emailSede" },
];

export const subjectColumns = [
  { header: "Subject", accessor: "nombreMateria" },
  { header: "Description", accessor: "descripcionMateria" },
];

export const courseColumns = [
  { header: "Course", accessor: "nombreCurso" },
  { header: "Description", accessor: "descripcionCurso" },
  { header: "Subject", accessor: "nombreMateria" },
  { header: "Branch", accessor: "nombreSede" },
  createdAtColumn,
];
