const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.profile.renderMyProfile);
router.get('/:username', ctrl.profile.renderProfile);

router.post('/:recpieid/:userid', ctrl.profile.createSavedRecipe)

module.exports = router;