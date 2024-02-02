const BaseController = require('./base.controller');

class userController extends BaseController {
  constructor(db) {
    super();
    this.db = db;
  }

  //* To Do
  //* Create user
  //* Modify User
  //* Delete User
}

module.exports = userController;
