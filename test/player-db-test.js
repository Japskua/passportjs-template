/**
 * Created by Janne on 5.11.2014.
 */

var PlayerDb = require('./../js/player-db');
var assert = require('assert');

describe("Crude authentication test", function() {

    it("Should create a new user to the system", function(done) {

        var playerDb = new PlayerDb();
        playerDb.Save({ username : "koklaus", password : "passu", email : "kokeile@emai.com"}, function(err, result) {

            if(err) {
                throw err;
            }

            // Done!
            done();

        });

    });

    it("Should Search users from the system", function(done) {

        var playerDb = new PlayerDb();
        playerDb.Find({username : "koklaus"}, function(err, result) {
            if(err) {
                throw err;

            }
            console.log(result);
            // Done!
            done();


        });

    });

    it.only("Should update the user hash in the database", function(done) {

        var playerDb = new PlayerDb();
        playerDb.Update( { username : "koklaus"}, function(err, result) {

            if(err) {
                throw err;
            }

            console.log(result);
            // Otherwise, things okay!
            // Done!
            done();

        });

    });

    it("Should remove the user from the system", function(done) {

        var playerDb = new PlayerDb();
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



});
