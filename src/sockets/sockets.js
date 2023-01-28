const PlaybackController =
  new (require("@src/controllers/playback.controller"))();

module.exports = function (io) {
  io.on("connection", async (socket) => {
    console.log("Client connected");

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  setInterval(async () => {
    if (!process.env.SPOTIFY_ACCESS_TOKEN) return;
    await PlaybackController.getCurrentPlayback(io);
  }, 1000);
};
