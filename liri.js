require("dotenv").config();

const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const axios = require("axios");
const fs = require("fs");
const spotify = new Spotify(keys.spotify);
const userInput = process.argv.slice(2);
const userCommand = userInput.process.argv[0];
const userParameter = userInput.process.argv[1];

fs.appendFile('log.txt', userCommand + ",", function(err) {
    if (err) {
        console.log(err);
    }
})

spotify
    .search({ type: 'track', query: 'All the Small Things', limit: 5 })
    .then(function(response) {
        console.log(response);
    })
    .catch(function(err) {
        console.log(err);
    });
