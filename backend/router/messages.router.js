const Router = require('express');
const MessageController = require('../controller/messages.controller');
const db = require('../db/models/index');

class MessageRouter {
  path = '/messages';
  router = Router();

  controller = new MessageController(db);
  constructor() {
    this.initializeRoutes();
  }
  initializeRoutes = () => {
    this.router.get(`${this.path}/getMessages`, this.controller.getMessages);
    this.router.post(
      `${this.path}/checkIfMessageDetailsExist`,
      this.controller.checkIfMessageDetailsExist
    );
    this.router.post(
      `${this.path}/addProfilePic`,
      this.controller.addProfilePicture
    );
  };


}
module.exports = MessageRouter;
