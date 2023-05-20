//You can edit ALL of the code here
// This is my function that will return the result of the search
function searchResult() {}

function createHeader(episodeList) {
  // The select input function
  const mainElem = document.getElementById("main");
  let headerContainer = document.createElement("div");
  mainElem.appendChild(headerContainer);
  // let pElement = document.createElement("p");
  // pElement.innerText = "I need to appear";
  // headerContainer.appendChild(pElement);
  console.log(headerContainer);
  let selectTag = document.createElement("select");
  selectTag.classList.add("select");
  selectTag.setAttribute("id", "selectId");
  headerContainer.appendChild(selectTag);
  // create options for the select tool

  for (let i = 0; i < episodeList.length; i++) {
    let optionElem = document.createElement("option");
    optionElem.text = `${episodeList[i].name} - S${episodeList[i].season}E${episodeList[i].number}`;
    optionElem.value = i;
    selectTag.appendChild(optionElem);
  }

  // This is my search box
  let searchInput = document.createElement("input");
  searchInput.classList.add("search");
  searchInput.id = "searchId";
  searchInput.type = "text";
  searchInput.placeholder = "Search episodes";
  headerContainer.appendChild(searchInput);
  searchInput.addEventListener("input", function () {
    let filteredEpisodes = [];
    moviesContainer = document.getElementById("movie-div-id");
    let typedWords = searchInput.value.toLowerCase();

    for (episode of episodeList) {
      let titleComparison = episode.name.toLowerCase();
      let summaryComparison = episode.summary.toLowerCase();
      if (
        titleComparison.includes(typedWords) ||
        summaryComparison.includes(typedWords)
      ) {
        filteredEpisodes.push(episode);
      }
    }
    // Clears the display
    moviesContainer.innerHTML = "";
    makePageForEpisodes(filteredEpisodes);
  });
}
function setup() {
  const allEpisodes = getAllEpisodes();
  // console.log(allEpisodes);
  createHeader(allEpisodes);
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

  rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  let moviesContainer = document.createElement("div");
  moviesContainer.classList.add("movies-container");
  moviesContainer.id = "movie-div-id";
  rootElem.appendChild(moviesContainer);

  for (episode in episodeList) {
    console.log(episodeList[episode].name);

    let topContainer = document.createElement("div");
    topContainer.classList.add("top-container");
    moviesContainer.appendChild(topContainer);

    // This is my movie card
    let movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    topContainer.appendChild(movieCard);

    // This inserts the title of the movie to the movie card
    let episodeName = document.createElement("p");
    episodeName.classList.add("episode-name");
    movieCard.appendChild(episodeName);

    // Storing the episode name, series and episode number into variables
    let titleName = episodeList[episode].name;

    // Putting a zero for seasons and episodes that are less than 10
    let seasonNumber;
    if (episodeList[episode].season < 10) {
      seasonNumber = `S0${episodeList[episode].season}`;
    } else {
      seasonNumber = `S${episodeList[episode].season}`;
    }

    let episodeNumber;
    if (episodeList[episode].number < 10) {
      episodeNumber = `E0${episodeList[episode].number}`;
    } else {
      episodeNumber = `E${episodeList[episode].number}`;
    }
    episodeName.innerText =
      titleName + " " + seasonNumber + " " + episodeNumber;

    // This inserts a picture of the movie to the movie card
    let movieImage = document.createElement("img");
    movieImage.classList.add("movie-image");
    movieImage.src = episodeList[episode].image.medium;
    movieCard.appendChild(movieImage);

    // To add a summary to the moviecard
    let summaryP = document.createElement("p");
    summaryP.classList.add("summary-p");
    movieCard.appendChild(summaryP);
    summaryP.innerText = episodeList[episode].summary;
  }
  // console.log(episodeList);
}

window.onload = setup;
