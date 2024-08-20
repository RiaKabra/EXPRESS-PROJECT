"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateNote = exports.toggleTrashNote = exports.toggleArchiveNote = exports.retrieveNote = exports.getAll = exports.deleteNote = exports.createNote = exports.colourUpdate = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var noteService = _interopRequireWildcard(require("../services/note.service"));
var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var getAll = exports.getAll = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var getAllNotes;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return noteService.getAll(req.body.createdBy);
        case 3:
          getAllNotes = _context.sent;
          res.status(_httpStatusCodes["default"].OK).json({
            code: _httpStatusCodes["default"].OK,
            note: getAllNotes,
            message: "All notes retrieved"
          });
          _context.next = 10;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(_httpStatusCodes["default"].BAD_REQUEST).json({
            code: _httpStatusCodes["default"].BAD_REQUEST,
            message: " ".concat(_context.t0)
          });
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function getAll(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var createNote = exports.createNote = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var note;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          console.log(req.body);
          _context2.next = 4;
          return noteService.createNote(req.body);
        case 4:
          note = _context2.sent;
          res.status(_httpStatusCodes["default"].CREATED).json({
            code: _httpStatusCodes["default"].CREATED,
            note: note,
            message: "Note created successfully"
          });
          _context2.next = 11;
          break;
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          res.status(_httpStatusCodes["default"].BAD_REQUEST).json({
            code: _httpStatusCodes["default"].BAD_REQUEST,
            message: " ".concat(_context2.t0)
          });
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return function createNote(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var retrieveNote = exports.retrieveNote = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var _retrieveNote;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return noteService.retrieveNote(req.body.createdBy, req.params._id);
        case 3:
          _retrieveNote = _context3.sent;
          if (_retrieveNote) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("return", res.status(_httpStatusCodes["default"].BAD_REQUEST).json({
            code: _httpStatusCodes["default"].BAD_REQUEST,
            message: "Note not found"
          }));
        case 6:
          res.status(_httpStatusCodes["default"].OK).json({
            code: _httpStatusCodes["default"].OK,
            note: _retrieveNote,
            message: "Note retrieved successfully"
          });
          _context3.next = 12;
          break;
        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          res.status(_httpStatusCodes["default"].BAD_REQUEST).json({
            code: _httpStatusCodes["default"].BAD_REQUEST,
            message: " ".concat(_context3.t0)
          });
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return function retrieveNote(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var updateNote = exports.updateNote = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var updatedNote;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          console.log("Request body and paramters---->", req.body, req.params);
          _context4.next = 4;
          return noteService.updateNote(req.body, req.params._id);
        case 4:
          updatedNote = _context4.sent;
          res.status(_httpStatusCodes["default"].OK).json({
            code: _httpStatusCodes["default"].OK,
            note: updatedNote,
            message: "Note updated successfully"
          });
          _context4.next = 11;
          break;
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          res.status(_httpStatusCodes["default"].BAD_REQUEST).json({
            code: _httpStatusCodes["default"].BAD_REQUEST,
            message: " ".concat(_context4.t0)
          });
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 8]]);
  }));
  return function updateNote(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
var toggleArchiveNote = exports.toggleArchiveNote = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _id, note;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _id = req.params._id;
          _context5.next = 4;
          return noteService.toggleArchiveNote(_id);
        case 4:
          note = _context5.sent;
          res.status(_httpStatusCodes["default"].OK).json({
            message: "Note archive status changed successfully",
            data: note
          });
          _context5.next = 11;
          break;
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          res.status(_httpStatusCodes["default"].BAD_REQUEST).json({
            message: "".concat(_context5.t0)
          });
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 8]]);
  }));
  return function toggleArchiveNote(_x13, _x14) {
    return _ref5.apply(this, arguments);
  };
}();
var toggleTrashNote = exports.toggleTrashNote = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var _id, note;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _id = req.params._id;
          _context6.next = 4;
          return noteService.toggleTrashNote(_id);
        case 4:
          note = _context6.sent;
          res.status(_httpStatusCodes["default"].OK).json({
            message: "Note trash status changed successfully",
            data: note
          });
          _context6.next = 11;
          break;
        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          res.status(_httpStatusCodes["default"].BAD_REQUEST).json({
            message: "".concat(_context6.t0)
          });
        case 11:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return function toggleTrashNote(_x15, _x16) {
    return _ref6.apply(this, arguments);
  };
}();
var colourUpdate = exports.colourUpdate = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var colour;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return noteService.colourUpdate(req.params._id, req.body.colour);
        case 3:
          colour = _context7.sent;
          res.status(_httpStatusCodes["default"].OK).json({
            code: _httpStatusCodes["default"].OK,
            message: "Note colour changed successfully",
            data: colour
          });
          _context7.next = 10;
          break;
        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          res.status(_httpStatusCodes["default"].BAD_REQUEST).json({
            code: _httpStatusCodes["default"].BAD_REQUEST,
            message: "$error"
          });
        case 10:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 7]]);
  }));
  return function colourUpdate(_x17, _x18, _x19) {
    return _ref7.apply(this, arguments);
  };
}();
var deleteNote = exports.deleteNote = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
    var _deleteNote;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return noteService.deleteNote(req.body.createdBy, req.params._id);
        case 3:
          _deleteNote = _context8.sent;
          if (_deleteNote) {
            _context8.next = 6;
            break;
          }
          return _context8.abrupt("return", res.status(_httpStatusCodes["default"].BAD_REQUEST).json({
            code: _httpStatusCodes["default"].BAD_REQUEST,
            message: "Note not found"
          }));
        case 6:
          res.status(_httpStatusCodes["default"].OK).json({
            code: _httpStatusCodes["default"].OK,
            message: "Note deleted successfully"
          });
          _context8.next = 12;
          break;
        case 9:
          _context8.prev = 9;
          _context8.t0 = _context8["catch"](0);
          res.status(_httpStatusCodes["default"].BAD_REQUEST).json({
            code: _httpStatusCodes["default"].BAD_REQUEST,
            message: " ".concat(_context8.t0)
          });
        case 12:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 9]]);
  }));
  return function deleteNote(_x20, _x21, _x22) {
    return _ref8.apply(this, arguments);
  };
}();