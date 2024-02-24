import React, {useState} from "react";
import { FaSearch } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import FriendsTopBar from "./FriendsTopBar"
import {useContacts} from "../Contexts/ContactsProvider"
import { useChatMessages } from "../Contexts/ChatMessagesProvider";

const FriendList = () => {
  const friends = useContacts().contacts;
  const {allMessages,setChatIndex} = useChatMessages();
  const [searchValue,setSearchValue]= useState("")

 

  return (
    <div className="w-2/6 h-full flex flex-col bg-bgColor1 border-r">
      <FriendsTopBar searchValue={searchValue} setSearchValue={setSearchValue}/>

      {searchValue?
      <div className="flex-1 overflow-y-auto scrollbar-hide cursor-pointer duration-100 ">
        {friends.map((friend, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 hover:bg-gray-50 text-gray-500 text-sm "
          >
            <div className="flex items-center ">
              <img
                src={friend.imageURL}
                alt={friend.name}
                className="rounded-full h-10 w-10 object-cover"
                onError={(e) => {
                  e.target.onerror = null; // prevents looping
                  e.target.src = "https://via.placeholder.com/150"; // default image
                }}
              />
              <span className="ml-4 font-medium">{friend.name}</span>
            </div>
            {/* <div className="text-xs text-gray-500">{friend.lastActive}</div> */}
          </div>
        ))}
      </div>
      :
      <div className="flex-1 overflow-y-auto scrollbar-hide cursor-pointer duration-100 ">
        {allMessages&&allMessages.map((chat, index) => (
          <div
            key={index}
            onClick={()=>setChatIndex(index)}
            className="flex items-center justify-between p-4 hover:bg-gray-50 text-gray-500 text-sm "
          >
            <div className="flex items-center ">
              <img
                src={chat.chatroomURL}
                alt={chat.chatroomName}
                className="rounded-full h-10 w-10 object-cover"
                onError={(e) => {
                  e.target.onerror = null; // prevents looping
                  e.target.src = "https://via.placeholder.com/150"; // default image
                }}
              />
              <span className="ml-4 font-medium">{chat.chatroomName}</span>
            </div>
          </div>))}
      </div>          
      }
    </div>
  );
};

export default FriendList;

 const fakeFriends = [
    {
      name: "Alice Smith",
      lastActive: "1:15 pm",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhhcHB5JTIwZ2lybHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Bob Johnson",
      lastActive: "5:23 am",
      imageUrl:
        "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z3V5fGVufDB8fDB8fHww",
    },
    {
      name: "Charlie Brown",
      lastActive: "11:44 am",
      imageUrl:
        "https://images.unsplash.com/photo-1542327897-d73f4005b533?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFzaWFufGVufDB8fDB8fHww",
    },
    {
      name: "Diana Morales",
      lastActive: "9:05 pm",
      imageUrl:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhhcHB5JTIwbGFkeXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Evan Young",
      lastActive: "2:34 pm",
      imageUrl:
        "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFzaWFufGVufDB8fDB8fHww",
    },
    {
      name: "Fiona Gallagher",
      lastActive: "7:18 am",
      imageUrl:
        "https://images.unsplash.com/photo-1502767089025-6572583495f9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhhcHB5JTIwd29tYW58ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "George King",
      lastActive: "4:22 pm",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3V5fGVufDB8fDB8fHww",
    },
    {
      name: "Hannah Abbott",
      lastActive: "12:03 pm",
      imageUrl:
        "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGhhcHB5JTIwZ2lybHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Irene Adler",
      lastActive: "10:10 am",
      imageUrl:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      name: "John Doe",
      lastActive: "8:30 pm",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      name: "Kathy Bell",
      lastActive: "Yesterday",
      imageUrl:
        "https://images.unsplash.com/photo-1548142813-c348350df52b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
  ];