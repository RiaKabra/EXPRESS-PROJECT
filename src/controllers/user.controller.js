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
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: ` ${error}`
  });
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

export const forget_pswd = async (req, res) => {
  try {
      console.log('Request body:', req.body);

      const token = await UserService.forget_pswd(req.body);

      res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          message: 'Token generated successfully',
          data: token,
      });
  } catch (error) {
      console.error('Error occurred:', error.message);

      res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          message: error.message,
      });
  }
};

export const reset_pswd = async (req, res,next) => {
  try {

      const token = await UserService.reset_pswd(req.body);

      res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          message: "Password reset successful",
          data: token,
      });
  } catch (error) {
      console.error('Error occurred:', error.message);

      res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          message: error.message,
      });
  }
};