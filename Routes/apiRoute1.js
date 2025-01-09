const express = require('express');
const UserController = require('../Controllers/UserController')
const authMiddleware = require('../Middleware/authMiddleware')
const router = express.Router();

router.post('/auth/signup', UserController.AddUser);
router.post('/auth/login', UserController.LoginUser);
router.get('/auth/protected',authMiddleware.protect);

module.exports = router;