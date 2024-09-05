const express = require('express');
const router = express.Router();
const { startBattle } = require('../controllers/battleController'); 




router.post("/start",startBattle,()=>{console.log("Battle started")});

module.exports = router;



// Define your routes
router.post('/start', startBattle);

module.exports = router;

