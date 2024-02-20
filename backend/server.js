// require("./environment");
// const express = require("express");
// const cors = require("cors");
// const { Server } = require("socket.io");
// const { createServer } = require("http");
// const session = require("express-session");
// const passport = require("passport");
// const cookieParser = require("cookie-parser");

// const AuthRouter = require("./router/auth.router");
// const userRouter = require("./router/users.router");
// const userFriendRouter = require("./router/userFriends.router");

// const PORT = process.env.PORT || 8080;
// const app = express();
// const http = createServer(app);

// // Define the session middleware with cookie-parser
// const sessionMiddleware = session({
//   secret: "thunder-cat",
//   resave: false,
//   saveUninitialized: false,
// });
// const parseCookie = cookieParser("thunder-cat");

// const io = new Server(http, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(parseCookie);
// app.use(sessionMiddleware);

// app.use(passport.initialize());
// app.use(passport.session());

// app.get("/", (req, res) => {
//   res.send("Hello, Shall WeTalk!");
// });
// const authRouter = new AuthRouter();
// app.use("/", authRouter.router);

// const routers = [new userRouter(), new userFriendRouter()];
// routers.forEach((router) => app.use("/", router.router));
// // Share session middleware with Socket.IO

// io.use((socket, next) => {
//   sessionMiddleware(socket.request, {}, next);
// });

// // Make Socket.IO use the session middleware
// io.use((socket, next) => {
//   parseCookie(socket.request, null, (err) => {
//     if (err) {
//       return next(err);
//     }
//     sessionMiddleware(socket.request, socket.request.res, next);
//   });
// });

// // Use passport to populate user data based on session data
// io.use((socket, next) => {
//   passport.initialize()(socket.request, null, () => {});
//   passport.session()(socket.request, null, () => {
//     if (socket.request.user) {
//       next(null, true);
//     } else {
//       next(new Error("Unauthorized"));
//     }
//   });
// });

// io.on("connection", (socket) => {
//   // user is authenticated and socket.request should have the user info
//   console.log("Authenticated user id:", socket.request.user, "has logged in!");

//   // socket server setup for video chat
//   socket.emit("me", socket.id);

//   socket.on("disconnect", () => {
//     socket.broadcast.emit("callEnded");
//   });

//   socket.on("callUser", ({ userToCall, signalData, from, name }) => {
//     io.to(userToCall).emit("callUser", { signal: signalData, from, name });
//   });

//   socket.on("answerCall", (data) => {
//     io.to(data.to).emit("callAccepted", data.signal);
//   });
// });

// http.listen(PORT, "0.0.0.0", () => {
//   console.log(`🚀 App listening on the port ${PORT}`);
// });

// ``;

require("./environment");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const { createServer } = require("http");
const session = require("express-session");
const passport = require("passport");

const AuthRouter = require("./router/auth.router");
const userRouter = require("./router/users.router");
const userFriendRouter = require("./router/userFriends.router");
const MessageRouter = require("./router/messages.router");
const ChatroomRouter = require("./router/chatrooms.router");

const PORT = process.env.PORT || 8080;
const app = express();
const http = createServer(app);

const io = new Server(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "thunder-cat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello, Shall WeTalk!");
});
const authRouter = new AuthRouter();
app.use("/", authRouter.router);

const routers = [new userRouter(), new userFriendRouter(),new MessageRouter(), new ChatroomRouter()];
routers.forEach((router) => app.use("/", router.router));

io.on("connection", (socket) => {
  const { id } = socket.handshake.query;
  socket.join(id);
  console.log("user id:", id, " has logged in!");

  // socket server setup for video chat
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

http.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 App listening on the port ${PORT}`);
});

``;
