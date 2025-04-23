import React from "react";

function WelcomeContent() {
  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">¡Bienvenido al Dashboard!</h2>
      <p className="text-gray-700">
        Este es el contenido principal cuando no se selecciona otra opción.
      </p>
    </div>
  );
}

export default WelcomeContent;
