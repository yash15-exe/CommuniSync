import React, { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import MenuCard from "../components/MenuCard";
import Button from "../components/Button";
import CreateCommunity from "../components/CreateCommunity";
import TrendingComponent from "../components/TrendingComponent";
import ChatComponent from "../components/ChatComponent";
import AddPost from "../components/AddPost";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getTokenFromCookie } from "../../../backend/utilities/cookies";
import { joinCommunity } from "../../store/authSlice";

function Dashboard() {
  const [isHidden, setIsHidden] = useState(true);
  const dispatch = useDispatch();
  const token = getTokenFromCookie();
  const dataArray = useSelector((state) => state.auth.joinedCommunities);

  useEffect(() => {
    console.log("Fetching joined communities...");
    axios
      .post(
        "http://localhost:5000/community/getJoinedCommunity",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("API response:", res.data);
        dispatch(joinCommunity(res.data));
      })
      .catch((error) => {
        console.log("Error fetching joined communities:", error);
      });
  }, [dispatch, token]);

  console.log("dataArray from Redux store:", dataArray);

  return (
    <div className="flex flex-col h-screen" data-theme="black">
      <div className="h-16">
        <NavigationBar onClickfunction={() => setIsHidden(!isHidden)} />
      </div>
      <div className="flex-grow flex p-2">
        <div className={`flex-grow ${isHidden ? "hidden" : "block"} w-64`}>
          <MenuCard menuItems={dataArray} menuTitle="My Communities" />
        </div>
        <div className="w-full ml-4">
          <div
            data-theme="synthwave"
            className=" h-full flex justify-center rounded-xl"
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
