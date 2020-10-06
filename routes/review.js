const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.post('/:recipeId', ctrl.review.postReview)

module.exports = router;