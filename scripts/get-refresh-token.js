require("dotenv").config();
const axios = require("axios");

const args = process.argv.slice(2);

if (
  !process.env.SPOTIFY_CLIENT_ID ||
  !process.env.SPOTIFY_CLIENT_SECRET ||
  !process.env.SPOTIFY_REDIRECT_URI
) {
  console.log(
    "You need to set the CLIENT_ID, CLIENT_SECRET and REDIRECT_URI environment variables before running this script."
  );
  process.exit(1);
} else if (args.length < 1) {
  console.log("Usage: node get-refresh-token.js <code>");
  process.exit(1);
} else if (args.length > 1) {
  console.log("Too many arguments. Usage: node get-refresh-token.js <code>");
  process.exit(1);
}

const code = args[0];

const exchangeCodeForAccessAndRefreshTokens = async (code) => {
  const { data } = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return data.refresh_token;
};

const printRefreshToken = async (code) => {
  try {
    const refreshToken = await exchangeCodeForAccessAndRefreshTokens(code);
    console.log("Your beautiful refresh token is:");
    console.log("-> " + refreshToken);
  } catch (error) {
    console.log(error);
  }
};

printRefreshToken(code);
