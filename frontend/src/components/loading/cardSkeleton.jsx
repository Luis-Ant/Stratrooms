import React from "react";

export function CardSkeleton() {
  return (
    <div
      className="rounded-2xl overflow-hidden shadow-md bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 w-full max-w-md animate-pulse" // Added animate-pulse
    >
      <div className="relative">
        {/* Top section: Mimics the image and text area */}
        <div className="max-h-40 p-6 overflow-hidden relative bg-gray-300 dark:bg-gray-700">
          <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-2"></div>{" "}
          {/* Placeholder for title */}
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>{" "}
          {/* Placeholder for teacher */}
        </div>

        {/* UserAvatar placeholder */}
        <div
          className="absolute right-5 transform -translate-y-1/2"
          style={{ top: "35%" }}
        >
          <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-700"></div>{" "}
          {/* Mimics UserAvatar size "xxl" */}
        </div>

        {/* Bottom section: Mimics description and details */}
        <div className="p-5 items-end pt-12">
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full mb-2"></div>{" "}
          {/* Placeholder for description line 1 */}
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-5/6 mb-8"></div>{" "}
          {/* Placeholder for description line 2 */}
          <div className="flex mb-2 text-sm">
            <div className="w-4 h-4 bg-gray-200 dark:bg-gray-600 rounded mr-3"></div>{" "}
            {/* Icon placeholder */}
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-24"></div>{" "}
            {/* Location placeholder */}
          </div>
          <div className="flex mb-2 text-sm">
            <div className="w-4 h-4 bg-gray-200 dark:bg-gray-600 rounded mr-3"></div>{" "}
            {/* Icon placeholder */}
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-32"></div>{" "}
            {/* Students placeholder */}
          </div>
        </div>
      </div>
    </div>
  );
}
