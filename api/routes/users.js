const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

const UsersController = require('../../controllers/users');


//Add Users to the db
router.post("/signup", UsersController.user_signup);


//User Login
router.post('/login', UsersController.user_login);


//Delete User from database
router.delete('/:userId', checkAuth, UsersController.user_delete_user);

module.exports = router;
