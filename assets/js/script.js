/* I need to pull 1 image from the Wikipedia page for the player picture and 1 image for the player team banner */
var player = "LeBron James";
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
        var plainWiki = wikiHTML.replace(/<(?:.|\n)*?>/gm, '');
        var present = '-present';
        var lastIndexPresent = plainWiki.indexOf('-present');
        var indexCareerInfo =plainWiki.indexOf('Career highlights');
        console.log("starting index " + lastIndexPresent);
        console.log("ending index " + indexCareerInfo);
        // console.log(plainWiki.slice( lastIndexPresent + present.length, indexCareerInfo ));      
        console.log(plainWiki);      
    })
    .catch(function(error){console.log(error);});

function setStats () {
    // appending new text node
    pName.appendChild(document.createTextNode('Name: ' + player));
    pHeight.appendChild(document.createTextNode('Height: '  ));
    pWeight.appendChild(document.createTextNode('Weight: ' ));
}

