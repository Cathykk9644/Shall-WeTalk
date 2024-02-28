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
const UserProfileRouter = require("./router/userProfile.router.js")
const { initializeSockets } = require("./sockets/index.js");

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

const routers = [new userRouter(), new userFriendRouter(),new MessageRouter(), new ChatroomRouter(), new UserProfileRouter()];
routers.forEach((router) => app.use("/", router.router));

initializeSockets(io);

http.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 App listening on the port ${PORT}`);
});

;
