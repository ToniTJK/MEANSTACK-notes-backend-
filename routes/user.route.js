"use strict";

var express = require("express");
var UserController = require("./../controllers/user.controller");
var mdAuth = require("./../middlewares/authenticated");

var api = express.Router();

api.get("/prueba-controlador", mdAuth.ensureAuth, UserController.pruebas);
api.post("/register", UserController.saveUser);
api.post("/login", UserController.login);
api.put("/update-user/:id", mdAuth.ensureAuth, UserController.updateUser);
api.delete("/delete-user/:id", mdAuth.ensureAuth, UserController.deleteUser);

module.exports = api;
