import React from "react";
import {
  PiHouseBold,
  PiFilesBold,
  PiGearBold,
  PiEnvelopeBold,
  PiBellRingingBold,
  PiUserBold,
  PiChatBold,
  PiVideoBold,
} from "react-icons/pi";
import { useNavigate, Link } from "react-router-dom";

const SidebarItems = ({ isCollapsed }) => {
  const navigate = useNavigate();

  return (
    <div className="text-white mt-4">
      {/* You can add or remove items as needed */}
      <li
        onClick={() => navigate("/")}
        className="flex items-center p-4 hover:bg-sky-400 rounded-md font-semibold cursor-pointer duration-100 "
      >
        <PiHouseBold className="text-xl" />
        {!isCollapsed && <span className="ml-4 ">Home</span>}
      </li>
      <li 
        onClick={() => navigate("/chat")}
        className="flex items-center p-4 hover:bg-sky-400 rounded-md font-semibold cursor-pointer duration-100">
        <PiChatBold className="text-xl" />
        {!isCollapsed && <span className="ml-4 ">Messages</span>}
      </li>
      <li
        onClick={() => navigate("/videochat")}
        className="flex items-center p-4 hover:bg-sky-400 rounded-md font-semibold cursor-pointer duration-100"
      >
        <PiVideoBold className="text-xl" />
        {!isCollapsed && <span className="ml-4 ">Video Chat</span>}
      </li>
      <li className="flex items-center p-4 hover:bg-sky-400 rounded-md font-semibold cursor-pointer duration-100">
        <PiUserBold className="text-xl" />
        {!isCollapsed && <span className="ml-4 ">Profile</span>}
      </li>
      <li
        onClick={() => navigate("/video")}
        className="flex items-center p-4 hover:bg-sky-400 rounded-md font-semibold cursor-pointer duration-100"
      >
        <PiBellRingingBold className="text-xl" />
        {!isCollapsed && <span className="ml-4 ">Notifications</span>}
      </li>
      <li
        onClick={() => navigate("/videotest")}
        className="flex items-center p-4 hover:bg-sky-400 rounded-md font-semibold cursor-pointer duration-100"
      >
        <PiGearBold className="text-xl" />
        {!isCollapsed && <span className="ml-4 ">Settings</span>}
      </li>
    </div>
  );
};

export default SidebarItems;
