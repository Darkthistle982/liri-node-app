//require to ensure dotenv package is linked/useable
require("dotenv").config();
//require statements for the packages and need to write to a document.
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const axios = require("axios");
const fs = require("fs");
//part of the spotify call to keep my api keys from being posted to github publicly using gitingnore files
const spotify = new Spotify(keys.spotify);
//calls to identify the user command input at the user parameter input for each task
const userCommand = process.argv[2];
const userParameter = process.argv[3];

//append function to write the command used and the generated error if any to the log.txt file
// fs.appendFile('log.txt', userCommand + ",", function (err) {
//     if (err) {
//         console.log(err);
//     }
// });

//I found switch case stuff online while trying to figure out how to call the functions for each task. It has the logic for each tasks call
switch (userCommand) {
    case "spotify-this-song":
        spotifyThisSong(userParameter);
        break;
    case "concert-this":
        concertThis(userParameter);
        break;
};

//function to run a spotify search for a song and it's relevant info
function spotifyThisSong(song) {
    spotify
        .search({ type: 'track', query: song })
        .then(function (response) {
            if (response.tracks.total === 0) {
                console.log("There were no results for your search. Enjoy this instead!");
                spotifyErrorSearch();
            } else {
                console.log(
                    `
                    Artist: ${response.tracks.items[0].artists[0].name}
                    Song Name: ${response.tracks.items[0].name}
                    Preview Link: ${response.tracks.items[0].preview_url}
                    Album: ${response.tracks.items[0].album.name}
                    `
                );
            }
        })
        .catch(function (err) {
            console.log(err);
        });

};

//function to run if the spotify search has no results
function spotifyErrorSearch() {
    spotify
        .search({ type: 'track', query: "The Sign" })
        .then(function (response) {
            for (let i = 0; i < response.tracks.items.length; i++) {
                if (response.tracks.items[i].artists[0].name === "Ace of Base") {
                    console.log(
                        `
                        Artist: ${response.tracks.items[0].artists[0].name}
                        Song Name: ${response.tracks.items[0].name}
                        Preview Link: ${response.tracks.items[0].preview_url}
                        Album: ${response.tracks.items[0].album.name}
                        `
                    );
                    i = response.tracks.items.length;
                }
            }
        })
        .catch(function (error) {
            console.log(error);
            console.log("An error occurred.");
        });
};

//function to run the concert-this command
function concertThis() {

}