# LIRI-node-app
A basic node app to perform several simple functions in the terminal.

## Table of Contents

* Application Overview & Use
* Technologies Used
* Application Details (How it works)
* Screenshots of application in use
* Video Demonstration

## Application Overview/Use
This is a node based application that is designed to show the ability to use node to both take in data, send out data, and log data on a file. The app operates with a series of simple commands followed by user data. The following list contains the commands and any details for use:

### Commands and instructions

* First off, the user must initialize the application from the terminal by navigating to the appropriate directory and initializing the app with the "node liri.js" call. The next input is the command to perform, and the following input is the user data. Any user data entered with more than one word is best surround by quotation marks to get the best search results. 

* 'concert-this' - The concert-this command is to be followed by the artist the user wants to search for. This command will check for the next 5 available concert dates and show thier location, date and time to the user in the terminal.

* 'spotify-this-song' - This command is to be followed by the song name the user wants to search for. This command will search the spotify data and return the first matching song with that name, as well as the details for that entry in the terminal.

* 'movie-this' - This command is to be followed by the movie title the user wishes to search for. This command will search the OMDB API and return the relevant details for that film to the terminal.

* 'do-what-it-says' - This command does not require any user input after the command. This will perform the tasks listed in the random.txt file in the liri.js directory. 

All commands will also be logged, along with any errors to the log.txt file. 

## Tech Used

* Javascript
* Spotify API
* OMDB API
* Bandsintown API
* NPM Packages
* Node.js

## Application Details (How does it work?)
This application is written with a switch case function to capture and inject the user input into the appropriate matching function that is the same as the user command entered. 

Each command then calls the relevant function and API within each named function to perform the search and return. We then used simple console logs to display the data to the user in the terminal. 

## Screenshots

### Successful concert-this screenshot
![alt text](https://github.com/Darkthistle982/liri-node-app/images/concert_this_success.png)

### Link to Video Demo: https://youtu.be/Cu7SpuojdGo