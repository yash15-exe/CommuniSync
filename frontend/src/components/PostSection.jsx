import React, { useEffect, useState } from "react";
import { getTokenFromCookie } from "../utilities/cookies";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PostCard from "./PostCard";

function PostSection({ community }) {
  const [postsArray, setPostsArray] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getTokenFromCookie();
    axios
      .post(
        "http://localhost:5000/posts/getPostsOfThisCommunity",
        {
          communityObjectId: community._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        return res.data;
      })
      .then((postsArray) => {
        console.log(postsArray.data);
        setPostsArray(postsArray.data);
      });
  }, [community._id]); // Added community._id as a dependency to re-fetch posts when community changes

  return (
    <div className="flex flex-col h-full relative"> {/* Added relative class to make the container relative for absolute positioning */}
      <div className={`flex-grow w-full overflow-y-auto scrollbar-hide h-96`}> {/* Fixed height of 24rem (96 * 0.25rem) */}
        {postsArray.length === 0 ? (
          <div>No Posts to show</div>
        ) : (
          postsArray.map((post) => (
            <PostCard key={post._id} post={post} /> // Use post._id as the key for better uniqueness
          ))
        )}
      </div>
      <div className="absolute bottom-4 right-4"> {/* Positioned button at the bottom right */}
        <button
          className="btn btn-outline btn-accent"
          onClick={() => navigate(`/dashboard/posts/addPost/${community._id}`)}
        >
          Add Post
        </button>
      </div>
    </div>
  );
}

export default PostSection;
