import React, { useContext, useEffect, useState } from "react";
import LOGO from "../Assets/Logo.jpeg";

import { FaSlackHash, FaVideo } from "react-icons/fa";
import { FaMicrophoneSlash } from "react-icons/fa6";
import { HiPhoneIncoming } from "react-icons/hi";
import { ImPhoneHangUp } from "react-icons/im";

import {
  IoChatbubbleSharp,
  IoVideocamOff,
  IoVideocam,
  IoCall,
} from "react-icons/io5";

import VideoChatUI from "../components/VideoChatUI";
import { useNavigate, Link } from "react-router-dom";
import { VideoChatSocketContext } from "../Contexts/VideoSocketContext";

const VideoCall = () => {
  const navigate = useNavigate();

  const {
    call,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    name,
    setName,
    callEnded,
    me,
    callUser,
    leaveCall,
    answerCall,
  } = useContext(VideoChatSocketContext);

  // local state to manage the mute and camera status
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  // function to toggle mute
  const toggleMute = () => {
    if (stream) {
      stream.getAudioTracks()[0].enabled = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // function to toggle camera
  const toggleCamera = () => {
    if (stream) {
      stream.getVideoTracks()[0].enabled = !isCameraOff;
      setIsCameraOff(!isCameraOff);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="flex flex-col w-2/3 bg-bgColor1 p-4">
        {/* Top Bar */}
        <div
          onClick={() => navigate("/chat")}
          className="w-full h-16 bg-bgColor1  flex items-center justify-center p-2  hover:scale-95 cursor-pointer duration-100"
        >
          <img src={LOGO} alt="Logo" className="h-full" />
        </div>
        {/* Video Feeds Container */}
        <div className="flex-grow flex p-10 -mt-4">
          <div className="w-1/2 bg-bgColor1 text-gray-400 flex items-center justify-center border-2 rounded-xl border-gray-300 mr-2 relative">
            {/* My Video */}
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className="rounded-xl absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-40 text-white p-2 rounded-tr-xl text-xs font-semibold">
              {name || "John Smith (You)"}
            </div>
          </div>
          <div className="w-1/2 bg-bgColor1 text-gray-400 flex items-center justify-center border-2 rounded-xl border-gray-300 ml-2 relative">
            {/* User Video */}
            {/* {callAccepted && !callEnded && ( */}
            <video
              id="test-vid"
                playsInline
                ref={userVideo}
                autoPlay
                className="rounded-xl absolute inset-0 w-full h-full object-cover"
              />
            {/* )} */}
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-40 text-white p-2 rounded-tr-xl text-xs font-semibold">
              {call.name || "Kathy Wong"}
            </div>
          </div>
        </div>

        {/* Icon Bar Container */}
        <div className="flex justify-center mb-4">
          <div className="w-2/3 h-16 bg-gray-300 rounded-2xl bg-opacity-30 flex items-center justify-center space-x-6">
            {/* Make Call Button */}
            <button
              // onClick={() => callUser(someUserId)}
              className="p-2 rounded-full text-gray-400 bg-gray-100 focus:outline-none cursor-pointer duration-100 hover:bg-white"
            >
              <IoCall size={18} />
            </button>

            {/* Mute Button */}
            <button
              onClick={toggleMute}
              className={`p-2 rounded-full ${
                isMuted ? "text-rose-400" : "text-gray-400"
              } bg-gray-100 focus:outline-none cursor-pointer duration-100 hover:bg-white`}
            >
              <FaMicrophoneSlash size={20} />
            </button>

            {/* Hang Up Button */}
            <button
              onClick={leaveCall}
              className="p-2 rounded-full text-rose-400 bg-gray-100 focus:outline-none cursor-pointer duration-100 hover:bg-white"
            >
              <ImPhoneHangUp size={20} />
            </button>

            {/* Turn Off Camera Button */}
            <button
              onClick={toggleCamera}
              className={`p-2 rounded-full ${
                isCameraOff ? "text-rose-400" : "text-gray-400"
              } bg-gray-100 focus:outline-none cursor-pointer duration-100 hover:bg-white`}
            >
              {isCameraOff ? (
                <IoVideocamOff size={18} />
              ) : (
                <IoVideocam size={18} />
              )}
            </button>

            {/* Answer Call Button */}
            <button
              onClick={answerCall}
              className="p-2 rounded-full text-gray-400 bg-gray-100 focus:outline-none cursor-pointer duration-100 hover:bg-white"
            >
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

export default VideoCall;
