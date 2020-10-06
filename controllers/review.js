const review = require('../models/review');

const Review = require('../models').Review;
const User = require('../models').User;
const Recipe = require('../models').Recipe;

const postReview = (req,res) => {

    // req.body has review, and rating
    // req.params has recipeId
    req.body.recipeId = req.params.recipeId;
    req.body.userId = req.user.id;
    console.log('\n\n\n',req.user, '\n\n\n');
    Review.create(req.body)
    .then(newReview => {
        res.redirect(`/${req.params.recipeId}`);
    })

}

const deleteReview = (req, res) => {
    Review.destroy({
        where: {
            id: req.params.reviewId
        }
    })
    .then(() => {
        res.redirect(`/${req.query.recipeId}`)
    })
}

const editReview = (req, res) => {
    console.log(req.query);
    Review.update(req.body, {
        where: {id: req.params.reviewId},
        returning: true
    })
    .then(updatedReview => {
        console.log(updatedReview[1][0].recipeId)
        res.redirect(`/${updatedReview[1][0].recipeId}`)
    })
}

module.exports = {
    postReview,
    deleteReview,
    editReview
}