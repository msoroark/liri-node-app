var key = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: '0a96c37f30e64742b3cbc6a6613ec197',
    secret: '926c8f8c5ba34df3adaff7cd2527773f'
});
var request = require('request');
var fs = require('fs');



var command = (process.argv[2]);

if (command === "my-tweets") {
    var client = new Twitter(key.twitterKeys);
    var params = { screen_name: 'voncupcacon', count: 10 };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {

        if (!error) {
            var data = []; 
            for (var i = 0; i < tweets.length; i++) {
                data.push({
                    'created at: ': tweets[i].created_at,
                    'Tweets: ': tweets[i].text,
                });
            }
            console.log(data);
        }
    });

} else if (command === "spotify-this-song") {

    var song = (process.argv[3]);

    spotify
        .search({ type: 'track', query: song })
        .then(function(response) {
            console.log("Artists: " + response.tracks.items[0].album.artists[0].name);
            console.log("Song: " + response.tracks.items[0].name);
            console.log("Preview: " + response.tracks.items[0].album.artists[0].external_urls.spotify);
            console.log("Album: " + response.tracks.items[0].album.name);
        })
        .catch(function(err) {
            console.log(err);
        });


} else if (command === "movie-this") {
    var movie = (process.argv[3]);
    if (!movie) {
        movie = "Mr. Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";
    request(queryUrl, function(error, response, body) {

        if (!error && response.statusCode === 200) {

            console.log("Title: " + JSON.parse(body).Title + "\nRealease: " + JSON.parse(body).Released +
                "\nRating: " + JSON.parse(body).imdbRating + "\nRotten Tomatoes Score: " + JSON.parse(body).Ratings[1].Value + "\nCountry: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors)
        }
    });
}