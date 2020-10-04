const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/signup', ctrl.auth.renderSignUp);
router.get('/login', ctrl.auth.renderLogin)

router.post('/createUser', ctrl.auth.createUser)

module.exports = router;