//------------------Player Search (NBA API)--------------------------

//resultcontentEl is a temporary result content box and will likely need to be changed to where we want search results
//update query selector to target where you want search results to print. search results will display. we can make the
//results a clickable div or use a view more link. 
let resultContentEl = document.querySelector('#search-result-content');
let playerStatCardSectionEl = document.querySelector('#playerStatCardSection')
//this is display card for player bio (age / birthplace/ height etc...)
let playerBioEl = document.querySelector('#playerBioCard')
//search box input query selector
let searchFormEl = document.querySelector('#searchInput')
//this will target the submit button. i would add the same id to whatever the submit button to the HTML
let submitSearchEl = document.querySelector('#searthBtn')
var searchHistory = [];


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
        //create and append elements to the player card
        //...
    
      // set up `<div>` to hold result content
      var resultCard = document.createElement('div');
      //change style to match at later date. 
      resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');
      resultCard.setAttribute('id', resultObj.id)
    
      var resultBody = document.createElement('div');
      resultBody.classList.add('card-body');
      resultCard.append(resultBody);
    
      var titleEl = document.createElement('h3');
      titleEl.textContent = resultObj.firstname + " " + resultObj.lastname;
    
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

      var linkButtonEl = document.createElement('a');
      linkButtonEl.textContent = 'View Stat Card';
      linkButtonEl.addEventListener("click", function(){
        printPlayerProfile(resultObj.id);
        displaySelectedPlayer(resultObj.id);
      });
      //linkButtonEl.setAttribute('href', "./player-page.html");
      resultBody.append(titleEl, bodyContentEl, linkButtonEl);
    
      resultContentEl.append(resultCard);

      } }
    }




//--------------------Selected Player Bio Card Print API ----------------------
//use below fetch address and pass in the playerNumber variable once the player number has been selected. 
let printPlayerProfile = (selectedPlayerID) => {
let playerID = selectedPlayerID
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
}}


//--------------------Selected Player Stat Card Print API---------------------
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

  var historyButton = function(name) {
    var histButtonEl = document.createElement("button");
        histButtonEl.setAttribute("type", "submit" );
        histButtonEl.classList = "history-btn";
        name = name.toUpperCase();
        histButtonEl.textContent = name;

  }

  var saveSearch = function(name) {
    if (searchHistory.indexOf(name) === -1) {
        name = name.toUpperCase();
        searchHistory.push(name);

        //save player to page
        historyButton(name);
    }
    localStorage.setItem("name", searchHistory);
  }

  var savedStorage = function() {
    searchHistory = localStorage.getItem("name");

    if (searchHistory === null) {
        searchHistory = [];
        return;
    }

    searchHistory = searchHistory.split(",");
    for (var i = 0; i < searchHistory.length; i++) {
        historyButton(searchHistory[i]);
    }
  }
