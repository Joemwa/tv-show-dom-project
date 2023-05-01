//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  
  for (episode in episodeList) {
    
    console.log(episodeList[episode].name);
    
    
    
    let topContainer = document.createElement("div");
    topContainer.classList.add("top-container");
    rootElem.appendChild(topContainer);
    
    // This is my movie card
    let movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    topContainer.appendChild(movieCard);

// This inserts the title of the movie to the movie card
    let episodeName = document.createElement("p");
    movieCard.appendChild(episodeName);
    episodeName.innerText = episodeList[episode].name;

// This inserts a picture of the movie to the movie card
    let movieImage = document.createElement("img");
    movieImage.classList.add("movie-image");
    movieImage.src = episodeList[episode].image.medium;
    movieCard.appendChild(movieImage);


// To add a summary to the moviecard
    let summaryP = document.createElement("p");
    movieCard.appendChild(summaryP);
    summaryP.innerText = episodeList[episode].summary;


  }
  console.log(episodeList);
  
 

}

window.onload = setup;
