import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function CommentComponent({ comment, setComment }) {
  const user = useSelector((state) => state.auth.user);

  const deleteComment = async () => {
    try {
      await axios.post("http://localhost:5000/comments/deleteComment", { commentId: comment._id });
      setComment(prevComments => prevComments.filter(c => c._id !== comment._id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex items-center mb-2">
        <div className="font-bold text-lg mr-2">{comment.author.username}</div>
        {user._id === comment.author._id && (
          <button
            onClick={deleteComment}
            className="text-red-500 hover:text-red-600 focus:outline-none"
          >
            Delete
          </button>
        )}
      </div>
      <div className="mb-2">
        {comment.content}
      </div>
      <div className="text-gray-500 text-sm">
        Likes: {comment.likes.length || 0}
      </div>
    </div>
  );
}

export default CommentComponent;
