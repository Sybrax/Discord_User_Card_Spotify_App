const express = require("express");

class GeneralRouter {
  constructor() {
    this.router = express.Router();

    this.router.get("/", (req, res) => {
      res.render("index");
    });
  }
}

module.exports = GeneralRouter;
