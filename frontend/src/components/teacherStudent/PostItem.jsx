import React, { useState } from "react";
import { Edit, Trash2, Send, ChevronDown } from "lucide-react";
import UserAvatar from "../common/UserAvatar.jsx";

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const PostItem = ({
  post,
  user,
  teacher,
  onAddComment,
  onEditPost,
  onDeletePost,
}) => {
  const [commentContent, setCommentContent] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const isTeacher = user.tipoUsuario === "PROFESOR";
  const isAuthor = user.idUsuario === post.author.id;

  const handleAddComment = () => {
    if (commentContent.trim()) {
      onAddComment(post.id, commentContent, user);
      setCommentContent("");
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className="mr-3">
            <UserAvatar user={teacher} size="md" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              {post.author.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatTimestamp(post.timestamp)}
            </p>
          </div>
        </div>
        {isTeacher &&
          isAuthor && ( // Only show options if teacher and post author
            <div className="relative">
              <button
                onClick={() => setShowOptions(!showOptions)}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <ChevronDown className="h-5 w-5" />
              </button>
              {showOptions && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-10">
                  <button
                    onClick={() => {
                      onEditPost(post.id);
                      setShowOptions(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg"
                  >
                    <Edit className="h-4 w-4 mr-2" /> Edit Post
                  </button>
                  <button
                    onClick={() => {
                      onDeletePost(post.id);
                      setShowOptions(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-800 rounded-b-lg"
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> Delete Post
                  </button>
                </div>
              )}
            </div>
          )}
      </div>

      <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
        {post.content}
      </p>

      {/* Comments Section */}
      <div className="mt-4 border-t border-gray-200 dark:border-gray-600 pt-3 space-y-2">
        <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">
          Comments ({post.comments.length})
        </h4>
        {post.comments.map((comment) => (
          <div
            key={comment.id}
            className="flex items-start space-x-3 bg-gray-100 dark:bg-gray-600 p-3 rounded-lg"
          >
            {comment.author.name === user.nombreUsuario ? (
              <UserAvatar user={user} size="md" />
            ) : (
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-200 dark:bg-green-600 flex items-center justify-center text-green-800 dark:text-green-100 text-sm font-bold">
                {comment.author.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-200">
                {comment.author.name}{" "}
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                  {formatTimestamp(comment.timestamp)}
                </span>
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {comment.content}
              </p>
            </div>
          </div>
        ))}

        {/* New Comment Input */}
        <div className="flex items-center mt-3">
          <textarea
            className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 resize-none"
            rows="1"
            placeholder="Add a comment..."
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          ></textarea>
          <button
            onClick={handleAddComment}
            className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Send comment"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
