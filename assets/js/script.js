//------------------Player Search (NBA API)--------------------------

let resultTextEl = document.querySelector('#result-text');
let resultContentEl = document.querySelector('#result-content');
let playerStatCardSectionEl = document.querySelector('#playerStatCardSection')
let playerBioEl = document.querySelector('#playerBioCard')

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ed2b7708famshda6e1bf50647febp12f2aajsn285f70f37488',
		'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
	}
};
//-------------------------API Player Search Function---------------
/*
let searchForPlayerAPI = (searchedName) => {
  let name = searchedName;
  fetch('https://api-nba-v1.p.rapidapi.com/players?search=' + name + ', options')
  .then(response => { 
    //console.log(response);
  return response.json()
  }
  )
  .then((response) => {
      // write query to page so user knows what they are viewing
      //resultTextEl.textContent = locRes.search.query;
      console.log("is it logging? ", response)
      if (response.length === 0) {
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
    
      // set up `<div>` to hold result content
      var resultCard = document.createElement('div');
      //change style to match at later date. 
      resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');
    
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

      var linkButtonEl = document.createElement('a');
      linkButtonEl.textContent = 'View Stat Card';
      linkButtonEl.setAttribute('href', resultObj.url);
      linkButtonEl.classList.add('btn', 'btn-dark');
    
      resultBody.append(titleEl, bodyContentEl, linkButtonEl);
    
      resultContentEl.append(resultCard);
      }
  }


*/
//--------------------Selected Player Bio Card Print API ----------------------
//use below fetch address and pass in the playerNumber variable once the player number has been selected. 
//let printPlayerProfile = (selectedPlayerID) => {
//let playerID = selectedPlayerID
// fetch('https://api-nba-v1.p.rapidapi.com/players?id=' + playerID , options)
fetch('https://api-nba-v1.p.rapidapi.com/players?id=220', options)
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

//}
//--------------------Selected Player Stat Card Print API---------------------
//let displaySelectedPlayer = (searchedNameID) => {
  //let ID = searchedNameID; delete the static fetch address and uncomment the below. 
  //fetch('https://api-nba-v1.p.rapidapi.com/players/statistics?id=' + id + '&season=2022', options)
  fetch('https://api-nba-v1.p.rapidapi.com/players/statistics?id=220&season=2022', options)
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
console.log(playerGameStats)
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
