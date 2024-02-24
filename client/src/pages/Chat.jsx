import React from "react";
import Sidebar from "../components/Sidebar";
import FriendList from "../components/FriendList";
import TextInterface from "../components/TextInterface";

const Chat = ({id}) => {
  return (
    <div className="flex h-screen  overflow-hidden">
      <Sidebar />
      <div className="flex flex-1">
        <FriendList />
        <TextInterface id={id}/>
      </div>
    </div>
  );
};

export default Chat;
