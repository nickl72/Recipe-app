const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.post('/:recipeId', ctrl.review.postReview)

router.delete('/:reviewId', ctrl.review.deleteReview)

router.put('/:reviewId', ctrl.review.editReview);

module.exports = router;