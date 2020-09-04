"use strict";

/* Modules */
var bcrypt = require("bcrypt-nodejs");

/* Models */
var User = require("./../models/user.model");

/* SERVICES */
var jwt = require("./../services/jwt");

/* ACTIONS */
function pruebas(req, res) {
  res.status(200).send({
    mssg: "Probando el controllador de usuarios y la acción pruebas.",
    user: req.user,
  });
}

function saveUser(req, res) {
  /* Create object */
  var user = new User();

  /* Body-Parser */
  var params = req.body;

  console.log(params);

  /* Asignar valores al objeto */

  if (params.password && params.name && params.email) {
    user.name = params.name;
    user.email = params.email;

    User.findOne({ email: user.email.toLowerCase() }, (err, userRegistred) => {
      if (err) {
        res.status(500).send({ mssg: "Error al comprobar usuario." });
      } else {
        /* Si no existe usuario entonces lo registramos */
        if (!userRegistred) {
          /* Cifrar password */
          bcrypt.hash(params.password, null, null, function (err, hash) {
            user.password = hash;
            /* Save in MongoDB */
            user.save((err, userStored) => {
              if (err) {
                res.status(500).send({ mssg: "Error al guardar." });
              } else {
                if (!userStored)
                  res
                    .status(404)
                    .send({ mssg: "No se ha registrado el usuario." });
                else {
                  res.status(200).send({
                    mssg: "Usuario registrado correctamente.",
                    user: userStored,
                  });
                }
              }
            });
          });
        } else {
          res.status(500).send({ mssg: "Usuario ya existe." });
        }
      }
    });
  } else {
    /* if check params */
    res.status(500).send({
      mssg: "Introduce los datos correctamente.",
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
      res.status(500).send({ mssg: "Error al buscar usuario." });
    } else {
      /* Si la sentencia se ejecuta correctamente */
      /* Si no encuentra usuario */
      if (!issetUser) {
        res.status(500).send({ mssg: "No se ha encontrado usuario." });
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
            /*             res.status(200).send({
              mssg: "Email y contraseña válido.",
              status: status,
              user: issetUser,
            }); */
          } else {
            res.status(500).send({
              mssg: "El email o contraseña no coincide.",
              status: status,
            });
          }
        });
      }
    }
  });
}

function updateUser(req, res) {
  var userId = req.params.id;
  var update = req.body;

  if (userId != req.user.sub) {
    res
      .status(500)
      .send({ mssg: "No tienes permiso para actualizar el usuario." });
  }

  User.findByIdAndUpdate(userId, update, { new: true }, (err, userUpdated) => {
    if (err) {
      res.status(500).send({ mssg: "Error al actualizar usuario." });
    } else {
      if (userUpdated) {
        res.status(200).send({
          mssg: "El usuario ha sido actualizado correctamente.",
          userUpdated: userUpdated,
        });
      } else {
        res.status(404).send({ mssg: "No se ha podido actualizar el usuario" });
      }
    }
  });
}

function deleteUser(req, res) {
  var userId = req.params.id;

  if (userId != req.user.sub) {
    res
      .status(500)
      .send({ mssg: "No tienes permiso para actualizar el usuario." });
  }

  User.findByIdAndDelete(userId, (err, userDeleted) => {
    if (err) {
      res.status(500).send({ mssg: "Error en la petición." });
    } else {
      if (userDeleted) {
        res.status(500).send({
          mssg: "Usuario eliminado correctamente.",
          userDeleted: userDeleted,
        });
      } else {
        res.status(500).send({ mssg: "No se ha podido eliminar el usuario." });
      }
    }
  });
}

module.exports = {
  pruebas,
  saveUser,
  login,
  updateUser,
  deleteUser,
};
