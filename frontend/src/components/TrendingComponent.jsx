import React, { useEffect, useState } from "react";
import CommunityDisplay from "./CommunityDisplay";
import axios from "axios";

function TrendingComponent() {
  const [trendingCommunities, setTrendingCommunities] = useState([]);

  useEffect(() => {
    axios.post("http://localhost:5000/community/trendingCommunities")
      .then((res) => res.data)
      .then((data) => {
        setTrendingCommunities(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching trending communities:", error);
      });
  }, []);

  return (
    <div className="m-10">
        <h1 className="text-3xl font-semibold text-center mb-7">Trending Communities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {trendingCommunities.length !== 0 ? (
          trendingCommunities.map((trendingCommunity) => (
            <CommunityDisplay key={trendingCommunity.name} community={trendingCommunity} />
          ))
        ) : (
          <h1>No Communities Trending</h1>
        )}
      </div>
    </div>
  );
}

export default TrendingComponent;
