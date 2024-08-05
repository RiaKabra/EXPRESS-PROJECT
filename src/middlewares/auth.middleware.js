import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

// /**
//  * Middleware to authenticate if user has a valid Authorization token
//  * Authorization: Bearer <token>
//  *
//  * @param {Object} req
//  * @param {Object} res
//  * @param {Function} next
//  */
// export const userAuth = async (req, res, next) => {
//   try {
//     let bearerToken = req.header('Authorization');
//     if (!bearerToken)
//       throw {
//         code: HttpStatus.BAD_REQUEST,
//         message: 'Authorization token is required'
//       };
//     bearerToken = bearerToken.split(' ')[1];
//     const user  = await jwt.verify(bearerToken, process.env.secret_key);
//     req.body.createdBy = user.id;
//     next();
//   } catch (error) {
//     res.status(HttpStatus.UNAUTHORIZED).json({
//       code: HttpStatus.UNAUTHORIZED,
//       message: `${error}`
//     })
//   }
// };

export const userAuth = (secretKey) => {
  return async (req, res, next) => {
    try {
      let bearerToken = req.header('Authorization');
      console.log('bearerToken before splitting----->', bearerToken);

      if (!bearerToken) {
        throw {
          code: HttpStatus.BAD_REQUEST,
          message: 'Authorization token is required'
        };
      }

      bearerToken = bearerToken.split(' ')[1];
      //console.log('bearerToken after splitting---->', bearerToken);
      console.log(secretKey);

      let userDetails = jwt.verify(bearerToken, secretKey);
      req.body.UserID = userDetails.id;
      next();
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: 'Invalid or expired token'
        })
  }
}
};
