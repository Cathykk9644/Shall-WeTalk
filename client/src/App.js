import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import UserProfile from "./pages/UserProfile";
import { ContactsProvider } from "./Contexts/ContactsProvider";
import { SocketProvider } from "./Contexts/SocketProvider.js";

const App = () => {
  const [id,setId] = useState();

  const ProtectedRoutes = ()=>{
    return(
      <SocketProvider id = {id}>
        <ContactsProvider id = {id}>
            <Outlet/>
        </ContactsProvider>
      </SocketProvider>      
    )
  }


  return (
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login setId = {setId} />} />
              <Route path="/signup" element={<Signup />} />
              <Route element={<ProtectedRoutes/>}>
                <Route path="/chat" element={<Chat />} />
                <Route path="/userprofile" element={<UserProfile id={id}/>} />
              </Route>

            </Routes>
          </div>
        </Router>


  );
};

export default App;
