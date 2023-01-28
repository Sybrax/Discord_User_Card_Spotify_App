require("module-alias/register");
require("dotenv").config();
const express = require("express");
const path = require("path");
const IO = require("socket.io");
const morgan = require("morgan");
const errorHandler = require("errorhandler");
const index = require("@src/routers/");

const port = process.env.PORT || 3000;

const app = express();
const server = app.listen(port);
const io = IO(server);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", index);

require("./sockets/sockets")(io);

if (process.argv[2] == "--devmode") {
  app.use(errorHandler());
  app.use(morgan("dev"));
} else {
  app.use((err, req, res) => {
    const code = err.code || 500;
    res.status(code).json({
      code: code,
      message: code === 500 ? null : err.message,
    });
  });
}

server.on("listening", () => {
  console.log(`Listening on port http://localhost:${port}`);
});
