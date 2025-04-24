import React, { useContext } from "react";
import { AuthContext } from "../context/authContext.jsx";
import Logo from "../assets/logo.svg?raw";

const WelcomeContent = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="font-body bg-gray-100 dark:bg-gray-950 flex flex-col items-center justify-center h-screen text-gray-950 dark:text-white">
      <div className="font-body text-6xl font-bold mb-3">
        Welcome{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-primary-800 from-primary-300">
          {user.nombreUsuario}
        </span>
      </div>
      <div className="text-5xl font-semibold mb-28 mt-10">
        meet{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-primary-300 from-primary-800">
          Stratrooms
        </span>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: Logo }}
        className="w-1/5 h-1/5 flex items-center relative text-gray-800 dark:text-white"
        aria-hidden="true"
      />
    </div>
  );
};

export default WelcomeContent;
