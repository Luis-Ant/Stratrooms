import React from "react";
import UserAvatar from "../common/UserAvatar.jsx";

const PersonListItem = ({ user }) => {
  // Determine the display name (e.g., "Juan Perez")
  const displayName = `${user.nombreUsuario || ""} ${
    user.apllPatUsuario || ""
  }`;

  return (
    <div className="flex items-center space-x-4 bg-white dark:bg-gray-800 rounded-md shadow-sm p-4">
      {/* User Avatar */}
      <UserAvatar user={user} size="md" />
      {/* Username/Name */}
      <div>
        <p className="font-medium text-gray-900 dark:text-white">
          {displayName}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
      </div>
    </div>
  );
};

export default PersonListItem;
