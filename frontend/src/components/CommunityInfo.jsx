import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getTokenFromCookie } from "../utilities/cookies";

function CommunityInfo() {
  const { communityId } = useParams();
  const [community, setCommunity] = useState({ members: [] });
  const token = getTokenFromCookie();

  const joinCommunity = () => {
    axios
      .post(
        "http://localhost:5000/community/addUserToCommunity",
        { communityId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        // Show a toast or message on successful join
      })
      .catch((error) => {
        console.error("Error joining community:", error);
        // Handle error, show toast or message
      });
  };

  useEffect(() => {
    axios
      .post(
        "http://localhost:5000/community/getThisCommunity",
        { communityId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setCommunity(res.data);
      })
      .catch((error) => {
        console.error("Error fetching community info:", error);
      });
  }, [communityId, token]);

  return (
    <div  className="container mx-auto px-4 mt-8">
      <div data-theme="luxury" className="max-w-4xl mx-auto rounded-lg shadow-lg overflow-hidden ">
        {/* Community Image */}
        <img
          className="w-full h-64 object-cover object-center"
          src={community.imageUrl}
          alt={community.name}
        />
        <div className="p-6">
          {/* Community Name */}
          <h1 className="text-3xl font-semibold mb-4">{community.name}</h1>
          {/* Community Description */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Description:</h2>
            <p className="text-lg">{community.description}</p>
          </div>
          {/* Rules */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Rules:</h2>
            <p className="text-lg">{community.rules || "No rules specified."}</p>
          </div>
          {/* Meta Information */}
          <div className="flex items-center justify-between">
            <div>
              <strong>Created At:</strong>{" "}
              {new Date(community.createdAt).toLocaleDateString()}
            </div>
            <div>
              <strong>Updated At:</strong>{" "}
              {new Date(community.updatedAt).toLocaleDateString()}
            </div>
            <div>
              <strong>Total Members:</strong> {community.members.length || "0"}
            </div>
            <button className="btn btn-primary" onClick={joinCommunity}>
              JOIN COMMUNITY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityInfo;
