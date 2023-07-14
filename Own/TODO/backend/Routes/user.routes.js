const express = require('express');
const router = express.Router()

const userController = require('../Controllers/user.controllers');

router.post('/user/signup',userController.usersignup)

module.exports = router;