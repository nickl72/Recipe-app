const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.recipe.renderViewPage);
router.get('/:index', ctrl.recipe.renderRecipe);

router.delete('/:index', ctrl.recipe.deleteRecipe);

module.exports = router;