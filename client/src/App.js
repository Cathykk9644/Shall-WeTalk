import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import VideoChat from "./pages/VideoChat";
import UserProfile from "./pages/UserProfile";
import VideoCall from "./pages/VideoCall";
import VideoTesting from "./pages/VideoTesting";
import { ContactsProvider } from "./Contexts/ContactsProvider";
import { SocketProvider } from "./Contexts/SocketProvider.js";
import { VideoChatSocketProvider } from "./Contexts/VideoSocketContext";
import { ChatMessageProvider } from "./Contexts/ChatMessagesProvider.js";

const App = () => {
  const [id, setId] = useState();

  const ProtectedRoutes = () => {
    return (
      <SocketProvider id={1}>
        <ContactsProvider id={1}>
          <VideoChatSocketProvider id={id}>
            <ChatMessageProvider id = {1}>
              <Outlet />
            </ChatMessageProvider>
          </VideoChatSocketProvider>
        </ContactsProvider>
      </SocketProvider>
    );
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setId={setId} />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/chat" element={<Chat />} />
            <Route path="/videochat" element={<VideoChat />} />
            <Route path="/video" element={<VideoCall />} />
            <Route path="/videotest" element={<VideoTesting />} />
            <Route path="/userprofile" element={<UserProfile id={1} />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
