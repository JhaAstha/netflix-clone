const API_KEY = "e31dcf9f0fbfd728ee3a354ac717e5f0"; 
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/original";

// Banner Elements
const banner = document.getElementById("banner");
const bannerTitle = document.getElementById("banner-title");
const bannerDesc = document.getElementById("banner-desc");

// Search Elements
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const searchTitle = document.getElementById("searchTitle");

// Load Banner
async function loadBanner() {
  const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
  const data = await res.json();
  const movie = data.results[0];

  banner.style.backgroundImage =
    `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2)),
     url(${IMG_URL + movie.backdrop_path})`;

  bannerTitle.innerText = movie.title;
  bannerDesc.innerText = movie.overview.slice(0, 150) + "...";
}

// Fetch Movies (with hover overlay)
async function fetchMovies(url, containerId) {
  const res = await fetch(url);
  const data = await res.json();
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  data.results.forEach(movie => {
    if (movie.poster_path) {
      const posterContainer = document.createElement("div");
      posterContainer.classList.add("poster-container");

      const img = document.createElement("img");
      img.src = IMG_URL + movie.poster_path;

      const overlay = document.createElement("div");
      overlay.classList.add("overlay");

      const title = document.createElement("p");
      title.innerText = movie.title;

      const playBtn = document.createElement("button");
      playBtn.innerText = "Play";

      overlay.appendChild(title);
      overlay.appendChild(playBtn);

      posterContainer.appendChild(img);
      posterContainer.appendChild(overlay);

      container.appendChild(posterContainer);
    }
  });
}

// Load Banner and Rows
loadBanner();
fetchMovies(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`, "trending");
fetchMovies(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`, "toprated");
fetchMovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`, "action");

// Search Functionality
searchInput.addEventListener("keyup", async () => {
  const query = searchInput.value;

  if (query.length < 3) {
    searchResults.innerHTML = "";
    searchTitle.style.display = "none";
    return;
  }

  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );

  const data = await res.json();
  searchResults.innerHTML = "";
  searchTitle.style.display = "block";

  data.results.forEach(movie => {
    if (movie.poster_path) {
      const posterContainer = document.createElement("div");
      posterContainer.classList.add("poster-container");

      const img = document.createElement("img");
      img.src = IMG_URL + movie.poster_path;

      const overlay = document.createElement("div");
      overlay.classList.add("overlay");

      const title = document.createElement("p");
      title.innerText = movie.title;

      const playBtn = document.createElement("button");
      playBtn.innerText = "Play";

      overlay.appendChild(title);
      overlay.appendChild(playBtn);

      posterContainer.appendChild(img);
      posterContainer.appendChild(overlay);

      searchResults.appendChild(posterContainer);
    }
  });
});