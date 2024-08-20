"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var noteSchema = new _mongoose.Schema({
  createdBy: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  colour: {
    type: String
  },
  isArch: {
    type: Boolean,
    "default": false
  },
  isTrash: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true
});
var _default = exports["default"] = (0, _mongoose.model)('Note', noteSchema);