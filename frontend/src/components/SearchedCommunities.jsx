import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommunityDisplay from "./CommunityDisplay";

function SearchedCommunities() {
  const { searchInfo } = useParams();
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await axios.post("http://localhost:5000/community/searchCommunity", {
          name: searchInfo,
        });
        setCommunities(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        setCommunities([]);
      }
    };

    if (searchInfo) {
      fetchCommunities();
    }
  }, [searchInfo]);

  return (
    <div>
      {communities.length === 0 ? (
        <div>No communities found for the following search: {searchInfo}</div>
      ) : (
        <div>
          {communities.map((community) => (
            <CommunityDisplay key={community._id} community={community} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchedCommunities;
