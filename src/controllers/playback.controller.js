const SpotifyWebApi = require("spotify-web-api-node");

class PlaybackController {
  constructor() {
    this.spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    });
  }

  async getCurrentPlayback(socket = null) {
    if (!process.env.SPOTIFY_ACCESS_TOKEN) {
      console.log("No access token, wait for refresh");
      return;
    }
    this.spotifyApi.setAccessToken(process.env.SPOTIFY_ACCESS_TOKEN);
    const reponse = await this.spotifyApi.getMyCurrentPlaybackState();
    const data = reponse.body;
    if (socket) {
      socket.emit("playback", data);
    }
    return data;
  }

  async getVerificationPlayback(socket, initialPlayback) {
    let verificationPlayback = await this.getCurrentPlayback();
    if (
      initialPlayback &&
      verificationPlayback &&
      initialPlayback.item &&
      verificationPlayback.item
    ) {
      if (
        initialPlayback.item.id !== verificationPlayback.item.id ||
        initialPlayback.is_playing !== verificationPlayback.is_playing
      ) {
        this.getCurrentPlayback(socket);
      }
    }
  }
}

module.exports = PlaybackController;
