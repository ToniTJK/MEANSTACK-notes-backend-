"use strict";

var express = require("express");
var noteController = require("../controllers/note.controller");
var mdAuth = require("./../middlewares/authenticated");

var api = express.Router();

api.get("/get-notes/:id", mdAuth.ensureAuth, noteController.getNotes);
api.get("/get-note/:id", mdAuth.ensureAuth, noteController.getNoteById);
api.post("/create-note", mdAuth.ensureAuth, noteController.createNote);
api.put("/update-note/:id", mdAuth.ensureAuth, noteController.updateNote);
api.delete("/delete-note/:id", mdAuth.ensureAuth, noteController.deleteNote);

module.exports = api;
