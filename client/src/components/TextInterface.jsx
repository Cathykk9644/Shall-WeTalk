import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { IoMdHappy } from "react-icons/io";
import { AiFillAudio } from "react-icons/ai";

const TextInterface = () => {
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
    <div className="flex flex-col flex-1 ">
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
              className={` px-4 py-2 rounded-full text-sm font-semibold ${
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
      <div className="border-t p-4 flex items-center">
        {/* Emoji button */}
        <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none">
          <IoMdHappy size={24} />
        </button>
        <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none">
          <AiFillAudio size={24} />
        </button>
        {/* Message Input */}
        <input
          type="text"
          placeholder="Type messages here..."
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 mx-4 my-2  p-2 border rounded-full focus:outline-none focus:ring-1 focus:border-sky-400 shadow-sm text-sm"
        />
        {/* Send Message Button */}
        <button
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none"
          onClick={handleSendMessage}
          disabled={!message.trim()}
        >
          <IoSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default TextInterface;
