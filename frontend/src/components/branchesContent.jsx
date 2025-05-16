import React from "react";
import plusIcon from "../assets/icons/plusIcon.svg";
import home from "../assets/icons/home.svg";
import edit from "../assets/icons/edit.svg"
import trash from "../assets/icons/trash-bin.svg"

function BranchesContent() {
  return (
    // Navegación del usuario
<div className="p-2 w-full min-h-screen bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <img className="w-5 h-5 mr-2" src={home} alt="home"/>
          <div className="flex items-center">
            <a href="/" className="text-gray-600 hover:text-gray-800">
              Home
            </a>
            <span className="mx-2 text-gray-600">&gt;</span>
            <span className="text-gray-800">Branches</span>
          </div>
        </div>
        <button className="flex items-center bg-blue-300 hover:bg-blue-400 text-black-900 py-2 px-4 rounded-lg">
        <img className="w-5 h-5 mr-2" src={plusIcon} alt="plusIcon"/>
          Add branch
        </button>
      </div>

      {/* Tabla de Sucursales */}
      <div className="border rounded-md overflow-hidden">
        {/* Encabezado de la Tabla */}
        <div className="grid grid-cols-4 bg-white border-b border-black-500 p-5">
          <div className="text-gray-700 text-center">image</div>
          <div className="text-gray-700 text-center">headquarters</div>
          <div className="text-gray-700 text-center">direction</div>
          <div className="text-gray-700 text-center">actions</div>
        </div>

        {/* Elementos de la Tabla */}
        <div className="border-b">
          <div className="grid grid-cols-4 items-center p-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gray-200" ></div> {/*Aquí va la imagen */}
            </div>
            <div className="text-gray-800 text-center">headquarters1</div>
            <div className="text-gray-800 text-center">direction complete</div>
            <div className="flex justify-end gap-2">
            <button className="bg-indigo-400 hover:bg-indigo-500 text-black py-2 px-8 rounded-full flex items-center">
              <img className="w-5 h-5 mr-[2px]" src={edit} alt="edit"/>
                Edit
              </button>
              <button className="bg-red-400 hover:bg-red-500 text-black py-2 px-6 rounded-full flex items-center">
              <img className="w-5 h-5 mr-[2px]" src={trash} alt="trash"/>
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="border-b">
          <div className="grid grid-cols-4 items-center p-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gray-200"></div>  {/*Aquí va la imagen */}
            </div>
            <div className="text-gray-800 text-center">headquarters2</div>
            <div className="text-gray-800 text-center">direction complete</div>
            <div className="flex justify-end gap-2">
            <button className="bg-indigo-400 hover:bg-indigo-500 text-black py-2 px-8 rounded-full flex items-center">
              <img className="w-5 h-5 mr-[2px]" src={edit} alt="edit"/>
                Edit
              </button>
              <button className="bg-red-400 hover:bg-red-500 text-black py-2 px-6 rounded-full flex items-center">
              <img className="w-5 h-5 mr-[2px]" src={trash} alt="trash"/>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BranchesContent;
