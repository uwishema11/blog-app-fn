import { useState, useEffect } from "react";
import CommentsSection from "./CommentView";
import axios from "axios";

const DEFAULT_IMAGE_URL = "https://via.placeholder.com/300"; // Placeholder image URL
const path = process.env.REACT_APP_APP_URL; 

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    axios
      .get(`${path}/api/blogs`)
      .then((response) => {
        setPosts(response.data.result.data);
      })
      .catch((error) => console.error(`Error fetching posts: ${error}`));
  }, [path]);

  const handleReadMore = (postId) => {
    axios
      .get(`${path}/api/blogs/${postId}`)
      .then((response) => {
        setSelectedPost(response.data.result.data);
      })
      .catch((error) => console.error(`Error fetching post: ${error}`));
  };

  const handleCommentAdded = () => {
    // Optionally, fetch comments again to update the list
    axios
      .get(`${path}/api/blogs/${selectedPost.id}`)
      .then((response) => {
        setSelectedPost(response.data.result.data);
      })
      .catch((error) => console.error(`Error fetching post: ${error}`));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {!selectedPost ? (
        <>
          <h2 className="mb-6 text-3xl font-bold">Blog Posts</h2>
          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="overflow-hidden rounded-lg bg-white shadow-md"
              >
                <img
                  src={post.image || DEFAULT_IMAGE_URL}
                  alt={post.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="mb-2 text-xl font-semibold">{post.title}</h3>
                  <p className="text-gray-700">
                    {post.content.slice(0, 100)}...
                  </p>
                  <button
                    onClick={() => handleReadMore(post.id)}
                    className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="mx-4 max-w-lg rounded-lg bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-2xl font-bold">{selectedPost.title}</h3>
          <img
            src={selectedPost.image || DEFAULT_IMAGE_URL}
            alt={selectedPost.title}
            className="mb-4 h-48 w-full object-cover"
          />
          <p className="mb-4 text-gray-700">{selectedPost.content}</p>
          <CommentsSection
            postId={selectedPost.id}
            comments={selectedPost.comments || []}
            onCommentAdded={handleCommentAdded}
            onClose={() => setSelectedPost(null)}
          />
        </div>
      )}
    </div>
  );
}

export default BlogList;
