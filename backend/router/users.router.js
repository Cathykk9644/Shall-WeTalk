const Router = require('express');
const UserController = require('../controller/users.controller');
const db = require('../db/models/index');

class UserRouter {
  path = '/users';
  router = Router();

  controller = new UserController(db);
  constructor() {
    this.initializeRoutes();
  }
  initializeRoutes = () => {
    this.router.get(`${this.path}/getProfile`, this.controller.getProfile);
    this.router.post(
      `${this.path}/checkIfUserDetailsExist`,
      this.controller.checkIfUserDetailsExist
    );
    this.router.post(
      `${this.path}/addProfilePic`,
      this.controller.addProfilePicture
    );
  };


}
module.exports = UserRouter;
