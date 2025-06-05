import { motion } from "framer-motion";
import UserAvatar from "../common/UserAvatar.jsx";
import Icon from "../home/Icon.jsx";

export function Card({
  user,
  title,
  teacher,
  description,
  location,
  students,
  handleCourseClick,
  imageUrl,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.09 }}
      whileTap={{ scale: 0.98 }}
      className={
        "rounded-2xl overflow-hidden shadow-md bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 w-full max-w-md flex flex-col"
      }
      onClick={handleCourseClick}
    >
      <div className="relative">
        <div
          className="p-6 overflow-hidden relative"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${imageUrl})')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
            {title}
          </h5>
          <h6 className="mb-2 text-md tracking-tight text-white">{teacher}</h6>
        </div>
        <div className="absolute right-5 transform" style={{ top: "55%" }}>
          <UserAvatar user={user} size="xxl" />
        </div>
      </div>
      <div className="p-5 flex flex-col h-full">
        <p className="my-5 font-medium text-lg text-gray-700 dark:text-gray-300 flex-grow">
          {description}
        </p>
        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col text-sm text-gray-700 dark:text-gray-400">
            <div className="flex items-center mb-2">
              <Icon name="address" className="w-4 h-4" />
              <p className="pl-3">{location}</p>
            </div>
            <div className="flex items-center">
              <Icon name="student" className="w-4 h-4" />
              <p className="pl-3">{students} estudiantes</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
