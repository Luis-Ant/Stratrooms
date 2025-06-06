import React from "react";

export default function TeacherGroupDetailSkeleton() {
  return (
    <section className="flex h-full py-20 bg-gray-200 dark:bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto">
        <section className="flex h-full flex-col">
          {/* Hero Banner Skeleton */}
          <div className="relative w-full h-40 md:h-50 lg:h-65 rounded-xl overflow-hidden bg-gray-300 dark:bg-gray-700 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6 flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gray-400 dark:bg-gray-600 animate-pulse"></div>
              <div>
                <div className="h-6 w-48 bg-gray-400 dark:bg-gray-600 rounded mb-2 animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-400 dark:bg-gray-600 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Main Content Area Skeleton */}
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12 py-8 w-full relative z-10">
            {/* Tabs Navigation Skeleton */}
            <div className="flex space-x-4 border-b border-gray-300 dark:border-gray-700 pb-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
                ></div>
              ))}
            </div>

            {/* Tab Content Skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mt-6">
              {/* Common content (e.g., for posts or a generic section) */}
              <div className="space-y-4">
                <div className="h-8 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>

                {/* List items (e.g., posts, classwork items, or people items) */}
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-4 py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                    <div>
                      <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-1 animate-pulse"></div>
                      <div className="h-3 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
