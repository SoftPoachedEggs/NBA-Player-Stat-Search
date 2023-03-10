// Global Scope variable
var player;

//------------------nav bar do not delete--------------------------
const nav = document.querySelector(".nav"),
  searchIcon = document.querySelector("#searchIcon"),
  navOpenBtn = document.querySelector(".navOpenBtn"),
  navCloseBtn = document.querySelector(".navCloseBtn");

searchIcon.addEventListener("click", () => {
  nav.classList.toggle("openSearch");
  nav.classList.remove("openNav");
  if (nav.classList.contains("openSearch")) {
    return searchIcon.classList.replace("uil-search", "uil-times");
  }
  searchIcon.classList.replace("uil-times", "uil-search");
});

//------------------Player Search (NBA API)--------------------------

//resultcontentEl is a temporary result content box and will likely need to be changed to where we want search results
//update query selector to target where you want search results to print. search results will display. we can make the
//results a clickable div or use a view more link. 
let resultContentEl = document.querySelector('#search-result-content');
let playerStatCardSectionEl = document.querySelector('#playerStatCardSection');
//this is display card for player bio (age / birthplace/ height etc...)
let playerBioEl = document.querySelector('#playerBioCard');
//search box input query selector
let searchFormEl = document.querySelector('#searchInput');
//this will target the submit button. i would add the same id to whatever the submit button to the HTML
let submitSearchEl = document.querySelector('#searthBtn');
let playerImageEl = document.querySelector('#playerImg');
let playerAwards = document.querySelector('#playerAwards');

//api options.... do not touch. 
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ed2b7708famshda6e1bf50647febp12f2aajsn285f70f37488',
		'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
	}
};
//--------------------Search Bar Feature----------------------

//the event being passed in is the submit click
function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#searchInput').value;
  if (!searchInputVal) {
    //make this an alert message to let user know input is needed. 
    console.error('You need a search input value!');
    return;
  }
  searchForPlayerAPI(searchInputVal);
  console.log("search input", searchInputVal);
}

if (submitSearchEl) {
  // Not called
  submitSearchEl.addEventListener('click', handleSearchFormSubmit);

  };

console.log("search button clicked", )

//-------------------------API Player Search Function---------------

