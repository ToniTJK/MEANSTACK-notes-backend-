"use strict";

/* Modules */
var bcrypt = require("bcrypt-nodejs");
var moment = require("moment");

/* Models */
var User = require("./../models/user.model");

/* SERVICES */
var jwt = require("./../services/jwt");

/* ACTIONS */
function saveUser(req, res) {
  /* Create object */
  var user = new User();

  /* Body-Parser */
  var params = req.body;

  /* Asignar valores al objeto */

  if (params.password && params.name && params.email) {
    user.name = params.name;
    user.email = params.email;
    user.createdAt = moment().format();

    User.findOne({ email: user.email.toLowerCase() }, (err, userRegistred) => {
      if (err) {
        res.status(500).send({ mssg: "Server error." });
      } else {
        /* Si no existe usuario entonces lo registramos */
        if (!userRegistred) {
          /* Cifrar password */
          bcrypt.hash(params.password, null, null, function (err, hash) {
            user.password = hash;
            /* Save in MongoDB */
            user.save((err, userStored) => {
              if (err) {
                res.status(500).send({ mssg: "Error in BBDD." });
              } else {
                if (!userStored)
                  res
                    .status(404)
                    .send({ mssg: "User not registred." });
                else {
                  res.status(200).send({
                    mssg: "Successfully registered user.",
                    user: userStored,
                  });
                }
              }
            });
          });
        } else {
          res.status(500).send({ mssg: "User already exist." });
        }
      }
    });
  } else {
    /* if check params */
    res.status(500).send({
      mssg: "Enter the data correctly.",
    });
  }
}

function login(req, res) {
  var params = req.body;
  var email = params.email;
  var password = params.password;

  User.findOne({ email: email.toLowerCase() }, (err, issetUser) => {
    /* Error del Servidor */
    if (err) {
      res.status(500).send({ mssg: "Server error." });
    } else {
      /* Si la sentencia se ejecuta correctamente */
      /* Si no encuentra usuario */
      if (!issetUser) {
        res.status(500).send({ mssg: "User not found." });
      } else {
        /* En el caso de que encuentre via email, comprobamos password */
        bcrypt.compare(password, issetUser.password, (err, status) => {
          /* Si devuelve true los passwords coinciden */
          if (status) {
            /* Comprobar y generar token */
            if (params.gettoken) {
              /* Devolver token */
              res.status(200).send({
                mssg: "Generando Token JWT!.",
                token: jwt.createToken(issetUser),
              });
            } else {
              res.status(200).send({
                mssg: "No gettoken!.",
                user: issetUser,
              });
            }
          } else {
            res.status(500).send({
              mssg: "Wrong email or password.",
              status: status,
            });
          }
        });
      }
    }
  });
}

module.exports = {
  saveUser,
  login,
};
