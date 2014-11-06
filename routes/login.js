/**
 * Created by Janne on 5.11.2014.
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');
var fakedb = require('./../js/fake-db');
var winston = require('winston');
var BasicStrategy = require('passport-http').BasicStrategy;
var LocalStrategy = require('passport-local').Strategy;
var AuthManager = require('./../js/auth-manager');

/*
passport.use(new BasicStrategy(
    function(username, password, done) {
        fakedb.findByUsername(username , function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (user.password !== password) { return done(null, false); }
            return done(null, user);
        });
    }
));*/

passport.use(new BasicStrategy(
    function(username, password, done) {
        new AuthManager().Login( { username : username, password : password } , function (err, user) {
            winston.info("User logged in:", user);
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            return done(null, user);
        });
    }
));

passport.use(new LocalStrategy(
    function(username, password, done) {
        winston.info('Doing local strategy with username:', username, 'password:', password);
        new AuthManager().Login( { username : username, password : password } , function (err, user) {
            if(err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Unknown user ' + username});
            }
            // Everything went okay
            return done(null, user);
        })
    }
));

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(id, done) {
    findById(id, function (err, user) {
        done(err, user);
    });
});

router.get('/',
    passport.authenticate('basic', { session: false }),
    function(req, res) {
        res.json(req.user);
    });


router.post('/', function(req, res, next) {
    winston.info("Received login attempt");
    passport.authenticate('local', {session : false}, function(err, user, info) {
        winston.info("Authentication going for user", user);
        if(err) {
            return res.send(info);
        }
        if (!user) {
            winston.info("User not found");
            return res.send(info);
        }
        // Otherwise, keep on going
        req.logIn(user, function(error) {
            if(error) {
                //return res.send("Error while logging in!");
                return next(error)
            }
            winston.info("Logged in!");
            // Otherwise, things ok
            return res.send(user);
        });
    })(req, res, next);
});

module.exports = router;