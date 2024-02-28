import React, { useContext, useState, useEffect } from "react";
import { VideoChatSocketContext } from "../Contexts/VideoSocketContext";
import VideoPlayer from "../components/VideoPlayer";

const VideoCallComponent = () => {
  const {
    call,
    callAccepted,
    setCallAccepted,
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

  const [idToCall, setIdToCall] = useState("");
  const [callerStream, setCallerStream] = useState(null);

  // When the call is accepted, set the caller's stream
  useEffect(() => {
    if (callAccepted && !callEnded && userVideo.current) {
      setCallerStream(userVideo.current.srcObject);
    }
  }, [callAccepted, callEnded, userVideo]);

  // Function to handle calling a user or self
  const handleCallClick = () => {
    if (idToCall === me) {
      // Self-calling: mimic the call being accepted
      setCallAccepted(true);
      setCallerStream(stream);
      // Note: For a complete self-call functionality,
      // you may need to set additional state or perform other actions
      // depending on how your context provider is set up.
    } else {
      // Calling another user
      callUser(idToCall);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex flex-wrap justify-center items-center">
        {/* Display the video player for the local stream */}
        {stream && (
          <VideoPlayer name={name || "Me"} stream={stream} isUser={true} />
        )}
        {/* Display the video player for the caller's stream */}
        {callAccepted && !callEnded && callerStream && (
          <VideoPlayer
            name={call.name || "Caller"}
            stream={callerStream}
            isUser={false}
          />
        )}
      </div>
      <div className="flex flex-col items-center my-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 m-2 border-2 border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="ID to call"
          value={idToCall}
          onChange={(e) => setIdToCall(e.target.value)}
          className="p-2 m-2 border-2 border-gray-300 rounded-md"
        />
        {call.isReceivingCall && !callAccepted && (
          <div className="flex flex-col items-center mb-4">
            <h4 className="text-lg text-gray-800">{call.name} is calling...</h4>
            <button
              onClick={answerCall}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Answer
            </button>
          </div>
        )}
        <button
          onClick={handleCallClick}
          className="bg-blue-500 text-white px-4 py-2 m-2 rounded-md hover:bg-blue-600"
        >
          Call
        </button>
        {callAccepted && !callEnded && (
          <button
            onClick={leaveCall}
            className="bg-red-500 text-white px-4 py-2 m-2 rounded-md hover:bg-red-600"
          >
            Hang Up
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoCallComponent;
