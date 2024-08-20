"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mailSender = mailSender;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
require('dotenv').config();
var nodemailer = require('nodemailer');
var html = "\n<h1>Hello World</h1>\n<p>Nodemailer uses</p>\n\n";
function mailSender(_x, _x2) {
  return _mailSender.apply(this, arguments);
}
function _mailSender() {
  _mailSender = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(email, token) {
    var transporter, info;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
            },
            debug: true,
            logger: true
          });
          _context.prev = 1;
          _context.next = 4;
          return transporter.sendMail({
            to: email,
            subject: 'Forget password link ',
            html: "<h1>Hello,<br><br>Click on given link to reset your password!</h1><br><h1>Link:><a href=\"http://localhost:".concat(3000, "/", token, "\">click here</a></h1>")
          });
        case 4:
          info = _context.sent;
          console.log("Message sent: " + info.messageId);
          _context.next = 11;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          console.log("Error sending email: ", _context.t0);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 8]]);
  }));
  return _mailSender.apply(this, arguments);
}