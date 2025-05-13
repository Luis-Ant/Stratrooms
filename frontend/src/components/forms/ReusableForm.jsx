import React from "react";
import { Transition } from "@headlessui/react";
import { useState, useEffect } from "react";
import Icon from "../home/Icon";

const ReusableForm = ({
  title,
  fields,
  initialValues,
  onSubmit,
  onClose,
  onDelete,
  isVisible,
  editingBranch,
  errors: parentErrors,
  onInputChange,
  onBlur,
}) => {
  const [values, setValues] = useState(initialValues || {});
  const [localErrors, setLocalErrors] = useState(parentErrors || {});

  useEffect(() => {
    setValues(initialValues || {});
    setLocalErrors(parentErrors || {});
  }, [initialValues, parentErrors]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    if (onInputChange) {
      onInputChange(name, value);
    }
    setLocalErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleBlur = (event) => {
    if (onBlur) {
      onBlur(event);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(event);
  };

  const handleCloseModal = () => {
    onClose();
  };

  const handleDelete = () => {
    if (onDelete && editingBranch) {
      onDelete(editingBranch);
    }
  };

  const formStyles = {
    maxWidth: "550px",
    minWidth: "300px",
    transform: isVisible
      ? "scale(1) translateY(0)"
      : "scale(0.9) translateY(-10px)",
    opacity: isVisible ? 1 : 0,
  };

  return (
    <Transition.Root show={isVisible} as={React.Fragment}>
      <Transition.Child
        as={React.Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex justify-center items-center transition-opacity"
          onClick={handleCloseModal}
        />
      </Transition.Child>

      <Transition.Child
        as={React.Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enterTo="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex justify-center items-center transition-all duration-200 ease-out">
          <div
            className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 w-full max-w-md transition-all duration-200 ease-out"
            style={formStyles}
          >
            <div className="mt-3 sm:mx-0 sm:mt-0 text-left">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {title}
              </h3>
              <div className="mt-2">
                <form onSubmit={handleSubmit}>
                  {fields.map((field) => (
                    <div key={field.key} className="mb-6">
                      <label
                        htmlFor={field.key}
                        className={`block mb-2 text-sm font-medium ${
                          localErrors[field.key]
                            ? "text-red-700 dark:text-red-500"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {field.label}
                        {field.required && (
                          <span className="text-white font-bold"> *</span>
                        )}
                      </label>
                      <div className="relative">
                        {field.icon && (
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            {field.icon}
                          </div>
                        )}
                        <input
                          type={field.type}
                          id={field.key}
                          name={field.key}
                          className={`bg-gray-50 border ${
                            localErrors[field.key]
                              ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
                              : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                          } text-sm rounded-lg block w-full ${
                            field.icon ? "ps-10" : ""
                          } p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                          placeholder={field.placeholder}
                          value={values[field.key] || ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          aria-invalid={
                            localErrors[field.key] ? "true" : "false"
                          }
                          required={field.required}
                        />
                      </div>
                      {localErrors[field.key] && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                          <span className="font-medium">¡Error!</span>{" "}
                          {localErrors[field.key]}
                        </p>
                      )}
                    </div>
                  ))}
                  <div className="flex justify-between gap-2">
                    {editingBranch && onDelete && (
                      <div className="flex items-center">
                        <button
                          type="button"
                          class="text-red-600 inline-flex items-center font-bold rounded-4xl text-xs hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                          onClick={handleDelete}
                        >
                          <Icon name="trash" className="w-6 h-6 mr-1" />
                          Delete
                        </button>
                      </div>
                    )}
                    <div className="flex justify-end gap-2 items-center">
                      <button
                        type="button"
                        class="py-3 px-5 font-bold text-sm text-gray-900 focus:outline-none bg-white rounded-4xl border border-gray-200 hover:bg-gray-100 hover:text-gray-600 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        onClick={handleCloseModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-4xl py-3 px-7 font-bold text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Transition.Child>
    </Transition.Root>
  );
};

export default ReusableForm;
