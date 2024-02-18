import React, { createContext, useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const VideoChatSocketContext = createContext();

// This provider component will use the id passed as a prop to create a socket connection
const VideoChatSocketProvider = ({ id, children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  // Creating a ref for the socket to persist the connection without re-creating it on re-renders
  const videoChatSocket = useRef();

  // This effect will only run once when the component mounts
  useEffect(() => {
    videoChatSocket.current = io("http://localhost:8000", { query: { id } });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      });

    videoChatSocket.current.on("me", (id) => setMe(id));

    videoChatSocket.current.on(
      "callUser",
      ({ from, name: callerName, signal }) => {
        setCall({ isReceivingCall: true, from, name: callerName, signal });
      }
    );

    // Cleanup function to remove all socket event listeners
    return () => {
      videoChatSocket.current.emit("logout");
      videoChatSocket.current.off("me");
      videoChatSocket.current.off("callUser");
      videoChatSocket.current.off("callAccepted");
      videoChatSocket.current.disconnect();
    };
  }, []);

  // Answering a call
  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      videoChatSocket.current.emit("answerCall", {
        signal: data,
        to: call.from,
      });
    });

    peer.on("stream", (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  // Calling a user
  const callUser = (idToCall) => {
    if (idToCall === me) {
      setCallAccepted(true);
      userVideo.current.srcObject = myVideo.current.srcObject; // Show own video as the user video
      // No need to create a peer connection in this case
      return;
    }

    // Proceed with the regular call process if calling someone else
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      videoChatSocket.current.emit("callUser", {
        userToCall: idToCall,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    videoChatSocket.current.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  // Leaving the call
  const leaveCall = () => {
    setCallEnded(true);

    if (connectionRef.current) {
      connectionRef.current.destroy();
    }

    // Resetting the call state
    setCall({});
    setCallAccepted(false);
    setCallEnded(false);
  };

  return (
    <VideoChatSocketContext.Provider
      value={{
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
      }}
    >
      {children}
    </VideoChatSocketContext.Provider>
  );
};

export { VideoChatSocketContext, VideoChatSocketProvider };
