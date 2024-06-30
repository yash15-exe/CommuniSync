import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getTokenFromCookie } from "../utilities/cookies";
import ChatComponent from "./ChatComponent";
import PostSection from "./PostSection";
import CommunitySettings from "./CommunitySettings";

function CommunityDetails() {
  const { communityId } = useParams();
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPostSection, setIsPostSection] = useState(false);
  const [isSettingsActive, setIsSettingsActive] = useState(false)
  useEffect(() => {
    setLoading(true);

    const token = getTokenFromCookie();

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
      .then((response) => {
        setCommunity(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching community:", error);
        setLoading(false);
      });
  }, [communityId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!community) {
    return <div>Community not found!</div>;
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="sticky p-4 flex justify-center">
        <button
          className="btn btn-wide mr-2"
          onClick={() => setIsPostSection(false)}
        >
          Chat
        </button>
        <button className="btn btn-wide" onClick={() => {setIsPostSection(true)
        setIsSettingsActive(false)}}>
          Posts
        </button>
        <button className="btn btn-wide" onClick={() => setIsSettingsActive(!isSettingsActive)}>
          Settings
        </button>

      </div>
      {!isSettingsActive &&(isPostSection? (
        <div className="flex flex-col h-full w-full"><PostSection community={community}/></div>
      ) : (
        <div className="flex flex-col h-full w-full"><ChatComponent communityId={communityId} community={community}/></div>
      ))}
      {isSettingsActive&& <CommunitySettings community={community}/>}
    </div>
  );
}

export default CommunityDetails;
