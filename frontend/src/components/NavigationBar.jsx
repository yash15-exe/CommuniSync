import React, { useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
function NavigationBar({ onClickfunction }) {
  const [searchInfo, setSearchInfo] = useState("yash");
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleSearch = async () => {};
  return (
    <div data-theme="black">
      <div className="navbar bg-base-100 ">
        <label className="btn btn-circle swap swap-rotate bg-black">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" onClick={onClickfunction}/>

          {/* hamburger icon */}
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>

          {/* close icon */}
          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
        <div className="flex-1">
          <a className="cursor-pointer font-bold bg-black text-xl" >CommuniSync</a>
        </div>
        <div className="flex-none gap-2">
          <div className=" flex ">
            <input
              type="text"
              placeholder="Search Communities"
              onChange={(e) => setSearchInfo(e.target.value)}
              className="input input-bordered w-24 md:w-auto lg:w-96"
            />
            <button
              className="mx-1"
              onClick={() => navigate(`/dashboard/search/${searchInfo}`)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 20l5.5-5.5M10 4h.01M21 21l-6-6m2-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between" onClick={()=> navigate("/dashboard/profile")}>
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={()=>{
                  dispatch(logout())
                  navigate("/")
                }}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
