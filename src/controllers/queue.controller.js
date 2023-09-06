const { User, userStatus, queueStatus } = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.findAllUsersQueueAvailable = catchAsync(async (req, res, next) => {
  const users = await User.find(
    {
      $and: [
        { user_status: userStatus.active },
        { queue_status: queueStatus.available },
      ],
    },
    {
      password: false,
      description: false,
      user_status: false,
      __v: false,
    }
  );

  return res.status(200).json({
    status: 'success',
    results: users.length,
    users,
  });
});

exports.findAllUsersQueue = catchAsync(async (req, res, next) => {
  const users = await User.find(
    { user_status: userStatus.active },
    {
      password: false,
      description: false,
      user_status: false,
      __v: false,
    }
  );

  return res.status(200).json({
    status: 'success',
    results: users.length,
    users,
  });
});
