import React from "react";
import { Link, useLocation } from "react-router-dom";

const pathNameMap = {
  "": { name: "Home", link: "/" },
  branches: { name: "Branches", link: "/branches" },
  subjects: { name: "Subjects", link: "/subjects" },
  admins: { name: "Admins", link: "/admins" },
  teachers: { name: "Teachers", link: "/teachers" },
  students: { name: "Students", link: "/students" },
  groups: { name: "Groups", link: "/groups" },
};

function Breadcrumb() {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  const crumbs = [""].concat(segments);

  return (
    <nav
      className="flex w-auto h-14 bg-gray-100 dark:bg-gray-950"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {crumbs.map((seg, idx) => {
          const isLast = idx === crumbs.length - 1;
          const { name, link } = pathNameMap[seg] || {
            name: seg.charAt(0).toUpperCase() + seg.slice(1),
          };
          const to = idx === 0 ? "/" : "/" + crumbs.slice(1, idx + 1).join("/");

          // Elemento home
          if (idx === 0) {
            return (
              <li key={seg} className="pl-10 inline-flex items-center ">
                {link && !isLast ? (
                  <Link
                    to={to}
                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-400 dark:text-gray-300 dark:hover:text-primary-400"
                  >
                    <svg
                      className="w-4 h-4 me-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    {name}
                  </Link>
                ) : (
                  <span className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    <svg
                      className="w-4 h-4 me-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    {name}
                  </span>
                )}
              </li>
            );
          }

          // Separador + items posteriores
          return (
            <li key={seg} aria-current={isLast ? "page" : undefined}>
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                {link && !isLast ? (
                  <Link
                    to={to}
                    className="ms-1 text-sm font-medium text-gray-700 hover:text-primary-400 dark:text-gray-300 dark:hover:text-primary-400"
                  >
                    {name}
                  </Link>
                ) : (
                  <span
                    className={`ms-1 text-sm font-medium ${
                      isLast
                        ? "text-gray-700 dark:text-gray-300"
                        : " text-gray-700 hover:text-primary-400 dark:text-gray-300 dark:hover:text-primary-400"
                    } md:ms-2 dark:text-gray-400`}
                  >
                    {name}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
