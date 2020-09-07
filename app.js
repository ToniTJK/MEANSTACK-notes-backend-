'use strict'

/* MONGO DB CNX */
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

/* ROUTES CONF */
var user_routes = require('./routes/user.route');
var note_routes = require('./routes/note.route');

/* MIDDLEWARES */
/* MIDDLEWARES bodyParser */
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/* CABECERAS AND CORS */

/* ROUTES USERS */
app.use('/api', user_routes);
/* ROUTES NOTES */
app.use('/api', note_routes);


module.exports = app;