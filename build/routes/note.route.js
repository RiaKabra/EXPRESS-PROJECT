"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var noteController = _interopRequireWildcard(require("../controllers/note.controller.js"));
var _noteValidator = require("../validators/note.validator.js");
var _authMiddleware = require("../middlewares/auth.middleware.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var router = _express["default"].Router();
var redis = require('redis');
router.get('', (0, _authMiddleware.userAuth)(process.env.secret_key), noteController.getAll);
router.post('', _noteValidator.noteValidator, (0, _authMiddleware.userAuth)(process.env.secret_key), noteController.createNote);
router.post('/is_arch_unarch/:_id', (0, _authMiddleware.userAuth)(process.env.secret_key), noteController.toggleArchiveNote);
router.get('/:_id', (0, _authMiddleware.userAuth)(process.env.secret_key), noteController.retrieveNote);
router.put('/:_id', _noteValidator.noteValidator, (0, _authMiddleware.userAuth)(process.env.secret_key), noteController.updateNote);
router["delete"]('/:_id', (0, _authMiddleware.userAuth)(process.env.secret_key), noteController.deleteNote);
router.patch('/colour/:_id', (0, _authMiddleware.userAuth)(process.env.secret_key), noteController.colourUpdate);
router.post('/is_trash_untrash/:_id', (0, _authMiddleware.userAuth)(process.env.secret_key), noteController.toggleTrashNote);
var _default = exports["default"] = router;