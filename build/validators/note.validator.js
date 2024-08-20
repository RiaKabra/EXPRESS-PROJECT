"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noteValidator = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _joi = _interopRequireDefault(require("@hapi/joi"));
var noteValidator = exports.noteValidator = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var schema, _schema$validate, error;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          schema = _joi["default"].object({
            title: _joi["default"].string().min(0).max(100).required(),
            description: _joi["default"].string().min(0).max(150).required(),
            colour: _joi["default"].string().optional()
          });
          _schema$validate = schema.validate(req.body), error = _schema$validate.error;
          if (error) {
            res.status(400).send(error.details[0].message);
          } else {
            next();
          }
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function noteValidator(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();