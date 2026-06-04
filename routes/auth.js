const express = require('express');
const { login, logout, register } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/login', login);
router.post('/logout', protect, logout);
router.post('/register', register);

module.exports = router;
