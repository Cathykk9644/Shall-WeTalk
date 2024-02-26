const MessageService = require("../services/message.service")
const VideoChatService = require("../services/videochat.service")
const db = require('../db/models/index');
const messageService = new MessageService(db);
const videoChatService = new VideoChatService();

function initializeSockets(io) {
  io.on("connection", (socket) => {
  const { id } = socket.handshake.query;
  socket.join(id);
  console.log("user id:", id, " has logged in!");
  console.log("Rooms for socket ID:", socket.id, socket.rooms);

  //----------------- socket server setup for video chat ---------------
  videoChatService.videoChatSocketEvents(socket,id,io);
  // ---------------------socket server setup for chat -----------------
  messageService.messageSocketEvents(socket,id,io);

});
}
module.exports = { initializeSockets: initializeSockets };
