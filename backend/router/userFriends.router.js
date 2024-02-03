const Router = require('express');
const UserFriends = require('../controller/userFriends.controller');
const db = require('../db/models/index');

class UserFriendsRouter {
  path = '/userfriends';
  router = Router();

  controller = new UserFriends(db);
  constructor() {
    this.initializeRoutes();
  }
  initializeRoutes = () => {
    this.router.get(
      `${this.path}/getAllFriends`,
      this.controller.getAllFriends
    );
    this.router.delete(
      `${this.path}/removeFriend`,
      this.controller.removeFriend
    );
    this.router.post(`${this.path}/addFriend`, this.controller.addFriend);
    this.router.patch(
      `${this.path}/updateNickname`,
      this.controller.changeFriendNickName
    );
  };
}
module.exports = UserFriendsRouter;
