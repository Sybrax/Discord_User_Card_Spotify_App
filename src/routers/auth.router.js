const express = require("express");
const AuthController = require("@src/controllers/auth.controller");

class AuthRouter {
  constructor() {
    this.router = express.Router();
    this.controller = new AuthController();

    this.router.use(this.controller.checkAccessToken.bind(this.controller));
  }
}

module.exports = AuthRouter;
