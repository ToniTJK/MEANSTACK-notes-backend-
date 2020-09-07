'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    email: String,
    password: String,
    createdAt: Date
});

module.exports = mongoose.model('User', UserSchema);