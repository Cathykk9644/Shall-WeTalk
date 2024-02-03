require('./environment');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const { createServer } = require('http');

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

app.get('/', (req, res) => {
  res.send('Hello, Shall WeTalk!');
});

const routers = [new userRouter(), new userFriendRouter()];
routers.forEach((router) => app.use('/', router.router));

io.on('connection', (socket) => {
  console.log('user id:', socket.id, ' has logged in!');
});

http.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 App listening on the port ${PORT}`);
});
``;
