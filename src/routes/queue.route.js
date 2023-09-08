const express = require('express');
const router = express.Router();

//Controllers
const queueController = require('../controllers/queue.controller');
//Middlewares
const authMiddleware = require('../middlewares/auth.middleware');

//Routes

router.use(authMiddleware.protect);

router.get('/typeStatus', queueController.findAllTypeStatus);
router.get('/available', queueController.findAllUsersAvailable);
router.get('/busy', queueController.findAllUsersBusy);
router.get('/unavailable', queueController.findAllUsersUnavailable);

router.patch('/changeMyStatus', queueController.changeStatus);

module.exports = router;
