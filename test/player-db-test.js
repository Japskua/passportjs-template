/**
 * Created by Janne on 5.11.2014.
 */

var PlayerDb = require('./../js/player-db');
var mocha = require('mocha');
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

    it.only("Should Search users from the system", function(done) {

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

    it("Should remove the user from the system", function(done) {

        var playerDb = new PlayerDb();
        playerDb.remove( { username : "kokalus" }, function(err, result) {
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
