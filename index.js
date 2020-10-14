"use strict";

/* # ENVIRONMENT VARIABLES */
require("dotenv").config();

var app = require("./app");
var port = process.env.PORT || 3789;

/* MONGO DB CNX */
var mongoose = require("mongoose");

mongoose.connect(
  process.env.DB_URL_ON,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) throw err;
    else {
      console.log("La conexión con mongoose ha sido realizada correctamente.");

      app.listen(port, () => {
        console.log("El servidor local con node y express esta ON.");
      });
    }
  }
);
