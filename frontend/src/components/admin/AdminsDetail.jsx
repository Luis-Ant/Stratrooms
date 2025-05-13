const AdminsDetail = ({ admins }) => {
  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Administrators
      </h2>
      {admins && admins.length > 0 ? (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="p-3 text-gray-800 dark:text-white">Name</th>
              <th className="p-3 text-gray-800 dark:text-white">Email</th>
              <th className="p-3 text-gray-800 dark:text-white">Role</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr
                key={index}
                className="border-b border-gray-300 dark:border-gray-700"
              >
                <td className="p-3 text-gray-700 dark:text-gray-300">
                  {admin.name}
                </td>
                <td className="p-3 text-gray-700 dark:text-gray-300">
                  {admin.email}
                </td>
                <td className="p-3 text-gray-700 dark:text-gray-300">
                  {admin.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-700 dark:text-gray-300">
          No administrators found.
        </p>
      )}
    </div>
  );
};

export default AdminsDetail;
