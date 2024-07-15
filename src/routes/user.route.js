import express from 'express';
import { newUserValidator } from '../validators/user.validator.js';
import * as userController from '../controllers/user.controller.js';
const router = express.Router();

router.get('/get', userController.loginUser);
router.post('/new', userController.createUser);


export default router;
