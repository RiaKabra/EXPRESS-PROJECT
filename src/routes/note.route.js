import express from 'express';
import * as noteController from '../controllers/note.controller.js';
import { noteValidator } from '../validators/note.validator.js';
import {userAuth} from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get('',userAuth,noteController.getAll);
router.post('', noteValidator, userAuth, noteController.createNote);
router.get('/:_id',userAuth,noteController.retrieveNote);
router.put('/:_id',noteValidator, userAuth, noteController.updateNote);
router.delete('/:_id',userAuth, noteController.deleteNote);

export default router;


