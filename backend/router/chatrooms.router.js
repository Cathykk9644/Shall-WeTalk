const Router = require('express');
const ChatroomController = require('../controller/chatrooms.controller');
const db = require('../db/models/index');

class ChatroomRouter {
  path = '/chatrooms';
  router = Router();

  controller = new ChatroomController(db);
  constructor() {
    this.initializeRoutes();
  }
  initializeRoutes = () => {
    this.router.get(`${this.path}/getChatrooms`, this.controller.getChatrooms);
    this.router.post(`${this.path}/createChat`,this.controller.createChat);
    // this.router.post(
    //   `${this.path}/addProfilePic`,
    //   this.controller.addProfilePicture
    // );
  };


}
module.exports = ChatroomRouter;