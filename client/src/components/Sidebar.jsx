import React, { useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import { PiCaretCircleLeftBold, PiCaretCircleRightBold } from "react-icons/pi";
import SidebarItems from "./SidebarItems";

const Sidebar = (props) => {
  const {username,pfp}=props
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`h-screen ${isCollapsed ? "w-16" : "w-1/6"}`}>
      <nav
        className={`h-full  flex flex-col ${
          isCollapsed ? "bg-sky-600" : "bg-sky-500"
        } border-r border-gray-100 shadow-sm`}
      >
        <div className="p-4 mt-4 flex justify-between items-center">
          {!isCollapsed && <FaRegPaperPlane className="text-2xl text-white" />}
          {!isCollapsed && (
            <p className="text-md text-white font-bold">Shall WeTalk</p>
          )}
          <button onClick={toggleSidebar}>
            {isCollapsed ? (
              <PiCaretCircleRightBold className="text-2xl text-white " />
            ) : (
              <PiCaretCircleLeftBold className="text-2xl text-white " />
            )}
          </button>
        </div>
        <ul className={`flex-1 ${isCollapsed ? "px-1" : "px-2"}`}>
          <SidebarItems isCollapsed={isCollapsed} />
        </ul>
        <div className=" p-4 flex items-center mb-4">
          <img
            src={pfp?pfp:"https://images.unsplash.com/photo-1600807497639-3b5d8e74a232?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhpa2luZ3xlbnwwfHwwfHx8MA%3D%3D"}
            alt="dummy user image"
            className={`w-8 h-8 rounded-full border-white border-2 ${
              isCollapsed ? "mx-auto" : "ml-2"
            }`}
          />
          {!isCollapsed && (
            <div className="ml-4">
              <h4 className="font-semibold text-sm text-white ">Hey {username?username:"Cathy"}!</h4>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
