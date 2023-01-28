<body style="width: 100%; height: 100%">
  
  <h1 align="center">Discord User Card - Spotify Dynamic Card</h1>
  <p align="center">
    <a target='_blank' href='https://developer.mozilla.org/fr/'><img src="https://forthebadge.com/images/badges/uses-html.svg"></a>&nbsp<a target='_blank' href='https://developer.mozilla.org/fr/'><img src="https://forthebadge.com/images/badges/uses-css.svg"></a>&nbsp<a target='_blank' href='https://developer.mozilla.org/fr/'><img src="https://forthebadge.com/images/badges/uses-js.svg"></a>
  </p>
</body>

## Description :

Discord User Card is a node js application that allows you to display the current song you are listening on spotify. It is very easy to use and you can customize it as you wish.

> NOTE : Spotify WebSocket is not free to use, so the request is limited and the song may not be updated in real time. Morevever you need to have a spotify premium account to use this application, spotify free account is not supported... I love you spotify free account users but i can't do anything for you :/

## Installation :

1. Clone the repository : `git clone https://github.com/Sybrax/Discord_User_Card_Spotify_App`
2. Install the dependencies : `npm install`
3. Create spotify application : <a href="https://developer.spotify.com/dashboard/applications">here</a>
4. In the spotify application, add `http://localhost:80` or your domain in the redirect uri
5. Copy the client id and the client secret and paste it in the `.env` file. You have to put the same redirect uri in the `.env` file
6. You have to get your code, do a request to `https://accounts.spotify.com/authorize?client_id=<client_id>&response_type=code&redirect_uri=<redirect_uri>&scope=user-read-private%20user-read-currently-playing` and copy the code in the url.
7. You have to get your refresh token now. Type `npm run get-refresh-token <code>` in the terminal and copy the refresh token in the `.env` file
8. That's it, you can now start the application with `npm start` or `npm run dev` if you want to use nodemon.

## Preview :

<img src="https://i.imgur.com/ojXknMm.png">

Demo : <a href="https://sybrax.github.io/Discord-User-Card/">here</a> (demo of the style of the card, not the spotify dynamic card)

Download : <a href="https://github.com/Sybrax/Discord_User_Card_Spotify_App/releases/download/1.0.0/Discord_Spotify_App_1.0.0.rar">here</a>

## Community :

Join creators-area to see more of the community : <a href="https://discord.gg/fHYmhV3r3k">here</a>

## Author :

<p>
  <a href="https://github.com/Sybrax"><img width="45" src="https://avatars.githubusercontent.com/u/45593750?s=64&v=4" alt="Lohan" style="max-width: 100%;"></a>
</p>
 
</ul>
