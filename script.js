//You can edit ALL of the code here
// This is my function that will return the result of the search
function searchResult() {}

function createHeader(episodeList) {
  // The select input function
  const mainElem = document.getElementById("main");
  let headerContainer = document.createElement("div");
  headerContainer.classList.add("head-container");
  mainElem.appendChild(headerContainer);

  // fetch("https://api.tvmaze.com/shows").then(res.json()).then(data => console.log(data));
  // let pElement = document.createElement("p");
  // pElement.innerText = "I need to appear";
  // headerContainer.appendChild(pElement);
  // console.log(headerContainer);
  function populateShowList() {
    let dropdown = document.getElementById("select");

    fetch("https://api.tvmaze.com/shows")
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        data.forEach(show => {
          let option = document.createElement("option");
          option.text = show.name;
          option.value = show.id;
          dropdown.appendChild(option);
        });
      })
      .catch(error => console.error(error));
  }
  // document.getElementById("select").addEventListener("change", populateShowList);
  
  function displaySelectedShow() {
    let selectedShowId = document.getElementById("showList").value;
    let showDetailsContainer = document.getElementById("showDetails");

    if (selectedShowId !== "") {
      fetch("https://api.tvmaze.com/shows/" + selectedShowId)
        .then(response => response.json())
        .then(show => {
          // Clear previous show details
          showDetailsContainer.innerHTML = "";

          // Create elements to display show details
          let heading = document.createElement("h2");
          heading.textContent = show.name;

          let summary = document.createElement("p");
          summary.innerHTML = show.summary;

          // Append show details to the container
          showDetailsContainer.appendChild(heading);
          showDetailsContainer.appendChild(summary);
        })
        .catch(error => console.error(error));
    } else {
      // Clear show details if no show is selected
      showDetailsContainer.innerHTML = "";
    }
  }

  // Call the populateShowList function to fetch shows and populate the dropdown
  populateShowList();

  // Creating the select episode element
  let selectEpisode = document.createElement("select");
  selectEpisode.classList.add("select");
  selectEpisode.setAttribute("id", "selectId");
  headerContainer.appendChild(selectEpisode);

  // Create the select show element 
  let selectShow = document.createElement("select");
  selectShow.classList.add("select");
  selectShow.setAttribute("id", "selectShowID");
  selectShow.addEventListener("change", displaySelectedShow);
  // Creating the option element
  let defaultOption = document.createElement("option");
  defaultOption.text = "Select a show";
  defaultOption.value = "";
  // defaultOption.addEventListener(onchange, )
selectShow.appendChild(defaultOption);

  headerContainer.appendChild(selectShow);

  // creating options for the shows tool
for (let i = 0; i < getAllShows.length; i++) {
  let showsOptionElement = document.createElement("option");
  showsOptionElement.text = `${getAllShows[i].name}`;
  showsOptionElement.value = i;
  selectShow.appendChild(showsOptionElement);
}
  


  // create options for the select episode tool

  for (let i = 0; i < episodeList.length; i++) {
    let EpisodeOptionElement = document.createElement("option");
    EpisodeOptionElement.text = `${episodeList[i].name} - S${episodeList[i].season}E${episodeList[i].number}`;
    EpisodeOptionElement.value = i;
    selectEpisode.appendChild(EpisodeOptionElement);
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
    // console.log(episodeList[episode].name);

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
    summaryP.innerHTML = episodeList[episode].summary;
  }
  // console.log(episodeList);
}
// let tvShowCode = 543;
// let episodeAPI = `https://api.tvmaze.com/shows/${tvShowCode}/episodes`;
// async function fetchEpisodesJSON() {
//   const response = await fetch(episodeAPI);
//   const episodes = await response.json();
//   return episodes;
// }

// fetchEpisodesJSON().then((episodes) => {
//   console.log(episodes); // fetched movies
// });
window.onload = setup;
