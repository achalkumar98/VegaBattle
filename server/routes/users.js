const express = require('express');
const {getUser} = require('../controllers/userController.js');
const verifyToken = require('../middlewares/auth.js');
const router = express.Router();



router.get("/:id",verifyToken,getUser);

module.exports = router;