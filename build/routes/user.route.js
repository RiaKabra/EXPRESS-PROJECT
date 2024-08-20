"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userValidator = require("../validators/user.validator.js");
var userController = _interopRequireWildcard(require("../controllers/user.controller.js"));
var _authMiddleware = require("../middlewares/auth.middleware.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
require('dotenv').config();
var router = _express["default"].Router();
var Secret_Key = process.env.SECRET_KEY_NEW;
router.post('/login', userController.loginUser);
router.post('/signup', userController.createUser);
router.post('/reset_pswd', (0, _authMiddleware.userAuth)(process.env.SECRET_KEY_NEW), userController.reset_pswd);
router.post('/forget_pswd', userController.forget_pswd);
var _default = exports["default"] = router;