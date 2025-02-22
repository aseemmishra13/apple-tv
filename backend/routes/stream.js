const express = require('express');
const router = express.Router();
const { streamVideo } = require('../controller/streamController');

router.get('/:contentId', streamVideo);

module.exports = router;