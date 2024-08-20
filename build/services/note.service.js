"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateNote = exports.toggleTrashNote = exports.toggleArchiveNote = exports.retrieveNote = exports.getAll = exports.deleteNote = exports.createNote = exports.colourUpdate = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _note = _interopRequireDefault(require("../models/note.model"));
var _user = _interopRequireDefault(require("../utils/user.util"));
var _rabbitmq = require("../utils/rabbitmq");
var getAll = exports.getAll = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(value) {
    var cacheKey, redisClient, cachedNotes, notes;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          cacheKey = "notes:".concat(value);
          _context.next = 3;
          return (0, _user["default"])();
        case 3:
          redisClient = _context.sent;
          _context.next = 6;
          return redisClient.get(cacheKey);
        case 6:
          cachedNotes = _context.sent;
          if (!cachedNotes) {
            _context.next = 9;
            break;
          }
          return _context.abrupt("return", JSON.parse(cachedNotes));
        case 9:
          _context.next = 11;
          return _note["default"].find({
            createdBy: value
          });
        case 11:
          notes = _context.sent;
          _context.next = 14;
          return redisClient.setEx(cacheKey, 3600, JSON.stringify(notes));
        case 14:
          return _context.abrupt("return", notes);
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getAll(_x) {
    return _ref.apply(this, arguments);
  };
}();
var createNote = exports.createNote = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(noteDetails) {
    var data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _note["default"].create(noteDetails);
        case 2:
          data = _context2.sent;
          (0, _rabbitmq.sendMessage)('noteQueue', JSON.stringify({
            action: 'create',
            data: data
          }));
          return _context2.abrupt("return", data);
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function createNote(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var retrieveNote = exports.retrieveNote = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(noteCreatedBy, noteId) {
    var data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _note["default"].findOne({
            createdBy: noteCreatedBy,
            _id: noteId
          });
        case 2:
          data = _context3.sent;
          return _context3.abrupt("return", data);
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function retrieveNote(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();
var updateNote = exports.updateNote = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(noteDetails, noteId) {
    var title, description, colour, createdBy, data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          title = noteDetails.title, description = noteDetails.description, colour = noteDetails.colour, createdBy = noteDetails.createdBy;
          _context4.next = 3;
          return _note["default"].findOneAndUpdate({
            createdBy: createdBy,
            _id: noteId
          }, {
            title: title,
            description: description,
            colour: colour
          }, {
            "new": true
          });
        case 3:
          data = _context4.sent;
          return _context4.abrupt("return", data);
        case 5:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function updateNote(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();
var toggleArchiveNote = exports.toggleArchiveNote = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(noteId) {
    var note;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return _note["default"].findById(noteId);
        case 2:
          note = _context5.sent;
          if (note) {
            _context5.next = 5;
            break;
          }
          throw new Error('Note not found');
        case 5:
          if (!(note.isTrash !== true)) {
            _context5.next = 9;
            break;
          }
          note.isArch = !note.isArch;
          _context5.next = 10;
          break;
        case 9:
          throw new Error("Trashed note cannot be archived");
        case 10:
          _context5.next = 12;
          return note.save();
        case 12:
          return _context5.abrupt("return", note);
        case 13:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function toggleArchiveNote(_x7) {
    return _ref5.apply(this, arguments);
  };
}();
var toggleTrashNote = exports.toggleTrashNote = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(noteId) {
    var note;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return _note["default"].findById(noteId);
        case 2:
          note = _context6.sent;
          if (note) {
            _context6.next = 5;
            break;
          }
          throw new Error('Note not found');
        case 5:
          note.isTrash = !note.isTrash;
          _context6.next = 8;
          return note.save();
        case 8:
          return _context6.abrupt("return", note);
        case 9:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function toggleTrashNote(_x8) {
    return _ref6.apply(this, arguments);
  };
}();
var colourUpdate = exports.colourUpdate = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(noteid, colour) {
    var validColours, note;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          validColours = ["blue", "red", "white", "black", "yellow", "orange"];
          if (validColours.includes(colour)) {
            _context7.next = 3;
            break;
          }
          throw new Error("Invalid colour");
        case 3:
          _context7.next = 5;
          return _note["default"].findById(noteid);
        case 5:
          note = _context7.sent;
          if (note) {
            _context7.next = 8;
            break;
          }
          throw new Error("Note not found");
        case 8:
          note.colour = colour;
          _context7.next = 11;
          return note.save();
        case 11:
          return _context7.abrupt("return", note);
        case 12:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function colourUpdate(_x9, _x10) {
    return _ref7.apply(this, arguments);
  };
}();
var deleteNote = exports.deleteNote = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(created, noteid) {
    var note;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return _note["default"].findOneAndDelete({
            createdBy: created,
            _id: noteid
          });
        case 2:
          note = _context8.sent;
          if (note) {
            _context8.next = 5;
            break;
          }
          throw new Error('Note not found');
        case 5:
          return _context8.abrupt("return", note);
        case 6:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function deleteNote(_x11, _x12) {
    return _ref8.apply(this, arguments);
  };
}();