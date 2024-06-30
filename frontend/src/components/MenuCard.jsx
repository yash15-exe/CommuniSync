import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function MenuCard({
  menuItems = [],
  menuTitle = "Title",
  isImgActive = false,
  className = "",
  ...props
}) {
  const navigate = useNavigate();

  const handleCommunityClick = (communityId) => {
    navigate(`/dashboard/community/${communityId}`);
  };

  return (
    <div className={`h-full flex flex-col ${className}`} {...props}>
      <ul data-theme="luxury" className="menu bg-base-200 w-56 rounded-box flex-grow flex flex-col justify-between">
        <li>
          <h2 className="menu-title">{menuTitle}</h2>
          {menuItems.length === 0 ? (
            <ul>
              <li>No Communities joined</li>
            </ul>
          ) : (
            <ul className="flex-grow overflow-auto">
              {menuItems.map((menuItem) => (
                <li className="flex" key={menuItem.name}>
                  <a onClick={() => handleCommunityClick(menuItem.communityId)}>
                    {menuItem.name}
                    {menuItem.imageUrl ? (
                      <img
                        src={menuItem.imageUrl}
                        alt="img"
                        className="h-8 w-8 place-self-end p-1 bg-gray-300 rounded-full justify-end"
                      />
                    ) : (
                      <span className="avatar placeholder place-self-end">
                        <div className="bg-neutral text-neutral-content rounded-full w-8 place-self-end">
                          <span>{menuItem.name[0]}</span>
                        </div>
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
        <li className="p-4 mt-auto">
          <Button onClick={() => navigate("/dashboard/createCommunity")} title={"Create a Community"} />
        </li>
      </ul>
    </div>
  );
}

export default MenuCard;
