const express = require('express');
const router = express.Router();

//Controllers
const userController = require('../controllers/user.controller');

//Middlewares
const validationMiddleware = require('../middlewares/validations.middleware');
const upload = require('../utils/multer');
const authMiddleware = require('../middlewares/auth.middleware');
const userMiddleware = require('../middlewares/user.middleware');

//Routes
router.post(
  '/signup',
  upload.single('profileImgUrl'),
  validationMiddleware.createUserValidation,
  userController.createUser
);
router.post(
  '/login',
  validationMiddleware.loginUserValidation,
  userController.login
);

router.use(authMiddleware.protect);

router.get('/:id', userMiddleware.validUser, userController.findOneUser);
router.get('/', userController.findAllUsers);

router
  .route('/:id')
  .patch(
    upload.single('profileImgUrl'),
    userMiddleware.validUser,
    authMiddleware.protectAccountOwner,
    userController.updateUser
  )
  .delete(
    userMiddleware.validUser,
    authMiddleware.protectAccountOwner,
    userMiddleware.validUser
  );

module.exports = router;
