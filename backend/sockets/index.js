const MessageService = require("../services/message.service");
const VideoChatService = require("../services/videochat.service");

const messageService = new MessageService();
const videoChatService = new VideoChatService();

function initializeSockets(io) {
  io.on("connection", (socket) => {
    const { id } = socket.handshake.query;
    socket.join(id);
    console.log("user id:", id, " has logged in!");

    //----------------- socket server setup for video chat ---------------
    videoChatService.videoChatSocketEvents(socket, io);
    // ---------------------socket server setup for chat -----------------
    messageService.receiveTest(socket);
  });
}
module.exports = { initializeSockets: initializeSockets };
