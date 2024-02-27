const Router = require('express');
const UserFriends = require('../controller/userFriends.controller');
const db = require('../db/models/index');
const checkAuth = require('../middleware/auth');

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
      // checkAuth,
      this.controller.getAllFriends
    );
    this.router.delete(
      `${this.path}/removeFriend`,
      checkAuth,
      this.controller.removeFriend
    );
    this.router.post(
      `${this.path}/addFriend`,
      // checkAuth,
      this.controller.addFriend
    );
    this.router.patch(
      `${this.path}/updateNickname`,
      checkAuth,
      this.controller.changeFriendNickName
    );
    this.router.get(
      `${this.path}/getSuggestedFriends`,
      // checkAuth,
      this.controller.getSuggestedFriends
    );
  };
}
module.exports = UserFriendsRouter;