//passing in the search input value when the search function is called. 
let searchForPlayerAPI = (searchedName) => {
  let name = searchedName;
  let searchedPlayerID = "";
  fetch('https://api-nba-v1.p.rapidapi.com/players?search=' + name, options)
  .then(response => { 
    //console.log(response);
  return response.json()
  }
  )
  .then((response) => {
      console.log("is it logging? ", response)
      if (response.response.length === 0) {
        console.log('No results found!');
        resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
      } else {
        resultContentEl.textContent = '';
        for (var i = 0; i < response.response.length; i++) {
          console.log("response.response.length: ", response.response.length)
          printSearchResults(response.response[i]);
        }
      }
    })
  .catch(error => {
    console.log(error)
    });
    
    function printSearchResults(resultObj) {
      console.log(resultObj);
      let start = resultObj.nba.start ? resultObj.nba.start : null;
      let pro = resultObj.nba.pro ? resultObj.nba.pro : null;
      if (start !== null && pro !== null) {
      
      // set up `<div>` to hold result content
      var resultCard = document.createElement('div');
      //change style to match at later date. 
      resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');
      resultCard.setAttribute('id', resultObj.id);
    
      var resultBody = document.createElement('div');
      resultBody.classList.add('card-body');
      resultCard.append(resultBody);
    
      var titleEl = document.createElement('h3');
      titleEl.textContent = resultObj.firstname + " " + resultObj.lastname;

      //display image of player//
      var thumbNailEl = document.createElement('img');
      var url = "https://en.wikipedia.org/w/api.php?" +
        new URLSearchParams({
            origin: "*",
            action: "query",
            prop:"pageimages",
            piprop:"thumbnail",
            pithumbsize: "100",
            titles: resultObj.firstname + " " + resultObj.lastname,
            format: "json",
        });
        fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(data) {
          printImage(data);
        })
        .catch(function(error){console.log(error);});
        
        var thumbNailEl = document.createElement('img');
        resultCard.append(thumbNailEl);

        let printImage= (data) => {
        var pages = data.query.pages;
        var imgURL;
        // Checks if null
        if ( Object.values(pages)[0].thumbnail.source == null ) {
          imgURL = "";
        } else {
          // If source valid sets imgURL to the source
          imgURL = Object.values(pages)[0].thumbnail.source;
        }
        
        //img element here
        thumbNailEl.src = imgURL;

      }

      var bodyContentEl = document.createElement('p');
        if (resultObj.nba.start) {
          bodyContentEl.innerHTML +=
          '<strong>NBA Start:</strong> ' + resultObj.nba.start + '<br/>';
        } else {
          bodyContentEl.innerHTML +=
          '<strong>NBA Start:</strong> No record on file.' + '<br/>';
        }

        if (resultObj.nba.pro) {
        bodyContentEl.innerHTML +=
          '<strong>Years Pro:</strong> ' + resultObj.nba.pro + '<br/>';
        } else {
          bodyContentEl.innerHTML +=
          '<strong>Years Pro:</strong> No record on file.' + '<br/>'
        }

        if (resultObj.id) {
        bodyContentEl.innerHTML +=
          '<strong>id:</strong> ' + resultObj.id + '<br/>';
          
        } else {
          bodyContentEl.innerHTML +=
          '<strong>id:</strong> No record on file.' + '<br/>'
        }
        //make logic to filter out records with more than two missing. 
      
      let playerName = resultObj.firstname + " " + resultObj.lastname
      var linkButtonEl = document.createElement('a');
      linkButtonEl.textContent = 'View Stat Card';
      linkButtonEl.addEventListener("click", function(){
        displaySelectedPlayer(resultObj.id);
        printPlayerProfile(resultObj.id);
        savePlayerIDs(resultObj.id, playerName);
      });
      //linkButtonEl.setAttribute('href', "./player-page.html");
      resultBody.append(titleEl, bodyContentEl, linkButtonEl);
    
      resultContentEl.append(resultCard);

      } }
    }




