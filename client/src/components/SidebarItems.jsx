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

const SidebarItems = ({ isCollapsed }) => {
  return (
    <div className="text-white mt-4">
      {/* You can add or remove items as needed */}
      <li className="flex items-center p-4 hover:bg-sky-400 rounded-md font-semibold">
        <PiHouseBold className="text-xl" />
        {!isCollapsed && <span className="ml-4">Home</span>}
      </li>
      <li className="flex items-center p-4 hover:bg-sky-400 rounded-md font-semibold">
        <PiChatBold className="text-xl" />
        {!isCollapsed && <span className="ml-4">Messages</span>}
      </li>
      <li className="flex items-center p-4 hover:bg-sky-400 rounded-md font-semibold">
        <PiVideoBold className="text-xl" />
        {!isCollapsed && <span className="ml-4">Video Chat</span>}
      </li>
      <li className="flex items-center p-4 hover:bg-sky-400 rounded-md font-semibold">
        <PiUserBold className="text-xl" />
        {!isCollapsed && <span className="ml-4">Profile</span>}
      </li>
      <li className="flex items-center p-4 hover:bg-sky-400 rounded-md font-semibold">
        <PiBellRingingBold className="text-xl" />
        {!isCollapsed && <span className="ml-4">Notifications</span>}
      </li>
      <li className="flex items-center p-4 hover:bg-sky-400 rounded-md font-semibold">
        <PiGearBold className="text-xl" />
        {!isCollapsed && <span className="ml-4">Settings</span>}
      </li>
    </div>
  );
};

export default SidebarItems;
