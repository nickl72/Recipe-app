const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.recipe.renderViewPage);
router.get('/:index', ctrl.recipe.renderRecipe);

module.exports = router;