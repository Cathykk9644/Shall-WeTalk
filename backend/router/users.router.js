const Router = require('express');
const UserController = require('../controller/users.controller');
const db = require('../db/models/index');

class userRouter {
  path = '/users';
  router = Router();

  controller = new UserController(db);
  constructor() {
    this.initializeRoutes();
  }
  initializeRoutes = () => {
    // this.router.get(
    //   `${this.path}/getAllFriends`,
    //   this.controller.getAllFriends
    // );
  };
}
module.exports = userRouter;
