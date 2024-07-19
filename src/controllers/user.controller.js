import * as UserService from '../services/user.service';
import HttpStatus from 'http-status-codes';

export const createUser = async (req, res, next) => {
  try {
    const data = await UserService.createUser(req.body);
    console.log("database details", data)
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    next(error);
  }
};


export const loginUser = async (req, res, next) => {
  try {
    const data = await UserService.loginUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Login successful'
    });
    console.log(data)
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,

      message: ` ${error}`
    });
  }
}