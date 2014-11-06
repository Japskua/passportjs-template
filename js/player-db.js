/**
 * Created by Janne on 5.11.2014.
 */

var winston = require('winston');
var mongoose = require('mongoose');
var Player = require('./playerSchema').Player;
mongoose.connect('mongodb://localhost/players');

/**
 * Just the constructor
 * @constructor
 */
function PlayerDb() {

}

/**
 * Finds the user from the database
 * @param {JSON} json JSON string containing the search info
 * @param {Function} callback Callback function (err, result)
 * @constructor
 */
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

/**
 * Creates a new user to the database
 * @param {JSON} json The JSON to use in creation
 * @param {Function} callback The callback function (err, result)
 * @constructor
 */
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

/**
 * Finds the player and updates the information
 * @param {JSON} searchJson The JSON to use in the search
 * @param {JSON} updateJson The JSON to use in updating
 * @param {Function} callback The callback function (err, result)
 * @constructor
 */
PlayerDb.prototype.Update = function(searchJson, updateJson, callback) {

    Player.findOneAndUpdate(searchJson, updateJson, function(err, result) {

        if (err) {
            callback(err, null);
        }

        // Things okay!
        callback(null, result);

    });

};

/**
 * Removes the user from the database
 * @param {JSON} json The JSON to use in search
 * @param {Function} callback The callback function (err, result)
 * @constructor
 */
PlayerDb.prototype.Remove = function(json, callback) {

    winston.info("Removing the following player:", json);

    Player.remove(json, function(err) {
        if(err) {
            callback(err, null);
        }

        winston.info("Removed player succesfully!");
        callback(null, true);
    });
};

module.exports = PlayerDb;