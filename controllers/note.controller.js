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
      res.status(500).send({ mssg: "Error en la petición." });
    } else {
      if (notes) {
        res.status(500).send({
          notes: notes,
        });
      } else {
        res.status(404).send({ mssg: "No se encuentras notas." });
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

    note.save((err, noteStored) => {
      if (err) {
        res.status(500).send({ mssg: "Error en la petición del servidor." });
      } else {
        if (!noteStored) {
          res.status(500).send({ mssg: "No se ha guardado la nota." });
        } else {
          res
            .status(200)
            .send({ mssg: "Se ha guardado correctamente.", note: noteStored });
        }
      }
    });
  } else {
    res.status(404).send({ mssg: "Todos los campos són obligatorios." });
  }
}

function deleteNote(req, res) {
  var noteId = req.params.id;

  Note.findByIdAndDelete(noteId, (err, noteDelete) => {
    if (err) {
      res.status(500).send({ mssg: "Error en la petición." });
    } else {
      if (noteDelete) {
        res.status(500).send({
          mssg: "Nota borrada correctamente.",
          noteDelete: noteDelete,
        });
      } else {
        res.status(500).send({ mssg: "No se ha podido eliminar la nota." });
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
        res.status(500).send({ mssg: "Error en la petición." });
      } else {
        if (noteUpdated) {
          res.status(500).send({
            mssg: "Nota actualizada correctamente.",
            noteUpdated: noteUpdated,
          });
        } else {
          res.status(500).send({ mssg: "No se ha podido eliminar la nota." });
        }
      }
    }
  );
}

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
