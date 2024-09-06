const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const verifyToken = require('../middlewares/auth');

router.get('/:id', verifyToken, profileController.getProfile);

module.exports = router;
