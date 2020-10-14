"use strict";

/* MONGO DB CNX */
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

/* ROUTES CONF */
var user_routes = require("./routes/user.route");
var note_routes = require("./routes/note.route");

/* MIDDLEWARES */
/* MIDDLEWARES bodyParser */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* CABECERAS AND CORS */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

/* ROUTES USERS */
app.use("/api", user_routes);
/* ROUTES NOTES */
app.use("/api", note_routes);

module.exports = app;
