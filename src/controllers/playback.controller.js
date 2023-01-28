const SpotifyWebApi = require("spotify-web-api-node");

class PlaybackController {
  constructor() {
    this.spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    });
  }

  getCurrentPlayback(io) {
    this.spotifyApi.setAccessToken(process.env.SPOTIFY_ACCESS_TOKEN);
    this.spotifyApi
      .getMyCurrentPlayingTrack()
      .then((data) => {
        io.emit("playback", data.body);
      })
      .catch((err) => {
        console.log("Error getting current playback: ", err);
      });
  }
}

module.exports = PlaybackController;
