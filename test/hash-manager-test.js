/**
 * Created by Janne on 6.11.2014.
 */

var HashManager = require('./../js/hash-manager');
var mocha = require('mocha');
var assert = require('assert');

describe("Hash creator test", function() {

    var hashManager = new HashManager();

    var hash = hashManager.CreateHash();


    it("Should create a new hash", function() {

        // Hash created
        console.log(hash);
    });

    it("Should match the hashes", function() {

        // hashes Match
        assert.equal(hashManager.ValidateHash(hash, hash), true);

    });

    it("Should respond with failure when matching hashes", function() {

        // Hashes don't match
        assert.equal(hashManager.ValidateHash(hash, "as9gj"), false);

    });

});