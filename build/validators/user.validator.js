"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newUserValidator = void 0;
var _joi = _interopRequireDefault(require("@hapi/joi"));
var newUserValidator = exports.newUserValidator = function newUserValidator(req, res, next) {
  var schema = _joi["default"].object({
    email: _joi["default"].string().email({
      tlds: {
        allow: false
      }
    }).required(),
    password: _joi["default"].string().min(8).pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])')).required()
  });
  var _schema$validate = schema.validate(req.body),
    error = _schema$validate.error,
    value = _schema$validate.value;
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    req.validatedBody = value;
    next();
  }
};