//--------------------Display Player Bio Card API ----------------------
//use below fetch address and pass in the playerNumber variable once the player number has been selected. 
let printPlayerProfile = (selectedPlayerID) => {
let playerID = selectedPlayerID;
console.log(playerID);
fetch('https://api-nba-v1.p.rapidapi.com/players?id=' + playerID , options)
//fetch('https://api-nba-v1.p.rapidapi.com/players?id=220', options)
.then(response => { 
  //console.log(response);
return response.json()
})
.then((response) => {
    printPlayerBio(response.response[0]);
    console.log("fetch working?", response.response)
})
.catch(error => {
  console.log(error)
  });

let printPlayerBio = (printBio) => {
  console.log("print player function", printBio)

// variable
player = printBio.firstname + " " + printBio.lastname;
/*
  Image API From WIKI
*/
  var url = "https://en.wikipedia.org/w/api.php?" +
    new URLSearchParams({
        origin: "*",
        action: "query",
        prop:"pageimages",
        piprop:"thumbnail",
        pithumbsize: "400",
        titles: printBio.firstname + " " + printBio.lastname,
        format: "json",
    });
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
      printImage(data);
    })
    .catch(function(error){console.log(error);});
    
    let printImage= (data) => {
      // Resets image
      var imgURL = "";
      playerImageEl.src = imgURL;
      // Default operations
      var pages = data.query.pages;
      // Checks if the thumbnail has an available source
      if ( Object.values(pages)[0].thumbnail.source == null ) {
        imgURL = "";
      } else {
        // If source valid sets imgURL to the source
        imgURL = Object.values(pages)[0].thumbnail.source;
      }
      //Sets the img element to the pulled source URL
      playerImageEl.src = imgURL;
    }
  // Clear inner html
  playerBioEl.innerHTML = "";

  //****Print BIO elements to page****
  playerBioEl.innerHTML +=
    '<h2><strong>' + printBio.firstname + " " +  printBio.lastname + '<br/></h2>';
  if (printBio.birth.date) {
    playerBioEl.innerHTML +=
    '<strong>Birth Date: </strong> ' + printBio.birth.date+ '<br/>';
  } else {
    playerBioEl.innerHTML +=
    '<strong>Birth Date: </strong> No record on file.' + '<br/>'
  }

  if (printBio.nba.pro) {
    playerBioEl.innerHTML +=
    '<strong>Time Pro: </strong> ' + printBio.nba.pro + '<br/>';
  } else {
    playerBioEl.innerHTML +=
    '<strong>Time Pro: </strong> No record on file.' + '<br/>';
  }

  if (printBio.nba.start) {
    playerBioEl.innerHTML +=
    '<strong>NBA Start: </strong> ' + printBio.nba.start + '<br/>';
  } else {
    playerBioEl.innerHTML +=
    '<strong>NBA Start: </strong> No record on file.' + '<br/>';
  }

  if (printBio.nba.pro) {
    playerBioEl.innerHTML +=
    '<strong>Years Pro: </strong> ' + printBio.nba.pro + '<br/>';
  } else {
    playerBioEl.innerHTML +=
    '<strong>Years Pro: </strong> No record on file.' + '<br/>'
  }

  if (printBio.height.feets) {
    playerBioEl.innerHTML +=
    '<strong>Height: </strong> ' + printBio.height.feets + ' ft. ' + printBio.height.inches + ' in.' + '<br/>';
  } else {
    playerBioEl.innerHTML +=
    '<strong>Height: </strong> No record on file.' + '<br/>'
  }

  if (printBio.weight.pounds) {
    playerBioEl.innerHTML +=
    '<strong>Weight: </strong> ' + printBio.weight.pounds + ' lbs.' + '<br/>';
  } else {
    playerBioEl.innerHTML +=
    '<strong>Weight: </strong> No record on file.' + '<br/>'
  }

  if (printBio.height.feets) {
    playerBioEl.innerHTML +=
    '<strong>College: </strong> ' + printBio.college + ' in.' + '<br/>';
  } else {
    playerBioEl.innerHTML +=
    '<strong>College: </strong> No record on file.' + '<br/>'
  }

  /* 
    Gets html for page and formats to basic string
*/
var url = "https://en.wikipedia.org/w/api.php?" +
/* Sets search parameters for the api to target */
    new URLSearchParams({
        origin: "*",
        action: "parse",
        prop:"text",
        page: player,
        format: "json",
    });
    console.log("Player is " + player);
    
    fetch(url)
   .then(function(response){
        return response.json();
    })
    .then(function(data) {
       // Resets inner html
       playerAwards.innerHTML = "";
       // grabs html from page
        var wikiHTML = data.parse.text["*"];
        // strips down html
        var plainWiki = wikiHTML.replace(/<(?:.|\n)*?>/gm, '');
        // Parse text and return string
        var accomplishment = parseText(plainWiki, 'highlights');
        /*
        Specifically for the awards as it is translated into an array
        */
        var accomplishments = accomplishment.split(')');
        var loopNum;
        if  (8> accomplishments.length) {
          loopNum = accomplishments.length;
        } else if (accomplishments.length < 1) {
          loopNum = 0;
        } else {
          loopNum = 8;
        }
        if (loopNum > 2){
          console.log(loopNum);
          // Prints Awards header
          playerAwards.innerHTML +=
          '<h2><strong>' + 'Awards' + '<br/></h2>' + '<br/>';
        }
        // Print loop num
        console.log("loop number " + loopNum);
        // loop to create p
        for ( i = 0; i < (loopNum-1); i++ ) {
          console.log(i)
          // can choose to do a different type of element
          var tag = document.createElement("p");
          var brake = document.createElement("br");
          // replace .highlights with container that is to hold highlights
          tag.className = 'highlight';
          tag.textContent = accomplishments[i];
          playerAwards.appendChild(tag);
          playerAwards.appendChild(brake);
        }
        
    })
    .catch(function(error){console.log(error);});

  // Function to parse text for both awards and Team
  function parseText (text, term) {
    // creates variables
    var index1;
    var index2;
    var indexOne;
    var indexTwo;
    // Sorts through which term is used
    if ( term == 'highlights' ) {
      index1 = 'Career highlights and awards\n';
      index2 = '\n\n';
      indexOne = text.indexOf(index1);
      indexTwo = text.indexOf(index2, indexOne);
    } else if (term == 'team') {
      index1 = '&#32;';
      index2 = 'Position';
      indexOne = text.lastIndexOf(index1);
      indexTwo = text.indexOf(index2, indexOne);
    } else {
      console.log("Please insert proper parameters\n-------------------------------\nsearch---------------term\n-------------------------------\nplayer---------------highlights\nplayer---------------team\nteam-----------------colors");
    }
    var returnString = text.slice(indexOne + index1.length, indexTwo);
    console.log(returnString);
    return returnString;
  }


}
}


