const Error = require('../models/error.model');
const AppError = require('../utils/appError');

const handleJWTExpiredError = () =>
  new AppError('Your token has expired, please login again', 401);

const handleJWTError = () =>
  new AppError('Invalid Token. Please login again', 401);

const sendErrorProd = (err, res) => {
  const error = new Error({
    status: err.status,
    message: err.message,
    stack: err.stack,
    created_at: Date.now(),
  });

  error
    .save()
    .then()
    .catch((err) => console.log(err));

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

const sendErrorDev = (err, res) => {
  console.log(err);
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    err,
  });
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }

  if (process.env.NODE_ENV === 'production') {
    let error = err;
    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();
    sendErrorProd(error, res);
  }
};

module.exports = globalErrorHandler;
