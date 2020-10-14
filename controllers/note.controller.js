"use strict";

/* Modules */
var moment = require("moment");

/* Models */
var Note = require("./../models/note.model");

/* SERVICES */

/* ACTIONS */
function getNotes(req, res) {
  var userId = req.params.id;

  Note.find({ user: userId }).exec((err, notes) => {
    if (err) {
      res.status(500).send({ mssg: "Server error." });
    } else {
      if (notes) {
        res.status(200).send({
          notes: notes,
        });
      } else {
        res.status(404).send({ mssg: "Notes not found." });
      }
    }
  });
}

function createNote(req, res) {
  var note = new Note();

  /* Body-Parser */
  var params = req.body;

  if (params.title && params.description) {
    note.title = params.title;
    note.description = params.description;
    note.user = req.user.sub;
    note.createdAt = moment().format();

    note.save((err, noteStored) => {
      if (err) {
        res.status(500).send({ mssg: "Server error." });
      } else {
        if (!noteStored) {
          res.status(500).send({ mssg: "The note could not be saved." });
        } else {
          res
            .status(200)
            .send({ mssg: "The note has been saved correctly.", note: noteStored });
        }
      }
    });
  } else {
    res.status(404).send({ mssg: "All fields are required." });
  }
}

function deleteNote(req, res) {
  var noteId = req.params.id;

  Note.findByIdAndDelete(noteId, (err, noteDelete) => {
    if (err) {
      res.status(500).send({ mssg: "Server error." });
    } else {
      if (noteDelete) {
        res.status(200).send({
          mssg: "The note has been removed corretly.",
        });
      } else {
        res.status(500).send({ mssg: "The note could not be removed." });
      }
    }
  });
}

function updateNote(req, res) {
  var noteId = req.params.id;
  var infoToUpdate = req.body;

  Note.findByIdAndUpdate(
    noteId,
    infoToUpdate,
    { new: true },
    (err, noteUpdated) => {
      if (err) {
        res.status(500).send({ mssg: "Server error." });
      } else {
        if (noteUpdated) {
          res.status(200).send({
            mssg: "The note has been updated correctly.",
            noteUpdated: noteUpdated,
          });
        } else {
          res.status(500).send({ mssg: "The note could not be updated." });
        }
      }
    }
  );
}

function getNoteById(req, res) {
  var noteId = req.params.id;
  Note.findOne({ _id: noteId }, (err, note) => {
    if (err) {
      res.status(500).send({ mssg: "Server error." });
    } else {
      if (note) {
        res.status(200).send({
          note: note,
        });
      } else {
        res.status(404).send({ mssg: "Could not find the note." });
      }
    }
  });
}

module.exports = {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
