"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reset_pswd = exports.loginUser = exports.forget_pswd = exports.createUser = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _user = _interopRequireDefault(require("../models/user.model"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _mail = require("../helper/mail.helper");
var _rabbitmq = require("../utils/rabbitmq");
var createUser = exports.createUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userDetails) {
    var saltRounds, hashed_password, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          saltRounds = 10; // eslint-disable-next-line prettier/prettier
          console.log('Message: User details under User Service', userDetails);
          _context.next = 4;
          return _bcrypt["default"].hash(userDetails.password, saltRounds);
        case 4:
          hashed_password = _context.sent;
          userDetails.password = hashed_password;
          _context.next = 8;
          return _user["default"].create(userDetails);
        case 8:
          data = _context.sent;
          // eslint-disable-next-line prettier/prettier
          console.log('Database response: @service ', data);
          (0, _rabbitmq.sendMessage)('UserQueue', JSON.stringify({
            action: 'signup',
            data: data
          }));
          return _context.abrupt("return", data);
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function createUser(_x) {
    return _ref.apply(this, arguments);
  };
}();
var loginUser = exports.loginUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
    var login, passwordMatch, token;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _user["default"].findOne({
            email: body.email
          });
        case 3:
          login = _context2.sent;
          if (login) {
            _context2.next = 6;
            break;
          }
          throw new Error('Invalid email');
        case 6:
          _context2.next = 8;
          return _bcrypt["default"].compare(body.password, login.password);
        case 8:
          passwordMatch = _context2.sent;
          if (!passwordMatch) {
            _context2.next = 14;
            break;
          }
          token = _jsonwebtoken["default"].sign({
            firstname: login.firstname,
            email: login.email,
            id: login._id
          }, process.env.secret_key);
          return _context2.abrupt("return", token);
        case 14:
          throw new Error('Invalid password');
        case 15:
          _context2.next = 20;
          break;
        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](0);
          throw new Error('Error logging in');
        case 20:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 17]]);
  }));
  return function loginUser(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var forget_pswd = exports.forget_pswd = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(body) {
    var user, token;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _user["default"].findOne({
            email: body.email
          });
        case 2:
          user = _context3.sent;
          if (user) {
            _context3.next = 5;
            break;
          }
          throw new Error('User not found');
        case 5:
          // eslint-disable-next-line max-len, prettier/prettier
          token = _jsonwebtoken["default"].sign({
            email: user.email,
            id: user._id
          }, process.env.SECRET_KEY_NEW);
          _context3.next = 8;
          return (0, _mail.mailSender)(user.email, token);
        case 8:
          return _context3.abrupt("return", token);
        case 9:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function forget_pswd(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
var reset_pswd = exports.reset_pswd = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(body, token) {
    var decoded, user, hashedPassword;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          if (token) {
            _context4.next = 3;
            break;
          }
          throw new Error('Token not provided');
        case 3:
          decoded = _jsonwebtoken["default"].verify(token, process.env.SECRET_KEY_NEW);
          _context4.next = 6;
          return _user["default"].findOne({
            _id: decoded.id
          });
        case 6:
          user = _context4.sent;
          if (user) {
            _context4.next = 9;
            break;
          }
          throw new Error('User not found');
        case 9:
          if (!(!body.password || typeof body.password !== 'string')) {
            _context4.next = 11;
            break;
          }
          throw new Error('Invalid password format');
        case 11:
          _context4.next = 13;
          return _bcrypt["default"].hash(body.password, 10);
        case 13:
          hashedPassword = _context4.sent;
          user.password = hashedPassword;
          _context4.next = 17;
          return user.save();
        case 17:
          return _context4.abrupt("return", {
            message: 'Password updated successfully'
          });
        case 20:
          _context4.prev = 20;
          _context4.t0 = _context4["catch"](0);
          console.error('Error in reset_pswd service:', _context4.t0);
          throw new Error('Password reset failed: ' + _context4.t0.message);
        case 24:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 20]]);
  }));
  return function reset_pswd(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();