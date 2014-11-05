/**
 * Created by Janne on 5.11.2014.
 */

var mongojs = require('mongojs');
var winston = require('winston');
var mongoose = require('mongoose');
var Player = require('./playerSchema').Player;
var connection = mongoose.connect('mongodb://localhost/players');
var playerDb = mongoose.connection;


function PlayerDb() {

}

PlayerDb.prototype.Find = function(json, callback) {

    Player.find( json, function(err, player) {

        if(err) {
            winston.error("Searching for player resulted in error -", err);
            callback(err, null);
        }
        // Return the results
        callback(null, player);
    });
};

PlayerDb.prototype.Save = function(json, callback) {

    var player = new Player(json);
    winston.info('player model created! username:', player.username);

    player.save(function(err, result) {

        if(err) {
            console.error(err);
            callback(err, null);
        }
        winston.info('saved', result.username);
        callback(null, result);
    });
};

PlayerDb.prototype.Remove = function(json, callback) {

    var player = new Player(json);
    winston.info("Removing the following player:", json);

    player.remove(json, function(err) {
        if(err) {
            callback(err, null);
        }

        winston.info("Removed player succesfully!");
        callback(null, true);
    });
};

module.exports = PlayerDb;