const Router = require('express');
const AuthController = require('../controller/auth.controller');
const db = require('../db/models/index');

class AuthRouter {
  path = '/auth';
  router = Router();

  controller = new AuthController(db);

  constructor() {
    this.initializeRoutes();
  }
  initializeRoutes = () => {
    this.router.post(`${this.path}/login`, this.controller.login);
    this.router.post(`${this.path}/register`, this.controller.register);
    this.router.post(`${this.path}/logout`, this.controller.logout);
  };
}

module.exports = AuthRouter;
