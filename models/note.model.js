'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = Schema({
    title: String,
    description: String,
    user: { type: Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Note', NoteSchema);