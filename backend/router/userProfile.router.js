const Router = require('express');
const UserProfileController = require('../controller/userProfiles.controller');
const db = require('../db/models/index');

class UserProfileRouter {
  path = '/UserProfiles';
  router = Router();

  controller = new UserProfileController(db);
  constructor() {
    this.initializeRoutes();
  }
  initializeRoutes = () => {
    // this.router.get(`${this.path}/getUserProfiles`, this.controller.getUserProfiles);
    this.router.post(`${this.path}/addOrUpdateMotherTongue`,this.controller.addOrUpdateMotherTongue);
    this.router.post(`${this.path}/addLearningLanguage`,this.controller.addLearningLanguage);
    this.router.put(`${this.path}/updateUser`,this.controller.updateUser);
    // this.router.post(
    //   `${this.path}/addProfilePic`,
    //   this.controller.addProfilePicture
    // );
  };


}
module.exports = UserProfileRouter;
