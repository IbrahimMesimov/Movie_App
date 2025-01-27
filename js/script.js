const apiKey = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const apiUrl =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=1";

getMovies(apiUrl);
async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
    },
  });
  const respData = await resp.json();
  console.log(respData);

  showMovie(respData);
}

function getClassByRate(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote > 5) {
    return "orange";
  } else {
    return "red";
  }
}

function showMovie(data) {
  const moviesEl = document.querySelector(".movies");

  document.querySelector(".movies").innerHTML = "";

  data.items.forEach((items) => {
    console.log(data);

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    //console.log(movieEl);

    movieEl.innerHTML = `
    <div class="movie_cover-inner">
          <img
            src="${items.posterUrlPreview}"
            class="movie-cover"
            alt="${items.nameRU}"
          />
          <div class="movie_cover-darkened"></div>
        </div>
        <div class="movie-info">
          <div class="movie-title">${items.nameRu}</div>
          <div class="movie-category">${items.genres.map(
            (genre) => ` ${genre.genre}`
          )}</div>
          <div class="movie-average movie-average_${getClassByRate(
            items.ratingImdb
          )}">${items.ratingImdb}</div>
        </div>
    `;
    moviesEl.appendChild(movieEl);
  });
}
