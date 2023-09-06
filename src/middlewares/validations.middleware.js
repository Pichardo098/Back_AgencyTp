const { validationResult, body } = require('express-validator');
const { User, userStatus } = require('../models/user.model');

const validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.createUserValidation = [
  body('first_name').notEmpty().withMessage('First name is required'),
  body('last_name').notEmpty().withMessage('Last name is required'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('The email must have a correct format')
    .custom(async (value) => {
      const email = await User.findOne({
        email: value.toLowerCase().trim(),
      });
      if (email) {
        throw new Error(`Email ${value} already exists`);
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must have a least 8 characters')
    .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/)
    .withMessage(
      'Password must have contain a least one letter and one number'
    ),
  body('description').notEmpty().withMessage('Description is required'),
  validateFields,
];

exports.loginUserValidation = [
  body('email').notEmpty().withMessage('Email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  validateFields,
];
