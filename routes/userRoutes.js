const express = require('express');
const router = express.Router();
const usrerControllers = require('../controllers/userController');

router.post('/register', usrerControllers.register);
router.post('/login', usrerControllers.login);

module.exports = router;