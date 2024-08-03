/* eslint-disable react/prop-types */

import { useState } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
function CommentsSection({ postId, comments, onCommentAdded, onClose }) {
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    axios
      .post(`http://137.184.26.22:3000/api/comments/${postId}`, {
        content: newComment,
      })
      .then(() => {
        setNewComment("");
        onCommentAdded(); 
      })
      .catch((error) => console.error(`Error adding comment: ${error}`));
  };

  return (
    <div className="mx-4 max-w-lg rounded-lg bg-white p-6 shadow-lg">
      <h4 className="mb-2 text-xl font-semibold">Comments</h4>
      <ul className="mb-4 list-inside list-disc">
        {comments.map((comment, index) => (
          <li key={index} className="mb-2">
            {comment}
          </li>
        ))}
      </ul>
      <textarea
        value={newComment}
        onChange={handleCommentChange}
        placeholder="Add a comment..."
        className="mb-2 w-full rounded border border-gray-300 p-2"
      ></textarea>
      <button
        onClick={handleAddComment}
        className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
      >
        Add Comment
      </button>
      <button
        onClick={onClose}
        className="ml-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        Close
      </button>
    </div>
  );
}

export default CommentsSection;
