import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getTokenFromCookie } from "../utilities/cookies";
import CommentComponent from "./commentComponent";
const PostCard = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(post.likes.length);
  const [comments, setComments] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const userId = user._id;
  const [isLiked, setIsLiked] = useState(false);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [commentContent, setCommentContent] = useState();
  const handleToggleComments = async () => {
    setShowComments(!showComments);
    if (!showComments && comments.length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:5000/comments/getComments",
          {
            postId:post._id
          }
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
  };

  const handleLike = async () => {
    setIsLiked(!isLiked);
    try {
      await axios
        .post(
          "http://localhost:5000/posts/likePost",
          {
            postId: post._id,
            userId: user._id,
          },
          {
            headers: {
              Authorization: `Bearer ${getTokenFromCookie()}`,
            },
          }
        )
        .then(isLiked ? setLikes(likes - 1) : setLikes(likes + 1));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };
  const handleAddCommentSubmit = () =>{
    axios.post("http://localhost:5000/comments/addComment",{content:commentContent,
      userId:user._id,
      postId:post._id
    },{
      headers:{
        Authorization:`Bearer ${getTokenFromCookie()}`
      }
    }).then((res)=>res.data).then((addedComment)=>setComments((prevComments)=>[...prevComments,addedComment]))
  }
  return (
    <div
      className={`flex w-full  m-2 ${
        userId == post.author ? "justify-end" : "justify-start"
      }`}
    >
      <div
        data-theme="luxury"
        className={`shadow-md rounded-lg overflow-hidden mx-6 mb-3`}
      >
        {" "}
        {/* max-w-md sets max width and mx-auto centers the card */}
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
          <p className=" mb-4">{post.caption}</p>
          <div className="flex justify-between items-center mb-4">
            <span className="">Author: {post.authorUsername}</span>
            <span className="">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={handleLike}
              className="text-blue-500 hover:text-blue-700 focus:outline-none"
            >
              {isLiked ? `Unlike (${likes})` : `Like (${likes})`}
            </button>
            {!isAddingComment && (
              <button onClick={() => setIsAddingComment(!isAddingComment)}>
                {" "}
                Add Comment
              </button>
            )}
            
            <button
              onClick={handleToggleComments}
              className="text-blue-500 hover:text-blue-700 focus:outline-none"
            >
              
              {showComments ? "Hide Comments" : "Show Comments"}
            </button>
          </div>
          {isAddingComment && (
              <div className="add-comment">
               
                  <textarea
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    placeholder="Write a comment..."
                    required
                    className="comment-textarea"
                  />
                  <button onClick={handleAddCommentSubmit} >
                    Post Comment
                  </button>
             
              </div>
            )}
          {showComments && (
            <div className="mt-4">
              {comments.length > 0 ? (
                <ul className="space-y-4">
                  {comments.map((comment, index) => (
                    <CommentComponent key={index} comment={comment} setComment={setComments}/>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No comments yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
