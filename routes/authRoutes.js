const express = require('express');
const { googleAuth, googleCallback, googleRedirect } = require('../controllers/authController');
const router = express.Router();

router.get('/google', googleAuth);
router.get('/google/callback', googleCallback, googleRedirect);

module.exports = router;
