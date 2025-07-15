const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const profileController = require('../controllers/profileController');

router.get('/getUser',authenticateToken, profileController.getUser);
router.put('/updateProfile',authenticateToken, profileController.updateProfile);

module.exports = router;