//--------------------Display Selected Player API---------------------
let displaySelectedPlayer = (selectedPlayerID) => {
  let playerID = selectedPlayerID
  fetch('https://api-nba-v1.p.rapidapi.com/players/statistics?id=' + playerID + '&season=2022', options)
  //fetch('https://api-nba-v1.p.rapidapi.com/players/statistics?id=220&season=2022', options)
  .then(response => { 
    //console.log(response);
  return response.json()
  })
  .then((response) => {
      printPlayerStats(response.response);
  })
  .catch(error => {
    console.log(error)
    });
  
  let printPlayerStats = (playerGameStats) => {
    playerStatCardSectionEl.innerHTML = "";
    console.log("player game stats:", playerGameStats)
    let minutesPlayed = 0;
    let points = 0;
    let fieldGoalsMade = 0;
    let fieldGoalsAttempted =0;
    let threePointers = 0;
    let threePointersAttemped = 0;
    let freeThrowsMade = 0;
    let freeThrowsAttempted = 0;
    let offensiveRebound = 0;
    let defensiveRebound = 0;
    let rebounds = 0;
    let totalAssists = 0;
    let turnOvers = 0;
    let steals = 0;
    let blocks = 0;
    let personalfouls = 0;

      for (let i = 0; i < playerGameStats.length; i++) {
        minutesPlayed += parseInt(playerGameStats[i].min)
        points += playerGameStats[i].points
        totalAssists += playerGameStats[i].assists
        fieldGoalsMade += playerGameStats[i].fgm
        fieldGoalsAttempted += playerGameStats[i].fga
        threePointers += playerGameStats[i].tpm
        threePointersAttemped += playerGameStats[i].tpa
        freeThrowsMade += playerGameStats[i].ftm
        freeThrowsAttempted += playerGameStats[i].fta
        offensiveRebound += playerGameStats[i].offReb
        defensiveRebound += playerGameStats[i].defReb
        rebounds += playerGameStats[i].totReb
        turnOvers += playerGameStats[i].turnovers
        steals += playerGameStats[i].steals
        blocks += playerGameStats[i].blocks
        personalfouls += playerGameStats[i].pFouls
      }
        playerStatCardSectionEl.innerHTML +=
        '<h2><strong>2022 Game Stats</strong></h2><br/>';
        playerStatCardSectionEl.innerHTML +=
        '<strong>Games on Record: </strong> ' + playerGameStats.length + '<br/>';
        playerStatCardSectionEl.innerHTML +=
        '<strong>Minutes Played: </strong> ' + minutesPlayed + '<br/>';
        playerStatCardSectionEl.innerHTML +=
        '<strong>Points: </strong> ' + points + '<br/>';
        playerStatCardSectionEl.innerHTML +=
        '<strong>Field Goals Made: </strong> ' + fieldGoalsMade + '<br/>';
        playerStatCardSectionEl.innerHTML +=
        '<strong>Field Goals Attempted: </strong> ' + fieldGoalsAttempted + '<br/>';
        playerStatCardSectionEl.innerHTML +=
        '<strong>Three Pointers: </strong> ' + threePointers + '<br/>';
        playerStatCardSectionEl.innerHTML +=
        '<strong>Three Pointers Attempted: </strong> ' + threePointersAttemped + '<br/>';
        playerStatCardSectionEl.innerHTML +=
        '<strong>Free Throws Made: </strong> ' + freeThrowsMade + '<br/>';
        playerStatCardSectionEl.innerHTML +=
        '<strong>Free Throws Attempted: </strong> ' + freeThrowsAttempted + '<br/>';
        playerStatCardSectionEl.innerHTML +=
        '<strong>Offensive Rebounds: </strong> ' + offensiveRebound + '<br/>';
        playerStatCardSectionEl.innerHTML +=
        '<strong>Defensive Rebounds: </strong> ' + defensiveRebound + '<br/>';
        playerStatCardSectionEl.innerHTML +=
        '<strong>Rebounds: </strong> ' + rebounds + '<br/>';
        playerStatCardSectionEl.innerHTML +=
        '<strong>Total Assists: </strong> ' + totalAssists + '<br/>';
        playerStatCardSectionEl.innerHTML +=
        '<strong>Turn Overs: </strong> ' + turnOvers + '<br/>';
        playerStatCardSectionEl.innerHTML +=
        '<strong>Steals: </strong> ' + steals + '<br/>';
        playerStatCardSectionEl.innerHTML +=
        '<strong>Blocks: </strong> ' + blocks + '<br/>';
        playerStatCardSectionEl.innerHTML +=
        '<strong>Personal Fouls: </strong> ' + personalfouls + '<br/>';
    }
  }
