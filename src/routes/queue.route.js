const express = require('express');
const router = express.Router();

//Controllers
const queueController = require('../controllers/queue.controller');

router.get('/available', queueController.findAllUsersQueueAvailable);

router.get('/', queueController.findAllUsersQueue);

module.exports = router;
