const { User, userStatus, queueStatus } = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.findAllTypeStatus = catchAsync(async (req, res, next) => {
  const status = [
    { name: 'available' },
    { name: 'unavailable' },
    { name: 'busy' },
  ];

  return res.status(200).json({
    status: 'success',
    results: status.length,
    status,
  });
});

exports.findAllUsersAvailable = catchAsync(async (req, res, next) => {
  const users = await User.find(
    { user_status: userStatus.active, queue_status: queueStatus.available },
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

exports.findAllUsersBusy = catchAsync(async (req, res, next) => {
  const users = await User.find(
    { user_status: userStatus.active, queue_status: queueStatus.busy },
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

exports.findAllUsersUnavailable = catchAsync(async (req, res, next) => {
  const users = await User.find(
    { user_status: userStatus.active, queue_status: queueStatus.unavailable },
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

exports.changeStatus = catchAsync(async (req, res, next) => {
  const { _id } = req.sessionUser;
  const { queue_status } = req.body;

  const filter = { _id };
  const update = { queue_status };

  await User.findOneAndUpdate(filter, update, { new: true });

  return res.status(200).json({
    status: 'success',
    message: 'Queue status has been updated',
  });
});
