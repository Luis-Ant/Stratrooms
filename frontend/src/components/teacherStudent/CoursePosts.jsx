import { useEffect, useState } from "react";
import NewPostForm from "../teacher/NewPostForm.jsx";
import PostItem from "../teacherStudent/PostItem.jsx";

const CoursePosts = ({ course, user }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts([
      {
        id: "p1",
        author: {
          id: user.idUsuario,
          name: user.nombreUsuario,
          role: user.tipoUsuario,
        },
        content:
          "Welcome to the Advanced React Course! Here we will post important announcements and materials. Hope you enjoy learning!",
        timestamp: "2024-05-30T10:00:00Z",
        comments: [
          {
            id: "c1",
            author: { id: "alumno1", name: "Student Ana", role: "student" },
            content: "Thank you, professor! I'm excited to start.",
            timestamp: "2024-05-30T10:05:00Z",
          },
          {
            id: "c2",
            author: {
              id: user.idUsuario,
              name: user.nombreUsuario,
              role: user.tipoUsuario,
            },
            content: "You're welcome, Ana. Let's study!",
            timestamp: "2024-05-30T10:10:00Z",
          },
        ],
      },
      {
        id: "p2",
        author: {
          id: user.idUsuario,
          name: user.nombreUsuario,
          role: user.tipoUsuario,
        },
        content:
          "New material available in the 'Course Materials' section: Advanced Components and Custom Hooks. Don't forget to check it out!",
        timestamp: "2024-06-01T14:30:00Z",
        comments: [
          {
            id: "c3",
            author: { id: "alumno2", name: "Student Carlos", role: "student" },
            content:
              "Professor, could you clarify a bit more about Custom Hooks?",
            timestamp: "2024-06-01T15:00:00Z",
          },
        ],
      },
      {
        id: "p3",
        author: {
          id: user.idUsuario,
          name: user.nombreUsuario,
          role: user.tipoUsuario,
        },
        content:
          "Reminder: The deadline for the final project submission is June 15th. Don't leave everything for the last moment!",
        timestamp: "2024-06-03T09:00:00Z",
        comments: [],
      },
    ]);
  }, [course]);

  const handleAddPost = (content) => {
    const newPost = {
      id: `p${Date.now()}`,
      author: {
        id: user.idUsuario,
        name: user.nombreUsuario,
        role: user.tipoUsuario,
      },
      content,
      timestamp: new Date().toISOString(),
      comments: [],
    };
    setPosts([newPost, ...posts]);
  };

  const handleAddComment = (postId, commentContent) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const newComment = {
            id: `c${Date.now()}`,
            author: {
              id: user.idUsuario,
              name: user.nombreUsuario,
              role: user.tipoUsuario,
            },
            content: commentContent,
            timestamp: new Date().toISOString(),
          };
          return { ...post, comments: [...post.comments, newComment] };
        }
        return post;
      })
    );
  };

  const handleEditPost = (postId) => {
    // TODO: En una aplicación real, esto abriría un modal o navegaría a una página de edición.
    // Usamos prompt para demostración, pero DEBES reemplazarlo con un modal personalizado.
    const currentContent = posts.find((p) => p.id === postId)?.content || "";
    const newContent = window.prompt("Edit post content:", currentContent);
    if (newContent !== null) {
      // Si el usuario no canceló el prompt
      setPosts(
        posts.map((post) =>
          post.id === postId ? { ...post, content: newContent } : post
        )
      );
      // TODO: Llama a tu servicio para actualizar la publicación en el backend
      console.log(`Publicación ${postId} actualizada a:`, newContent);
    }
  };

  const handleDeletePost = (postId) => {
    // TODO: In a real application, this would open a custom confirmation modal.
    // We use window.confirm for demonstration, but you MUST replace it.
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((post) => post.id !== postId));
      // TODO: Call your service to delete the post from the backend
      console.log(`Post ${postId} deleted.`);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Left Column: Upcoming Submissions */}
      <div className="w-full md:w-1/4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 h-fit">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Upcoming Submissions
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          You have no tasks for this week.
        </p>
        <a
          href="#"
          className="text-blue-500 dark:text-blue-400 hover:underline text-sm"
        >
          View all
        </a>
      </div>

      {/* Right Column: Posts Section */}
      <div className="w-full md:w-3/4 space-y-6">
        {/* New Post Area (Only if current user is a teacher) */}
        {user.tipoUsuario === "PROFESOR" && (
          <NewPostForm onAddPost={handleAddPost} user={course.Usuario} />
        )}

        {/* Posts List */}
        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostItem
                key={post.id}
                post={post}
                user={course.Usuario}
                onAddComment={handleAddComment}
                onEditPost={handleEditPost}
                onDeletePost={handleDeletePost}
              />
            ))
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
              No posts yet. Be the first to post!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePosts;
