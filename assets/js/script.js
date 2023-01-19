/* I need to pull 1 image from the Wikipedia page for the player picture and 1 image for the player team banner */
var player = "Kobe Bryant";
var pImg = document.querySelector("img");
var pName = document.getElementById("name");
var pHeight = document.getElementById("height");
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
        /*
        For Career Highlights
        */
        // saved string for the first index position
        var highlights = 'Career highlights and awards';
        var indexCareer = plainWiki.indexOf(highlights);
        // string at the end of the career highlights and awards
        var indexStat =plainWiki.indexOf('Stats');
        // prints index position
        console.log("starting index " + indexCareer);
        console.log("ending index " + indexStat );
        //saves variable for hightlights
        var careerHighlights = plainWiki.slice( indexCareer + highlights.length, indexStat );
        console.log(careerHighlights);
        /*
        For Team
        */

        var beginning = '&#32;';
        var indexTeam = plainWiki.lastIndexOf(beginning);
        var indexPosition = plainWiki.indexOf('Position');
        var teamName = plainWiki.slice(indexTeam + beginning.length, indexPosition);
        console.log(teamName);


        // prints the wiki after being stripped
        // console.log(plainWiki);      
    })
    .catch(function(error){console.log(error);});


async function funcName(pt) {
    var url = "https://en.wikipedia.org/w/api.php?" +
/* Sets search parameters for the api to target */
    new URLSearchParams({
        origin: "*",
        action: "parse",
        prop:"text",
        page: pt,
        format: "json",
    });
    const response = fetch(url);
    var data = response.json();
    var wikiHTML = data.parse.text["*"];
    // strips down html
    var plainWiki = wikiHTML.replace(/<(?:.|\n)*?>/gm, '');
}



    var url = "https://en.wikipedia.org/w/api.php?" +
/* Sets search parameters for the api to target */
    new URLSearchParams({
        origin: "*",
        action: "parse",
        prop:"text",
        page: 'Golden State Warriors',
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
        console.log(plainWiki);
    })
    .catch(function(error){console.log(error);});