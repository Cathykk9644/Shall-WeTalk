import React from "react";
import LOGO from "../Assets/Logo.jpeg";
import Video1 from "../Assets/Video-1.jpg";
import Video2 from "../Assets/Video-2.jpg";

import { FaSlackHash, FaVideo } from "react-icons/fa";
import { FaMicrophoneSlash } from "react-icons/fa6";
import { HiPhoneIncoming } from "react-icons/hi";
import { ImPhoneHangUp } from "react-icons/im";
import { IoChatbubbleSharp, IoVideocamOff, IoVideocam } from "react-icons/io5";

import VideoChatUI from "../components/VideoChatUI";

const VideoChat = () => {
  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="flex flex-col w-2/3 bg-bgColor1 p-4">
        {/* Top Bar */}
        <div className="w-full h-16 bg-bgColor1  flex items-center justify-center p-2  hover:scale-95 cursor-pointer duration-100">
          <img src={LOGO} alt="Logo" className="h-full" />
        </div>

        {/* Video Feeds Container */}
        <div className="flex-grow flex p-10 -mt-4">
          <div className="w-1/2 bg-bgColor1 text-gray-400 flex items-center justify-center border-2 rounded-xl border-gray-300 mr-2 relative">
            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZ1bm55JTIwZ3V5fGVufDB8fDB8fHww"
              alt="Your Video"
              className="rounded-xl absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-40 text-white p-2 rounded-tr-xl text-xs font-semibold">
              {"John Smith (You)"}
            </div>
          </div>
          <div className="w-1/2 bg-bgColor1 text-gray-400 flex items-center justify-center border-2 rounded-xl border-gray-300 ml-2 relative">
            <img
              src="https://images.unsplash.com/photo-1548142813-c348350df52b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXNpYW4lMjBnaXJsfGVufDB8fDB8fHww"
              alt="Other User's Video"
              className="rounded-xl absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-40 text-white p-2 rounded-tr-xl text-xs font-semibold">
              {"Kathy Wong"}
            </div>
          </div>
        </div>

        {/* Icon Bar Container */}
        <div className="flex justify-center mb-4 ">
          <div className="w-2/3 h-16 bg-gray-300 rounded-2xl bg-opacity-30 flex items-center justify-center space-x-6">
            <button className="p-2 rounded-full text-gray-400 bg-gray-100 focus:outline-none cursor-pointer duration-100 hover:bg-white">
              <IoVideocam size={18} />
            </button>
            <button className="p-2 rounded-full text-gray-400 bg-gray-100 focus:outline-none cursor-pointer duration-100 hover:bg-white">
              <FaMicrophoneSlash size={20} />
            </button>
            <button className="p-2 rounded-full text-rose-400 bg-gray-100 focus:outline-none cursor-pointer duration-100 hover:bg-white">
              <ImPhoneHangUp size={20} />
            </button>
            <button className="p-2 rounded-full text-gray-400 bg-gray-100 focus:outline-none cursor-pointer duration-100 hover:bg-white">
              <IoVideocamOff size={18} />
            </button>
            <button className="p-2 rounded-full text-gray-400 bg-gray-100 focus:outline-none cursor-pointer duration-100 hover:bg-white">
              <HiPhoneIncoming size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/3 p-4 flex flex-col">
        <VideoChatUI />
      </div>
    </div>
  );
};

export default VideoChat;
