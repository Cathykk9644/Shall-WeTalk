require('./environment');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const { createServer } = require('http');
const session = require('express-session');
const passport = require('passport');

const AuthRouter = require('./router/auth.router');
const userRouter = require('./router/users.router');
const userFriendRouter = require('./router/userFriends.router');

const PORT = process.env.PORT || 8080;
const app = express();
const http = createServer(app);
const io = new Server(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'thunder-cat',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Hello, Shall WeTalk!');
});
const authRouter = new AuthRouter();
app.use('/', authRouter.router);

const routers = [new userRouter(), new userFriendRouter()];
routers.forEach((router) => app.use('/', router.router));

io.on('connection', (socket) => {
  const {id} =socket.handshake.query
  socket.join(id)
  console.log('user id:', id, ' has logged in!');
});

http.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 App listening on the port ${PORT}`);
});
``;
