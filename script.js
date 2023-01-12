//------------------Player Search (NBA API)--------------------------

var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ed2b7708famshda6e1bf50647febp12f2aajsn285f70f37488',
		'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
	}
};

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



