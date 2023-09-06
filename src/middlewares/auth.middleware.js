const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { User, userStatus } = require('../models/user.model');

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Please login', 401));
  }

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );

  const user = await User.findOne(
    {
      _id: decoded.id,
      user_status: userStatus.active,
    },
    {
      email: true,
      updated_at: true,
      role: true,
    }
  );

  if (!user) {
    return next(new AppError('The owner account is not available', 401));
  }

  //TODO: Validación de cambio de datos-->Pendiente

  req.sessionUser = user;
  next();
});

exports.protectAccountOwner = (req, res, next) => {
  const { user, sessionUser } = req;

  const userId = user._id;
  const sessionUserId = sessionUser._id;

  if (!userId.equals(sessionUserId)) {
    return next(new AppError("You don't own this account", 401));
  }

  next();
};

exports.allowTo = (...roles) => {
  return (req, res, next) => {
    console.log(req.sessionUser);
    if (!roles.includes(req.sessionUser.role)) {
      return next(
        new AppError('You do not have permission to perform this action.', 403)
      );
    }
    next();
  };
};
