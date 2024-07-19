import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import logger from '../config/logger';
export function authorize(req, res, next) {
  const token = req.headers['authorization'];
  /**
 * Middleware for blocking unauthorized access.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

  if (!token) {
    logger.warn(`Unauthorized access attempt `);
    return res.status(HttpStatus.UNAUTHORIZED).json({
      code: HttpStatus.UNAUTHORIZED,
      message: 'No token provided, authorization denied'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      logger.warn(`Invalid token provided for access `);
      return res.status(HttpStatus.UNAUTHORIZED).json({
        code: HttpStatus.UNAUTHORIZED,
        message: 'Invalid token, authorization denied'
      });
    }
    
    req.user = decoded;
    next();
  });
}

/**
 * Error response middleware for 404 not found.
 *
 * @param {Object} req
 * @param {Object} res
 */
export function notFound(req, res) {
  res.status(HttpStatus.NOT_FOUND).json({
    code: HttpStatus.NOT_FOUND,
    message: 'Ooops, route not found'
  });
}

/**
 * Error response middleware for handling all app errors except generic errors.
 *
 * @param  {Object}   err
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
// eslint-disable-next-line no-unused-vars
export function appErrorHandler(err, req, res, next) {
  if (err.code && typeof err.code === 'number') {
    logger.error(`
      status - ${err.code}
      message - ${err.message} 
      url - ${req.originalUrl} 
      method - ${req.method} 
      IP - ${req.ip}
    `);
    res.status(err.code).json({
      code: err.code,
      message: err.message
    });
  } else {
    next(err);
  }
}

/**
 * Generic error response middleware for internal server errors.
 *
 * @param  {Object}   err
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
// eslint-disable-next-line no-unused-vars
export function genericErrorHandler(err, req, res, next) {
  logger.error(`
    status - ${HttpStatus.INTERNAL_SERVER_ERROR} 
    message - ${err.stack} 
    url - ${req.originalUrl} 
    method - ${req.method} 
    IP - ${req.ip}
  `);

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    data: '',
    message: err.message
  });
}