//----------------------------Save Searched---------------------------
  //create array to store user search values
  var recentSearchesArray = [];
  //set the location you want these to display here.... 
  const recentSearchDisplay = document.querySelector("#search-result-content");

  //invoke so that recent searches are populated after page loads
  populateRecentSearches();
  
  //populate the recent search display with the user's recent player searches
  function populateRecentSearches() {
    //this sets location for buttons to append to.
    recentSearchDisplay.innerHTML = "Recent Searches:";
  
    //get the recent searches out of local storage
    var recentSearchArray = getRecentSearches();
  
    // this loop works in reverse to display newest first
    for (let i = recentSearchArray.length - 1; i >= 0; i--) {
      //to change button properties - target button id "result-button"
      const recentSearched = "result-button"
      console.log("recent search array: ", recentSearchArray)
      const newSearchedButton = document.createElement("button");
      newSearchedButton.setAttribute("id", recentSearched);
      recentSearchDisplay.appendChild(newSearchedButton);
      newSearchedButton.textContent = recentSearchArray[i].name;
      //add functionality to button and send saved array info to display API
      newSearchedButton.addEventListener("click", function(){
        displaySelectedPlayer(recentSearchArray[i].id);
        printPlayerProfile(recentSearchArray[i].id);
      })
    }
  }


  //if there is already an array in local storage then parse it and assign to variable "recentSearchesArray"
  function getRecentSearches() {
    storedSearches = localStorage.getItem("recentSearches");
    if (storedSearches) {
      recentSearchesArray = JSON.parse(storedSearches);
    }
    return recentSearchesArray;
  }
  
  //If the player name does not already exist and less than 5 display
  //call the function and plass playerID and playerName to save as key value. 
  function savePlayerIDs(playerID, playerName) {
  //create an object and save both properties at once
    let player = playerName
    let idNum = playerID

    let savedEntry = {
      name: player,
      id: idNum
    }

    console.log("save function receiving:", recentSearchesArray)

    //this checks to see if the object in the array already exists. 
    //If not, it will push entry or shift if there is already 5 in array memory
    if (
      recentSearchesArray.includes(savedEntry) === false &&
      recentSearchesArray.length < 5
    ) {
      recentSearchesArray.push(savedEntry);
      localStorage.setItem("recentSearches", JSON.stringify(recentSearchesArray));
    } else if (
      recentSearchesArray.includes(savedEntry) === false &&
      (recentSearchesArray.length = 5)
    ) {
      recentSearchesArray.shift();
      recentSearchesArray.push(savedEntry);
      localStorage.setItem("recentSearches", JSON.stringify(recentSearchesArray));
    }
  }
