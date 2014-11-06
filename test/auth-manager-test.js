/**
 * Created by Janne on 6.11.2014.
 */

var AuthManager = require('./../js/auth-manager');
var assert = require('assert');
var PlayerDb = require('./../js/player-db');


describe("Login and Authentication tests", function() {

    var playerDb = new PlayerDb();

    before(function(done) {
        // Create a new user to database
        playerDb.Save({username: "koklaus", password: "passu", email: "kokeile@emai.com"}, function (err, result) {
            if (err) {
                throw err;
            }
            // Done!
            done();
        });
    });

    after(function(done) {
        // Remove the test user from database
        playerDb.Remove( { username : "koklaus" }, function(err, result) {
            if (err) {
                throw err;
            }

            assert(result, true);
            // Things okay!
            // Done !
            done();
        });
    });

    var json = { username : "koklaus" };

    it("Should login to the system", function (done) {

        var authManager = new AuthManager();
        authManager.Login(json, function(err, result) {

            if(err) {
                throw err;
            }

            // Next, test for authentication
            authManager.Validate(result, function(err, result) {

                assert.equal(result, true);

                // Done!
                done();
            });
        });
    });

    it("Should not be able to validate this", function(done) {

        var authManager = new AuthManager();
        authManager.Validate("9nags03", function(err, result) {
            if (err) {
                throw err;
            }

            console.log("Test result for faulty thing is:", result);
            assert.equal(result, false);
            // Done!
            done();
        })

    });

});