"use strict";

var express = require("express");
var UserController = require("./../controllers/user.controller");
var mdAuth = require("./../middlewares/authenticated");

var api = express.Router();

api.post("/register", UserController.saveUser);
api.post("/login", UserController.login);

module.exports = api;
