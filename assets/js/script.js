/* I need to pull 1 image from the Wikipedia page for the player picture and 1 image for the player team banner */
var player = "Stephen Curry";
var getPage = "";
var getInfoBoxImage = "";
var pImg = document.querySelector("img");



/* 
To pull infobox 
http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=Scary%20Monsters%20and%20Nice%20Sprites&rvsection=0
*/

const url = "https://en.wikipedia.org/w/api.php?" +
    new URLSearchParams({
        origin: "*",
        action: "query",
        prop:"pageimages",
        titles: player,
        format: "json",
    });

    // try {
    //     var req = fetch(url);
    //     var json = req.json();
    //     console.log(json.parse.text["*"]);
    // } catch (e) {
    //     console.error(e);
    // }

    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(json) {
        console.log(url);
        console.log(json.query.pages);
        var pages = json.query.pages;
        for (var page in pages) {
            for (var img of pages[page].images) {
                console.log(img.title);
            }
        }
    })
    .catch(function(error){console.log(error);});

// var pPage = fetch( url )
//     .then(function(response){
//         console.log(url);
//         return response.json();
//     })
    // .then(function(json){
    //     pImg.src = "https://upload.wikimedia.org/wikipedia/commons/a/aa/" + json.parse.images[1];
    //     console.log(json.parse.images[1]);
    // })

// var imageAddress = "https://upload.wikimedia.org/wikipedia/commons/a/aa/" + pPage.parse.images;
/* After pulling images add the image to the page */
// https://upload.wikimedia.org/wikipedia/commons/a/aa/TechCrunch_Disrupt_2019_%2848834853256%29_%281%29.jpg
