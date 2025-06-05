import { useState } from "react";

const NewPostForm = ({ onAddPost, user }) => {
  const [postContent, setPostContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postContent.trim()) {
      onAddPost(postContent, user);
      setPostContent("");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Announce something to your class
        </h3>
        <textarea
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 resize-y min-h-[80px]"
          placeholder="Share an announcement, material, or assignment..."
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          rows="3"
        ></textarea>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition duration-200"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPostForm;
