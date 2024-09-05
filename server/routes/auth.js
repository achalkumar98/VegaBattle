const express = require('express');
const { login, register } = require('../controllers/auth.js');

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

module.exports = router;
