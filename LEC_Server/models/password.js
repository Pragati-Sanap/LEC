var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var password = new mongoose.Schema({
    email: String,
    password: String

});

module.exports = mongoose.model('login', password);