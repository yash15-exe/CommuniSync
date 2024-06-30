import React from "react";
import { useNavigate } from "react-router-dom";

function CommunityDisplay({ community = {} }) {
  const MAX_DESCRIPTION_LENGTH = 100; // Adjust this value based on your needs
  const navigate = useNavigate();

  const truncateDescription = (text) => {
    if (text.length > MAX_DESCRIPTION_LENGTH) {
      return text.slice(0, MAX_DESCRIPTION_LENGTH) + "...";
    }
    return text;
  };

  return (
    <div className="overflow-hidden  shadow-xl rounded-md min-w-[350px]">
      <img
        src={community.imageUrl}
        alt="CommunityImage"
        className="object-cover w-full h-36"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold line-clamp-1">
          {truncateDescription(community.name)}
        </h2>
        <p className="text-sm line-clamp-3 mt-2">{truncateDescription(community.description)}</p>
        <div className="mt-2 flex justify-end">
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/dashboard/communityInfo/${community.communityId}`)}
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommunityDisplay;
