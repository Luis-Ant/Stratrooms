function BranchesSkeleton() {
  return (
    <section className="flex flex-col h-full p-20 pt-30 bg-gray-200 dark:bg-gray-900">
      <div className="relative overflow-hidden mx-20 bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
        {/* Header Section Skeleton */}
        <div className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
          {/* Title Skeleton */}
          <div className="h-5 w-32 bg-gray-200 rounded-md dark:bg-gray-700 animate-pulse mb-2"></div>
          {/* Button Skeleton */}
          <div className="h-10 w-36 bg-gray-200 rounded-lg dark:bg-gray-700 animate-pulse"></div>
        </div>

        {/* Table Skeleton */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {/* Table Headers Skeleton (adjust the number based on your columns) */}
                {[...Array(4)].map((_, index) => (
                  <th key={index} scope="col" className="px-6 py-3">
                    <div className="h-3 w-20 bg-gray-200 rounded-md dark:bg-gray-600 animate-pulse"></div>
                  </th>
                ))}
                {/* Actions Header Skeleton */}
                <th scope="col" className="px-6 py-3">
                  <div className="h-3 w-16 bg-gray-200 rounded-md dark:bg-gray-600 animate-pulse"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Table Rows Skeleton (adjust the number based on how many rows you want to show) */}
              {[...Array(5)].map((_, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`bg-white dark:bg-gray-800 ${
                    rowIndex !== 4
                      ? "border-b dark:border-gray-700 border-gray-200"
                      : ""
                  }`}
                >
                  {/* Data Columns Skeleton */}
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    <div className="h-4 w-40 bg-gray-200 rounded-md dark:bg-gray-700 animate-pulse"></div>
                  </th>
                  {[...Array(3)].map((_, colIndex) => (
                    <td key={colIndex} className="px-6 py-4">
                      <div className="h-4 w-16 bg-gray-200 rounded-md dark:bg-gray-700 animate-pulse"></div>
                    </td>
                  ))}
                  {/* Actions Column Skeleton */}
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <div className="h-4 w-8 bg-gray-200 rounded-md dark:bg-gray-700 animate-pulse"></div>
                      <div className="h-4 w-8 bg-gray-200 rounded-md dark:bg-gray-700 animate-pulse"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default BranchesSkeleton;
