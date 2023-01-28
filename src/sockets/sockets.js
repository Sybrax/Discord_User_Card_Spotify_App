const PlaybackController =
  new (require("@src/controllers/playback.controller"))();

module.exports = function (io) {
  io.on("connection", async (socket) => {
    console.log("Client connected");
    let timeout;
    let initialPlayback = await PlaybackController.getCurrentPlayback(socket);
    socket.on("playbackChange", () => {
      PlaybackController.getCurrentPlayback(socket);
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        PlaybackController.getVerificationPlayback(socket, initialPlayback);
      }, 20000);
    });
    timeout = setTimeout(async () => {
      PlaybackController.getVerificationPlayback(socket, initialPlayback);
    }, 20000);
    socket.on("disconnect", () => {
      clearTimeout(timeout);
      console.log("Client disconnected");
    });
  });
};
