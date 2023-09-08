const { User, userStatus } = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne(
    {
      _id: id,
      user_status: userStatus.active,
    },
    {
      queue_status: false,
      user_status: false,
      __v: false,
    }
  );

  if (!user) {
    return next(new AppError(`User with id: ${id}, not found`, 400));
  }

  req.user = user;
  next();
});
