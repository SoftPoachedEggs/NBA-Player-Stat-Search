/* I need to pull 1 image from the Wikipedia page for the player picture and 1 image for the player team banner */
var player = "Derrick Rose";
var pImg = document.querySelector("img");
var tName = document.getElementById("team-name");
var highlights = document.getElementById("highlights");
var pWeight = document.getElementById("weight");


/* 
    Gets and sets url for image source from wikipedia
    For main thumbnail page
*/
var url = "https://en.wikipedia.org/w/api.php?" +
/* Sets search parameters for the api to target */
    new URLSearchParams({
        origin: "*",
        action: "query",
        prop:"pageimages",
        piprop:"thumbnail",
        pithumbsize: "400",
        titles: player,
        format: "json",
    });

    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
        var pages = data.query.pages;        
        var imgURL = Object.values(pages)[0].thumbnail.source;
        pImg.src = imgURL;
    })
    .catch(function(error){console.log(error);});

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
    
    fetch(url)
   .then(function(response){
        return response.json();
    })
    .then(function(data) {
        var wikiHTML = data.parse.text["*"];
        // strips down html
        var plainWiki = wikiHTML.replace(/<(?:.|\n)*?>/gm, '');
        // Parse text and return string
        var accomplishment = parseText(plainWiki, 'highlights');
        var teamName = parseText(plainWiki, 'team');
        tName.innerHTML = teamName;
        var accomplishments = accomplishment.split(')');
        for ( i = 0; i < (accomplishments.length-1); i++ ) {
          console.log(i)
          // can choose to do a different type of element
          var tag = document.createElement("p");
          // replace .highlights with container that is to hold highlights
          var container = document.querySelector(".highlights");
          tag.className = 'highlight';
          tag.textContent = accomplishments[i];
          container.appendChild(tag);
        }
        
    })
    .catch(function(error){console.log(error);});

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
  // prints to console the index positions to check that everything is working properly
  // console.log("starting index " + indexOne);
  // console.log("ending index " + indexTwo );
  // Splices plain text to obtain needed string
  var returnString = text.slice(indexOne + index1.length, indexTwo);
  console.log(returnString);
  return returnString;
}