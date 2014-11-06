/**
 * Created by Janne on 6.11.2014.
 */

var winston = require('winston');
var moment = require('moment');

/**
 * Just the constructor
 * @constructor
 */
function HashManager() {

}

/**
 * Creates a new random hash
 * @returns {string} Random hash string to be used
 * @constructor
 */
HashManager.prototype.CreateHash = function() {

    return Math.random().toString(36).substring(2) + moment();

};

/**
 * Validates if the hashes match
 * @param {String} hash1 The first hash
 * @param {String} hash2 The second hash
 * @returns {boolean} True/False whether matches or not
 * @constructor
 */
HashManager.prototype.ValidateHash = function(hash1, hash2) {

    var res = (hash1 === hash2);
    winston.info("Hash1:", hash1, "Hash2:", hash2, "matching:", res);

    // Compare the hashes
    return (hash1 === hash2);
};

module.exports = HashManager;