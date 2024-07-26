import express from 'express';
import { newUserValidator } from '../validators/user.validator.js';
import * as userController from '../controllers/user.controller.js';
import {userAuth} from "../middlewares/auth.middleware.js";
require('dotenv').config();
const router = express.Router();
let Secret_Key = process.env.SECRET_KEY_NEW;
console.log("this is the secret key------>" ,Secret_Key);
router.get('/login', userController.loginUser);
router.post('/signup', userController.createUser);
router.post('/reset_pswd', userAuth(process.env.SECRET_KEY_NEW), userController.reset_pswd);
router.post('/forget_pswd', userController.forget_pswd);


export default router
