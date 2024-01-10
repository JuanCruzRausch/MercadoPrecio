const express = require('express');
const scoreController = require('../controllers/scoreController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', scoreController.getAllScores);
router.get('/:id', scoreController.getUserScores);
router.post('/', authController.protect, scoreController.postScore);

module.exports = router;
