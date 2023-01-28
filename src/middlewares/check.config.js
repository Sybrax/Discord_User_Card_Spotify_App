exports.checkProcessEnv = (req, res, next) => {
  if (
    !process.env.SPOTIFY_CLIENT_ID ||
    !process.env.SPOTIFY_CLIENT_SECRET ||
    !process.env.SPOTIFY_REDIRECT_URI ||
    !process.env.SPOTIFY_REFRESH_TOKEN
  ) {
    return res.status(500).json({
      code: 500,
      message:
        "Missing Spotify credentials in .env file. Please check the README.md file for more information.",
    });
  } else {
    next();
  }
};
