import express from 'express';
import * as noteController from '../controllers/note.controller.js';
import {userAuth} from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post('/create',userAuth, noteController.createNote);
router.get('/:_id',userAuth,noteController.retrieveNote);
router.put('/:_id',userAuth, noteController.updateNote);
router.delete('/:_id',userAuth, noteController.deleteNote);

export default router;

