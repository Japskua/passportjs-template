/**
 * Created by Janne on 6.11.2014.
 */

var winston = require('winston');
var HashManager = require('./hash-manager');
var PlayerDb = require('./player-db');

/**
 * Constructor for the AuthManager
 * @constructor
 */
function AuthManager () {

}

/**
 * Logins to the system, creating a new hash for the user and returns it
 * @param {JSON} json The user JSON to login
 * @param {Function} callback Callback function (err, result). Returns hash string on success
 * @constructor
 */
AuthManager.prototype.Login = function(json, callback) {

    // Log the user in, by searching for his information
    var playerDb = new PlayerDb();
    playerDb.Find(json, function(err, player) {
        if (err) {
            callback(err, null);
        }

        // Create a login hash
        player.hash = new HashManager().CreateHash();

        // Then, store it to the database
        playerDb.Update(json, player, function(err, result) {
            if (err) {
               callback(err, null);
            }
            // Thing okay, now just send the resulting hash back
            callback(null, player.hash);
        });
    });
};

/**
 * Validates whether the hash can be found from the database
 * @param {String} hash The hash string to validate
 * @param {Function} callback Callback function (err, result) result is either false or true
 * @constructor
 */
AuthManager.prototype.Validate = function(hash, callback) {

    // Check if the hash matches any user in the database
    var playerDb = new PlayerDb();

    playerDb.Find( { hash : hash}, function(err, result) {
        if(err) {
            callback(err, null);
        }

        // Check if the result is empty or not
        if (result.length === 0) {
            callback(null, false);
        } else {
            // Match found!
            callback(null, true);
        }
    });
};

module.exports = AuthManager;