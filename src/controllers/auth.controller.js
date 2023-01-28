const SpotifyWebApi = require("spotify-web-api-node");

class AuthController {
  constructor() {
    if (!process.env.SPOTIFY_REFRESH_TOKEN) {
      console.log(
        "Missing Spotify credentials in .env file. Please check the README.md file for more information."
      );
      return;
    }
    this.spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    });

    this.checkAccessToken(null, null, null);
    setInterval(() => {
      this.checkAccessToken(null, null, null);
    }, 30 * 60 * 1000);
  }

  checkAccessToken(req, res, next) {
    if (!process.env.SPOTIFY_ACCESS_TOKEN) {
      console.log("No access token. Refreshing...");
      this.getAccessToken(req, res, next);
      return;
    }
    this.spotifyApi.setAccessToken(process.env.SPOTIFY_ACCESS_TOKEN);
    this.spotifyApi
      .getMyCurrentPlayingTrack()
      .then(() => {
        console.log("Access token is valid");
        if (next) next();
      })
      .catch((err) => {
        console.log("Error checking access token. Refreshing...");
        this.getAccessToken(req, res, next);
      });
  }

  getAccessToken(req, res, next) {
    this.spotifyApi.setRefreshToken(process.env.SPOTIFY_REFRESH_TOKEN);
    this.spotifyApi
      .refreshAccessToken()
      .then((data) => {
        const accessToken = data.body["access_token"];
        this.spotifyApi.setAccessToken(accessToken);
        process.env.SPOTIFY_ACCESS_TOKEN = accessToken;
        console.log("Access token refreshed");
        if (next) next();
      })
      .catch((err) => {
        console.log("Error refreshing access token: ", err);
        if (res) res.send("Error refreshing access token: " + err);
      });
  }
}

module.exports = AuthController;
