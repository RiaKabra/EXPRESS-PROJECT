import express from 'express';
import * as noteController from '../controllers/note.controller.js';
import { noteValidator } from '../validators/note.validator.js';
import {userAuth} from "../middlewares/auth.middleware.js";
const router = express.Router();
const redis = require('redis');
router.get('',userAuth(process.env.secret_key),noteController.getAll);
router.post('', noteValidator, userAuth(process.env.secret_key), noteController.createNote);
router.post('/is_arch_unarch/:_id', userAuth(process.env.secret_key), noteController.toggleArchiveNote)
router.get('/:_id',userAuth(process.env.secret_key),noteController.retrieveNote);
router.put('/:_id',noteValidator, userAuth(process.env.secret_key), noteController.updateNote);
router.delete('/:_id',userAuth(process.env.secret_key), noteController.deleteNote);
router.patch('/colour/:_id', userAuth(process.env.secret_key), noteController.colourUpdate);
router.post('/is_trash_untrash/:_id', userAuth(process.env.secret_key), noteController.toggleTrashNote);

export default router;


