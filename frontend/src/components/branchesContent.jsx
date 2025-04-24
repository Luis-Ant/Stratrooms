import React, { useState, useEffect } from "react";
import { TableContent } from "../components/tableContent.jsx";
import { getAllBranches } from "../services/sedeService.js";
import LoadingSpinner from "../components/loadingSpinner.jsx";
import ErrorContent from "../components/errorContent.jsx";

function BranchesContent() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBranches = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllBranches();
        setBranches(response);
      } catch (error) {
        console.error("Error obteniendo sedes:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getBranches();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorContent />;
  }

  const handleAdd = () => console.log("Agregar sede.");
  const handleEdit = (row) => console.log("Editar sede.", row);
  const handleDelete = (row) => console.log("Eliminar sede.", row);

  return (
    <TableContent
      title="Branches"
      data={branches}
      columns={["Name", "Address", "Phone", "eMail"]}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}

export default BranchesContent;
