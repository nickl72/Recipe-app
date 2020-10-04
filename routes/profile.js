const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.profile.renderProfile);

module.exports = router;