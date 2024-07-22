import express from 'express';
import * as noteController from '../controllers/note.controller.js';
import { noteValidator } from '../validators/note.validator.js';
import {userAuth} from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get('',userAuth,noteController.getAll);
router.post('', noteValidator, userAuth, noteController.createNote);
router.post('/archived/:_id', userAuth, noteController.toggleArchiveNote)
router.post('/unarchived/:_id', userAuth, noteController.toggleArchiveNote);
router.get('/:_id',userAuth,noteController.retrieveNote);
router.put('/:_id',noteValidator, userAuth, noteController.updateNote);
router.delete('/:_id',userAuth, noteController.deleteNote);
router.patch('/colour/:_id', userAuth, noteController.colourUpdate);
router.delete('/trash/:_id', userAuth, noteController.toggleTrashNote);
router.post('/untrash/:_id', userAuth, noteController.toggleTrashNote);
export default router;


