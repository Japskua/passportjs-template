/**
 * Created by Janne on 5.11.2014.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({
    username : String,
    password : String,
    email : String,
    hash : String
});

var Player = mongoose.model('Player', playerSchema);

exports.Player = Player;