const fetchMusic = async (query) => {
  let res = await fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=" + query
  );
  let { data } = await res.json();
  const albums = [];
  data.forEach((song) => {
    let soloId = albums.map((album) => album.id);
    if (!soloId.includes(song.album.id)) {
      albums.push(song.album);
    }
  });
  console.log(albums);
  let row = document.querySelector("#esercizio1");
  row.innerHTML = albums.slice(0, 4).map((al) => {
    return ` <div class='col col-2'> <div class="card">
          <img src="${al.cover_xl}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title text-truncate">${al.title}</h5>
          </div>
        </div> </div>`;
  });
};

const getSingleSong = async (songTitle) => {
  let res = await fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=" + songTitle
  );
  let {
    data: [song],
  } = await res.json();
  console.log(song);
  const section = document.querySelector("#esercizio2");
  section.innerHTML = `<div class="card mb-3" >
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${song.album.cover_xl}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${song.title}</h5>
          <p class="card-text">${song.album.title}</p>
          <p class="card-text"><small class="text-muted">${song.artist.name}</small></p>
        </div>
      </div>
    </div>
  </div>`;
};

const getAlbumByQuery = async (query) => {
  let res = await fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=" + query
  );
  const {
    data: [{ album }],
  } = await res.json();
  console.log(album);
  const carInn = document.querySelector(".carousel-inner");
  let isFirst = carInn.childNodes.length < 1;
  console.log(isFirst);
  carInn.innerHTML += `<div class="carousel-item ${!isFirst ? "active" : ""}">
      <img src="${album.cover_xl}" class="d-block w-100" alt="..." />
      <div class="carousel-caption d-none d-md-block">
        <h5>${album.title}</h5>
      </div>
    </div>
    `;
};
window.onload = () => {
  fetchMusic("50cent");
  getSingleSong("pianoforte a vela");
  const albumQueries = ["Sticky Fingers", "Forever king", "after hours"];
  for (const album of albumQueries) {
    getAlbumByQuery(album);
  }
};
