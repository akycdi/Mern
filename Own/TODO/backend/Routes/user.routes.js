const express = require('express');
const router = express.Router()

const userController = require('../Controllers/user.controllers');
const auth = require('../Middlerware/checkAuth.middleware')

router.post('/signup', userController.userSignup)
router.post('/login', auth, userController.userLogin)


module.exports = router;