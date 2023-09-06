const { createTel, createExt } = require('../utils/createTel');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { User, userStatus } = require('../models/user.model');
const AppError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const generateJWT = require('../utils/jwt');
const mongoose = require('mongoose');
const storage = require('../utils/firebase');

exports.createUser = catchAsync(async (req, res, next) => {
  const { first_name, last_name, email, password, description, role } =
    req.body;

  const tel = createTel();
  const ext = createExt();

  let url;

  if (req.file) {
    const imgRef = ref(storage, `users/${Date.now()}-${req.file.originalname}`);
    const imgUpload = await uploadBytes(imgRef, req.file.buffer);
    const refDownload = ref(storage, imgUpload.metadata.fullPath);
    url = await getDownloadURL(refDownload);
  }

  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    first_name: first_name.toLowerCase().trim(),
    last_name: last_name.toLowerCase().trim(),
    email: email.toLowerCase().trim(),
    password: encryptedPassword,
    role,
    tel,
    description,
    ext_tel: ext,
    profile_img: url,
  });

  const token = await generateJWT(user._id);

  user
    .save()
    .then((result) => {
      res.status(200).json({
        status: 'succes',
        message: 'User has been created',
        token,
        user: {
          id: result._id,
          first_name: result.first_name,
          last_name: result.last_name,
          email: result.email,
          tel: result.tel,
          ext_tel: result.ext_tel,
          desc: result.description,
          profile_Img: result.profile_img,
          role: result.role,
        },
      });
    })
    .catch((err) => console.log(err));
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
    user_status: userStatus.active,
  });

  if (!user) {
    return next(new AppError(`User with email:${email}, not found`, 400));
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Email or password is wrong'));
  }

  const token = await generateJWT(user._id);

  return res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      tel: user.tel,
      ext_tel: user.ext_tel,
      desc: user.description,
      profile_Img: user.profile_img,
      role: user.role,
    },
  });
});

exports.findOneUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  return res.status(200).json({
    status: 'success',
    user,
  });
});

exports.findAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find(
    {
      user_status: userStatus.active,
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

exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { first_name, last_name, currentPassword, newPassword, description } =
    req.body;

  let url;

  if (req.file) {
    const imgRef = ref(storage, `users/${Date.now()}-${req.file.originalname}`);
    const imgUpload = await uploadBytes(imgRef, req.file.buffer);
    const refDownload = ref(storage, imgUpload.metadata.fullPath);
    url = await getDownloadURL(refDownload);
  }

  if (currentPassword === newPassword) {
    return next(new AppError('The password cannot be equals', 400));
  }

  if (!(await bcrypt.compare(currentPassword, user.password))) {
    return next(new AppError('The password is wrong'));
  }

  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(newPassword, salt);

  const filter = { _id: user._id };
  const updated = {
    first_name,
    last_name,
    password: encryptedPassword,
    description,
    profile_img: url,
    updated_at: Date.now(),
  };

  await User.findOneAndUpdate(filter, updated, { new: true });

  return res.status(201).json({
    status: 'success',
    message: 'User has been updated',
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  const filter = { _id: user._id };
  const updated = {
    user_status: userStatus.inactive,
  };

  await User.findOneAndUpdate(filter, updated, { new: true });

  return res.status(200).json({
    status: 'success',
    message: 'User has been deleted',
  });
});

exports.updateRole = catchAsync(async (req, res, next) => {
  const { role } = req.body;
  const { id } = req.params;

  const filter = { _id: id };
  const updated = { role };

  await User.findOneAndUpdate(filter, updated, { new: true });

  return res.status(201).json({
    status: 'success',
    message: 'User has been updated',
  });
});

exports.findUsersRoleSrJr = catchAsync(async (req, res, next) => {
  const users = await User.find(
    {
      user_status: userStatus.active,
      role: { $in: ['jr executive', 'sr executive'] },
    },
    {
      __v: false,
      created_at: false,
      description: false,
      password: false,
      user_status: false,
      queue_status: false,
    }
  );

  return res.status(200).json({
    status: 'success',
    results: users.length,
    users,
  });
});

exports.findMyProfile = catchAsync(async (req, res, next) => {
  const { _id } = req.sessionUser;

  const user = await User.findOne(
    {
      _id,
    },
    {
      __v: false,
      created_at: false,
      _id: false,
      user_status: false,
      password: false,
    }
  );

  return res.status(200).json({
    status: 'success',
    user,
  });
});
