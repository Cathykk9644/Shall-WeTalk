import React, { useState } from "react";
import { IoSend, IoVideocam, IoCall } from "react-icons/io5";
import { IoMdHappy } from "react-icons/io";
import { AiFillAudio } from "react-icons/ai";

const VideoChatUI = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Hey 😉, how's it going?", sender: "friend" },
    {
      id: 2,
      text: "Not too bad, just working on a project. You?",
      sender: "me",
    },
    { id: 3, text: "Same here. Need a break though.🥹", sender: "friend" },
    { id: 4, text: "We should catch up soon 🤗!", sender: "me" },
    { id: 5, text: "Yeah definitely!", sender: "friend" },
    { id: 6, text: "Let's do dinner, go hiking or sth 👻!", sender: "me" },
    { id: 7, text: "👍 Yeah sounds fun!", sender: "friend" },
    { id: 8, text: "What about next Sat?", sender: "me" },
    { id: 9, text: "Yeah okay!", sender: "friend" },
    { id: 10, text: "Alright see you then!", sender: "me" },
    { id: 11, text: "Looking forward to it", sender: "friend" },
    { id: 12, text: "Yeah me too!", sender: "me" },
    { id: 13, text: "Let's go hiking first and dinner later!😬", sender: "me" },
    { id: 14, text: "Cool let'ssss do that!", sender: "friend" },
    {
      id: 15,
      text: "Okay hang in there, I will see you soon!😀",
      sender: "me",
    },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        text: message,
        sender: "me",
      };
      setChatMessages([...chatMessages, newMessage]);
      setMessage("");
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full">
      {/* Top bar */}
      <div className="flex justify-between items-center p-2 border-b">
        <div className="flex items-center ">
          <img
            src="https://images.unsplash.com/photo-1548142813-c348350df52b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXNpYW4lMjBnaXJsfGVufDB8fDB8fHww"
            alt="dummy user image"
            className="w-8 h-8 rounded-full object-cover ml-2 "
          />
          <span className="font-semibold text-sm text-gray-500 ml-2">
            {"Kathy Wong"}
          </span>
        </div>
      </div>
      <div className="flex-1 p-4 overflow-y-auto scrollbar-hide">
        {/* Chat messages will be displayed here */}
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex my-2 ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={` px-4 py-2 rounded-full text-xs font-semibold ${
                msg.sender === "me"
                  ? "bg-sky-400 text-white "
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t p-2 flex items-center">
        {/* Emoji button */}
        <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none">
          <IoMdHappy size={20} />
        </button>

        {/* Message Input */}
        <input
          type="text"
          placeholder="write messages..."
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 mx-4 my-2  p-2 border rounded-full focus:outline-none focus:ring-1 focus:border-sky-300 shadow-sm text-xs"
        />
        {/* Send Message Button */}
        <button
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none cursor-pointer duration-100"
          onClick={handleSendMessage}
          disabled={!message.trim()}
        >
          <IoSend size={16} />
        </button>
      </div>
    </div>
  );
};

export default VideoChatUI;
