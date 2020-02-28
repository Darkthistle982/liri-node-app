//require to ensure dotenv package is linked/useable
require("dotenv").config();
//require statements for the packages and need to write to a document.
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const axios = require("axios");
const fs = require("fs");
const moment = require("moment");
//part of the spotify call to keep my api keys from being posted to github publicly using gitingnore files
const spotify = new Spotify(keys.spotify);
//calls to identify the user command input at the user parameter input for each task
const userCommand = process.argv[2];
const userParameter = process.argv[3];

//append function to write the command used and the generated error if any to the log.txt file
// fs.appendFile('log.txt', userCommand + ",", function (error) {
//     if (error) {
//         console.log(error);
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
    case "movie-this":
        movieThis(userParameter);
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
function concertThis(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            if (response.data[0] !== undefined) {
                console.log(artist + "'s next 5 shows.");
                for (let i = 0; i < 5; i++) {
                    let eventDate = moment(response.data[i].datetime);
                    let conversion = eventDate.format("dddd, MMMM Do YYYY");
                    console.log(
    `
    ------------------------------------------------------
    Name of the Venue: ${response.data[i].venue.name}
    Venue Location: ${response.data[i].venue.city}, ${response.data[i].venue.region}, ${response.data[i].venue.country}
    Date of the Event: ${conversion}
    ------------------------------------------------------
    `
                    )
                }
            } else {
                console.log("No concerts found");
            }
        })
        .catch(function (error) {
            console.log(error);
            console.log("An error occurred.");
        });
};

//function to ping OMDB for the movie-this command
function movieThis (movie) {
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            if (response.data !== undefined) {
                console.log(
    `
    ================================================
    Title: ${response.data.Title}
    Year Released: ${response.data.Year}
    IMDB Rating: ${response.data.Ratings[0].Value}
    Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}
    Produced in: ${response.data.Country}
    Film Language: ${response.data.Language}
    Plot: ${response.data.Plot}
    Actors: ${response.data.Actors}
    =================================================
    `
                )
            } else {
                movieThis("Mr. Nobody");
            }
        })
        .catch(function (error) {
            console.log(error);
            console.log("An error occurred.");
        })
}