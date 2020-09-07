"use strict";

var jwt = require("jwt-simple");
var moment = require("moment");
var secret = process.env.JWT_SECRET;

exports.ensureAuth = function (req, res, next) {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ mssg: "La petición no tiene la cabecera de auth." });
  }

  var token = req.headers.authorization.replace(/['"']+/g, "");

  try {
    var payload = jwt.decode(token, secret);
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ mssg: "El token ha expirado." });
    }
  } catch (err) {
    return res.status(404).send({ mssg: "El token no es válido." });
  }

  req.user = payload;

  next();
};
