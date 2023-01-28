let timerInterval;
let pausedInterval;

const spotifyContainer = document.querySelector(".spotify");
const spotifyNotPlaying = document.querySelector(".spotify-listen-nothing");

const spotifyImage = document.querySelector(".music-cover img");
const spotifyTitle = document.querySelector(".music-title b a");
const spotifyArtist = document.querySelector(".music-artist a");
const spotifyAlbum = document.querySelector(".music-album a");
const spotifyProgress = document.querySelector(".music-tracker");
const spotifyProgressTimers = document.querySelector(".timer").children;

const socket = io();

socket.on("playback", (playback) => {
  if (playback && playback.item) {
    updateUI(playback);
  } else {
    console.log("No current playback");
    updateUI(null);
  }
});

const addSecondToTimer = (playback) => {
  if (playback.progress_ms >= playback.item.duration_ms) {
    clearInterval(timerInterval);
    socket.emit("playbackChange", playback);
    return;
  }
  spotifyProgress.style.width = `${
    (playback.progress_ms / playback.item.duration_ms) * 100
  }%`;
  spotifyProgressTimers[0].innerText = new Date(playback.progress_ms)
    .toISOString()
    .substr(14, 5);
  spotifyProgressTimers[1].innerText = playback.is_playing ? "" : "Paused";
  spotifyProgressTimers[2].innerText = new Date(playback.item.duration_ms)
    .toISOString()
    .substr(14, 5);
  playback.progress_ms += 1000;
};

const updateUI = (playback) => {
  if (playback) {
    spotifyContainer.classList.remove("hidden");
    spotifyNotPlaying.classList.add("hidden");

    spotifyImage.src = playback.item.album.images[0].url;
    spotifyTitle.innerText = playback.item.name;
    spotifyTitle.href = playback.item.external_urls.spotify;
    spotifyArtist.innerText = playback.item.artists[0].name;
    spotifyArtist.href = playback.item.artists[0].external_urls.spotify;
    spotifyAlbum.innerText = playback.item.album.name;
    spotifyAlbum.href = playback.item.album.external_urls.spotify;

    spotifyProgress.style.width = `${
      (playback.progress_ms / playback.item.duration_ms) * 100
    }%`;
    spotifyProgressTimers[0].innerText = new Date(playback.progress_ms)
      .toISOString()
      .substr(14, 5);
    spotifyProgressTimers[1].innerText = playback.is_playing ? "" : "Paused";
    spotifyProgressTimers[2].innerText = new Date(playback.item.duration_ms)
      .toISOString()
      .substr(14, 5);

    if (playback.is_playing) {
      if (timerInterval) clearInterval(timerInterval);
      if (pausedInterval) clearInterval(pausedInterval);

      addSecondToTimer(playback);
      timerInterval = setInterval(() => {
        addSecondToTimer(playback);
      }, 1000);
    } else {
      if (timerInterval) clearInterval(timerInterval);
      if (pausedInterval) clearInterval(pausedInterval);
      pausedInterval = setInterval(() => {
        socket.emit("playbackChange", playback);
      }, 20000);
    }
  } else {
    spotifyContainer.classList.add("hidden");
    spotifyNotPlaying.classList.remove("hidden");
  }
};
