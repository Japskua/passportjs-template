var express = require('express');
var router = express.Router();
var passport = require('passport');
var fakedb = require('./../js/fake-db');
var winston = require('winston');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(

    function(username, password, done) {

        winston.info('Doing local strategy with username:', username, 'password:', password);

        fakedb.findByUsername(username, function(err, user) {
            if(err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Unknown user ' + username});
            }
            if (user.password !== password) {
                return done(null, false, { message : 'Invalid Password!'});
            }

            // Everything went okay
            return done(null, user);
        })
    }

));


/* GET users listing. */
router.get('/', function(req, res) {

    res.send("Authenticate with post!");

});

router.post('/',
    passport.authenticate('local', { failureRedirect : '/users', failureFlash : false, session : false}),
    function(req, res) {

        winston.info("Logged in:", req.user);
        winston.info('login successful!');
        res.send("Logged in");
    }
);


module.exports = router;
