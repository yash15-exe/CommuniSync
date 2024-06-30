import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { getTokenFromCookie } from "../utilities/cookies";
import { useNavigate } from "react-router-dom";

function CommunitySettings({ community }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isAdmin = community.admins.some((admin) => admin._id === user._id);

  const handleDelete = async () => {
    try {
      await axios.post(
        "http://localhost:5000/community/deleteCommunity",
        { communityId: community._id },
        {
          headers: {
            Authorization: `Bearer ${getTokenFromCookie()}`,
          },
        }
      );
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const makeAdmin = async () => {
    await axios.post(
      "http://localhost:5000/community/makeAdmin",
      { communityId: community._id, userId: user._id },
      {
        headers: {
          Authorization: `Bearer ${getTokenFromCookie()}`,
        },
      }
    );
  };

  const kickUser = async (userId) => {
    await axios.post(
      "http://localhost:5000/community/removeUser",
      { userId, communityId: community._id },
      {
        headers: {
          Authorization: `Bearer ${getTokenFromCookie()}`,
        },
      }
    );
    navigate("/dashboard");
  };

  const handleExit = async () => {
    try {
      await axios.post(
        "http://localhost:5000/community/removeUser",
        { communityId: community._id, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${getTokenFromCookie()}`,
          },
        }
      );
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4  rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Community Settings</h2>
      <div className="mb-4">
        <div className="mb-4">
          <p className="text-lg mb-2">
            <strong>Name:</strong> {community.name}
          </p>
          <p className="text-lg mb-2">
            <strong>Description:</strong> {community.description}
          </p>
          <p className="text-lg mb-2">
            <strong>Rules:</strong> {community.rules}
          </p>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg">
              <strong>Members:</strong> {community.members.length}
            </p>
            <button
              onClick={handleExit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Exit Community
            </button>
          </div>
          {community.members.map((member) => (
            <div key={member._id} className="flex items-center justify-between rounded-lg p-3 mb-2">
              <div className="flex items-center">
            
                <span className="text-lg">{member.username}</span>
              </div>
              {isAdmin && (
                <div className="space-x-2">
                  <button
                    onClick={() => kickUser(member._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Kick
                  </button>
                  <button
                    onClick={makeAdmin}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Make Admin
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div>
          <p className="text-lg mb-2">
            <strong>Admins:</strong> {community.admins.length}
          </p>
          {community.admins.map((admin) => (
            <div key={admin._id} className="flex items-center justify-between  rounded-lg p-3 mb-2">
              <div className="flex items-center">
               
                <span className="text-lg">{admin.username}</span>
              </div>
              {/* Add admin specific actions here if needed */}
            </div>
          ))}
        </div>
      </div>
      {isAdmin ? (
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete Community
        </button>
      ) : (
        <button
          onClick={handleExit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Exit Community
        </button>
      )}
    </div>
  );
}

export default CommunitySettings;
