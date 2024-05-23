const express = require('express');
const { getProfile, updateProfile, listPublicProfiles, listAllProfiles } = require('../controllers/profileController');
const { authenticate, authorizeAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/me', authenticate, getProfile);
router.put('/me', authenticate, updateProfile);
router.get('/public', listPublicProfiles);
router.get('/all', authenticate, authorizeAdmin, listAllProfiles);

module.exports = router;