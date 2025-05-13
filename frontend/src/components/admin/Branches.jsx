import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext.jsx";
import { useNotification } from "../../context/NotificationContext.jsx";
import * as yup from "yup";
import {
  getAllBranches,
  createBranch,
  updateBranch,
  deleteBranch,
} from "../../services/sedeService.js";
import { TableContent } from "./tableContent.jsx";
import ReusableForm from "../forms/ReusableForm.jsx";
import ConfirmationAlert from "../alerts/ConfirmationAlert.jsx";
import BranchesSkeleton from "./BranchesSkeleton.jsx";
import ErrorContent from "../error/errorContent.jsx";
import Icon from "../home/Icon.jsx";

function BranchesContent() {
  const { user } = useContext(AuthContext);
  const { showNotification } = useNotification();
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState(null);

  const branchValidationSchema = yup.object().shape({
    nombreSede: yup.string().required("El nombre de la sede es obligatorio."),
    direccionSede: yup
      .string()
      .required("La dirección de la sede es obligatoria."),
    telefonoSede: yup.string().matches(/^\+\d{2}\s\d{8,10}$/, {
      message: "Formato de teléfono inválido (ej: +XX XXXXXXXXXX).",
      excludeEmptyString: true,
    }),
    emailSede: yup
      .string()
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Formato de correo electrónico inválido."
      )
      .required("El correo electrónico es obligatorio."),
  });

  useEffect(() => {
    const fetchBranches = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllBranches();
        setBranches(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBranches();
  }, []);

  const handleAdd = () => {
    setEditingBranch(null);
    setFormValues({});
    setFormErrors({});
    setIsFormVisible(true);
  };

  const handleEdit = (branchData) => {
    setEditingBranch(branchData);
    setFormValues(branchData);
    setFormErrors({});
    setIsFormVisible(true);
  };

  const validateField = async (name, value) => {
    try {
      await yup.reach(branchValidationSchema, name).validate(value);
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    } catch (error) {
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
    }
  };

  const handleInputChange = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleInputBlur = (event) => {
    const { name, value } = event.target;
    validateField(name, value);
  };

  const validateForm = async (data) => {
    try {
      await branchValidationSchema.validate(data, { abortEarly: false });
      return {};
    } catch (error) {
      const errors = {};
      error.inner.forEach((err) => {
        errors[err.path] = err.message;
      });
      return errors;
    }
  };

  const handleFormSubmit = async () => {
    const errors = await validateForm(formValues);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    try {
      setLoading(true);
      if (editingBranch) {
        const updatedBranchResponse = await updateBranch(
          editingBranch.idSede,
          formValues
        );
        const updatedBranchData = updatedBranchResponse.updatedBranch;
        setBranches((prevBranches) =>
          prevBranches.map((branch) =>
            branch.idSede === updatedBranchData.idSede
              ? { ...branch, ...updatedBranchData }
              : branch
          )
        );
        showNotification("success", "Branch update successfully.");
      } else {
        const response = await createBranch(formValues);
        const newBranch = response.newBranch;
        setBranches((prevBranches) => [...prevBranches, newBranch]);
        showNotification("success", "Branch created successfully.");
      }
      setIsFormVisible(false);
      setEditingBranch(null);
      setFormValues({});
      setFormErrors({});
    } catch (err) {
      showNotification("error", "Failed to save branch. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormClose = () => {
    setIsFormVisible(false);
    setEditingBranch(null);
    setFormValues({});
    setFormErrors({});
  };

  const handleDeleteClick = (branchToDelete) => {
    setBranchToDelete(branchToDelete);
    setIsConfirmationOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsConfirmationOpen(false);
    if (branchToDelete) {
      try {
        setLoading(true);
        await deleteBranch(branchToDelete.idSede);
        setBranches(
          branches.filter((branch) => branch.idSede !== branchToDelete.idSede)
        );
        showNotification("success", "Branch deleted successfully.");
        setBranchToDelete(null);
        setIsFormVisible(false);
      } catch (err) {
        showNotification("error", "Failed to delete branch. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmationOpen(false);
    setBranchToDelete(null);
  };

  const columns = [
    { header: "Name", accessor: "nombreSede" },
    { header: "Address", accessor: "direccionSede" },
    { header: "Phone", accessor: "telefonoSede" },
    { header: "Email", accessor: "emailSede" },
  ];

  const formFields = [
    {
      label: "Name",
      key: "nombreSede",
      type: "text",
      placeholder: "Branch name",
      required: true,
      icon: (
        <Icon
          name="branch"
          className="w-6 h-6 text-gray-500 dark:text-gray-400"
        />
      ),
    },
    {
      label: "Address",
      key: "direccionSede",
      type: "text",
      placeholder: "Full address",
      required: true,
      icon: (
        <Icon
          name="address"
          className="w-5 h-5 text-gray-500 dark:text-gray-400"
        />
      ),
    },
    {
      label: "Phone",
      key: "telefonoSede",
      type: "tel",
      placeholder: "+52 123-456-7890",
      icon: (
        <Icon
          name="phone"
          className="w-5 h-5 text-gray-500 dark:text-gray-400"
        />
      ),
    },
    {
      label: "Email",
      key: "emailSede",
      type: "email",
      placeholder: "name@stratrooms.com",
      icon: (
        <Icon
          name="email"
          className="w-5 h-5 text-gray-500 dark:text-gray-400"
        />
      ),
    },
  ];

  if (error) {
    return <ErrorContent />;
  }

  return (
    <>
      {loading ? (
        <BranchesSkeleton />
      ) : (
        <TableContent
          title="Branches"
          data={branches}
          columns={columns}
          onAdd={handleAdd}
          onEdit={handleEdit}
        />
      )}
      {isFormVisible && (
        <ReusableForm
          title={editingBranch ? "Edit Branch" : "Add New Branch"}
          fields={formFields}
          initialValues={formValues}
          onSubmit={handleFormSubmit}
          errors={formErrors}
          onClose={handleFormClose}
          onDelete={handleDeleteClick}
          isVisible={isFormVisible}
          editingBranch={editingBranch}
          onInputChange={handleInputChange}
          onBlur={handleInputBlur}
        />
      )}
      {isConfirmationOpen && (
        <ConfirmationAlert
          isOpen={isConfirmationOpen}
          onCancel={handleCancelDelete}
          onDelete={handleConfirmDelete}
          username={user.nombreUsuario}
          type={"branch"}
          message={branchToDelete?.nombreSede || "Sede"}
        />
      )}
    </>
  );
}

export default BranchesContent;
