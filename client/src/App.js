import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import UserProfile from "./pages/UserProfile";

const App = () => {
  const [id,setId] = useState();

  useEffect(() => {
    const newSocket = io("http://localhost:8000");
  });

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setId = {setId} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/userprofile" element={<UserProfile id={id}/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
