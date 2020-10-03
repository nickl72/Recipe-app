const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/signup', ctrl.auth.renderSignUp);

router.post('/createUser')

module.exports = router;