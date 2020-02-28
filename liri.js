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
fs.appendFile('log.txt', userCommand + ",", function (err) {
    if (err) {
        console.log(err);
    }
});

//I found switch case stuff online while trying to figure out how to call the functions for each task. It has the logic for each tasks call
switch (userCommand) {
    case "spotify-this-song":
        spotifyThisSong(userParameter);
        break;
};

function spotifyThisSong(song) {
    spotify
        .search({ type: 'track', query: song, })
        .then(function (response) {
            console.log(
                `
                Artist: ${response.tracks.items[0].artists[0].name}
                `
            );
        })
        .catch(function (err) {
            console.log(err);
        });

}
