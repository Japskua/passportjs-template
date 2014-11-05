/**
 * Created by Janne on 5.11.2014.
 */
var winston = require('winston');


// Just test with the users
var users = [
    { id : 1, username : "testeri", password : "secret", email : "testeri@netti.fi" },
    { id : 2, username : "kakkonen", password : "salane", email : "mies@email.com"}
];


exports.findById = function(id, fn) {
    var idx = id - 1;
    if (users[idx]) {
        fn(null, users[idx]);
    } else {
        fn(new Error('User ' + id + ' does not exist'));
    }
};

exports.findByUsername = function(username, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i];
        if (user.username === username) {
            return fn(null, user);
        }
    }
    return fn(null, null);
};