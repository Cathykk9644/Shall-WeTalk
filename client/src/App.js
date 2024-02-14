import React, { useEffect } from "react";
import io from "socket.io-client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import VideoChat from "./pages/VideoChat";
import UserProfile from "./pages/UserProfile";
import VideoCall from "./pages/VideoCall";

const App = () => {
  useEffect(() => {
    const newSocket = io("http://localhost:8000");
  });

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/videochat" element={<VideoChat />} />
          <Route path="/video" element={<VideoCall />} />
          <Route path="/userprofile" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
