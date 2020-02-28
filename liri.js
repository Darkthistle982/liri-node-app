require("dotenv").config();

const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);

const userCommand = process.argv.slice(2);

