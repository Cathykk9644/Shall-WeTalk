import React, { useEffect, useRef } from "react";

const VideoPlayer = ({ name, stream, isUser }) => {
  const internalVideoRef = useRef(null); // Create a ref for the video element

  useEffect(() => {
    // Set the stream as the source of the video when the component mounts and when stream changes
    console.log("internal vid ref before",internalVideoRef)  
    if (internalVideoRef.current && stream) {
      console.log("internal vid ref",internalVideoRef)
      internalVideoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="flex flex-col items-center p-2">
      <p className="mb-2 text-sm font-semibold text-gray-700">{name}</p>
      <video
        className="rounded-lg w-full max-w-md bg-black"
        playsInline
        muted={isUser} // Mute the video if it is the user's own video
        ref={internalVideoRef} // Use the created ref here
        autoPlay
      />
    </div>
  );
};

export default VideoPlayer;
