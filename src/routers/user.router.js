const express = require('express');
const { UserController } = require('../controllers');

const router = express.Router();

router.route('/create').post(UserController.createUser);

router.route('/:userId').get(UserController.getUser);

module.exports = router;
