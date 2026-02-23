const songs = [
  // I have removed all the audio tracks and images to avoid any copyright issues but I have shown them in Explanatory video on my LinkedIn.
  { title:"Dreams", artist:"Musicx", img:"Image 1.png", file:"Audio 1.mp3" },
  { title:"Good Byes", artist:"Broken Halos", img:"Image 4.png", file:"Audio 2.mp3" },
  { title:"Poetic Rythms", artist:"Sapphire Silence", img:"Image 3.png", file:"Audio 3.mp3" },
  { title:"Dark Nights", artist:"Electro Knights", img:"Image 2.png", file:"Audio 4.mp3" }
];

localStorage.setItem("playlist", JSON.stringify(songs));

songs.forEach((s,i)=>{
  const div = document.createElement("div");
  div.className="card";
  div.innerHTML = `
    <img src="${s.img}">
    <h3>${s.title}</h3>
    <p>${s.artist}</p>
  `;

  div.onclick = () => {
    localStorage.setItem("songIndex", i);
    location.href="player.html";
  };

  songGrid.appendChild(div);
});

const grid = document.getElementById("songGrid");

songs.forEach((s,i)=>{
  const div = document.createElement("div");
  div.className="card";
  div.innerHTML = `
    <img src="${s.img}">
    <h3>${s.title}</h3>
    <p>${s.artist}</p>
  `;
  div.onclick = () => {
    localStorage.setItem("song", JSON.stringify(s));
    location.href="player.html";
  };
  grid.appendChild(div);
});