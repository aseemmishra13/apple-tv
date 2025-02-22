const express = require('express');
const router = express.Router();
const { getContent, createContent } = require('../controller/contentController');
const auth = require('../middleware/auth');

// Get all content (public)
router.get('/', getContent);

// Create new content (admin only)
router.post('/', auth, createContent);

module.exports = router;