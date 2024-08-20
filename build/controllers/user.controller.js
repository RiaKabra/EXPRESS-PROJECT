"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reset_pswd = exports.loginUser = exports.forget_pswd = exports.createUser = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var UserService = _interopRequireWildcard(require("../services/user.service"));
var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var createUser = exports.createUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return UserService.createUser(req.body);
        case 3:
          data = _context.sent;
          console.log("database details", data);
          res.status(_httpStatusCodes["default"].CREATED).json({
            code: _httpStatusCodes["default"].CREATED,
            data: data,
            message: 'User created successfully'
          });
          _context.next = 11;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          res.status(_httpStatusCodes["default"].BAD_REQUEST).json({
            code: _httpStatusCodes["default"].BAD_REQUEST,
            message: "".concat(_context.t0)
          });
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function createUser(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var loginUser = exports.loginUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return UserService.loginUser(req.body);
        case 3:
          data = _context2.sent;
          res.status(_httpStatusCodes["default"].OK).json({
            code: _httpStatusCodes["default"].OK,
            data: data,
            message: 'Login successful'
          });
          console.log(data);
          _context2.next = 11;
          break;
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          res.status(_httpStatusCodes["default"].BAD_REQUEST).json({
            code: _httpStatusCodes["default"].BAD_REQUEST,
            message: "".concat(_context2.t0)
          });
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return function loginUser(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var forget_pswd = exports.forget_pswd = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var token;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return UserService.forget_pswd(req.body);
        case 3:
          token = _context3.sent;
          res.status(_httpStatusCodes["default"].OK).json({
            code: _httpStatusCodes["default"].OK,
            message: 'Token generated successfully',
            data: token
          });
          _context3.next = 11;
          break;
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error('Error occurred:', _context3.t0.message);
          res.status(_httpStatusCodes["default"].BAD_REQUEST).json({
            code: _httpStatusCodes["default"].BAD_REQUEST,
            message: _context3.t0.message
          });
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function forget_pswd(_x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

// export const reset_pswd = async (req, res) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1]; 
//     const result = await UserService.reset_pswd(req.body, token);
//     res.status(HttpStatus.OK).json({
//       code: HttpStatus.OK,
//       message: result.message,
//     });
//   } catch (error) {
//     console.error('Error occurred:', error.message);
//     res.status(HttpStatus.BAD_REQUEST).json({
//       code: HttpStatus.BAD_REQUEST,
//       message: `$`
//     });
//   }
// };

var reset_pswd = exports.reset_pswd = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var token, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          token = req.headers.authorization.split(' ')[1];
          console.log("token is ----", token);
          if (token) {
            _context4.next = 5;
            break;
          }
          return _context4.abrupt("return", res.status(_httpStatusCodes["default"].BAD_REQUEST).json({
            code: _httpStatusCodes["default"].BAD_REQUEST,
            message: 'Authorization token missing'
          }));
        case 5:
          _context4.next = 7;
          return UserService.reset_pswd(req.body, token);
        case 7:
          result = _context4.sent;
          res.status(_httpStatusCodes["default"].OK).json({
            code: _httpStatusCodes["default"].OK,
            data: result,
            message: result.message
          });
          _context4.next = 15;
          break;
        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          console.error('Error in reset_pswd controller:', _context4.t0.message);
          res.status(_httpStatusCodes["default"].BAD_REQUEST).json({
            code: _httpStatusCodes["default"].BAD_REQUEST,
            message: _context4.t0.message
          });
        case 15:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 11]]);
  }));
  return function reset_pswd(_x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();