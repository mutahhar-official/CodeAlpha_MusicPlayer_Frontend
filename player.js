const curTime = document.getElementById("cur");
const durTime = document.getElementById("dur");

function fmt(t){
  const m = Math.floor(t/60);
  const s = Math.floor(t%60).toString().padStart(2,"0");
  return m + ":" + s;
}

const playlist = JSON.parse(localStorage.getItem("playlist")) || [];
let index = Number(localStorage.getItem("songIndex")) || 0;

const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const vol = document.getElementById("vol");
const likeBtn = document.getElementById("likeBtn");

let liked = JSON.parse(localStorage.getItem("likedSongs")) || [];

/* ---------- LOAD SONG ---------- */

function loadSong(i){
  const s = playlist[i];

  cover.src = s.img;
  title.textContent = s.title;
  artist.textContent = s.artist;
  audio.src = s.file;

  curTime.textContent = "0:00";
  durTime.textContent = "0:00";
  progress.value = 0;

  updateLikeUI();

  audio.onloadedmetadata = () => {
    durTime.textContent = fmt(audio.duration);
  };

  audio.play();
}

/* ---------- PLAY / PAUSE ---------- */

function updatePlayUI(){
  playBtn.textContent = audio.paused ? "▶" : "⏸";
}

playBtn.onclick = () => {
  if(audio.paused) audio.play();
  else audio.pause();
};

audio.onplay = updatePlayUI;
audio.onpause = updatePlayUI;

/* ---------- NEXT / PREV ---------- */

nextBtn.onclick = () => {
  index = (index + 1) % playlist.length;
  loadSong(index);
};

prevBtn.onclick = () => {
  index = (index - 1 + playlist.length) % playlist.length;
  loadSong(index);
};

audio.onended = nextBtn.onclick;

/* ---------- PROGRESS ---------- */

audio.ontimeupdate = () => {
  if(audio.duration){
    progress.value = (audio.currentTime / audio.duration) * 100;
    curTime.textContent = fmt(audio.currentTime);
  }
};

/* ---------- VOLUME ---------- */

//const vol = document.getElementById("vol");
const voltxt = document.getElementById("voltxt");

/* set initial */
audio.volume = vol.value / 100;
voltxt.textContent = vol.value + "%";

/* update on change */
vol.oninput = () => {
  audio.volume = vol.value / 100;
  voltxt.textContent = vol.value + "%";
};

vol.addEventListener("input", () => {
  audio.volume = vol.value / 100;
  voltxt.textContent = vol.value + "%";
});

/* ---------- LIKE BUTTON ---------- */

function updateLikeUI(){
  if(liked.includes(index)){
    likeBtn.textContent = "♥";
    likeBtn.style.color = "#ff7ad9";
  } else {
    likeBtn.textContent = "♡";
    likeBtn.style.color = "";
  }
}

likeBtn.onclick = () => {
  if(liked.includes(index)){
    liked = liked.filter(i => i !== index);
  } else {
    liked.push(index);
  }

  localStorage.setItem("likedSongs", JSON.stringify(liked));
  updateLikeUI();
};

/* ---------- INIT ---------- */

loadSong(index);
updatePlayUI();