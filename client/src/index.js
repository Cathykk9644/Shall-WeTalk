import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { VideoChatSocketProvider } from "./Contexts/VideoSocketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <VideoChatSocketProvider>
      <App />
    </VideoChatSocketProvider>
  </React.StrictMode>
);
