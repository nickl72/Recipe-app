const express = require('express');
const RecipeIngredient = require('../models').RecipeIngredient;
const Recipe = require('../models').Recipe;
const User = require('../models').User;
const Ingredient = require('../models').Ingredient;
const Direction = require('../models').Direction;
const Review = require('../models').Review;

const renderViewPage = (req, res) => {
    Recipe.findAll()
    .then(recipe => {
        res.render('index.ejs', {
            recipes: recipe,
            // user: 
        })
        // console.log(recipe)

    })
};

const renderRecipe = (req, res) => {
    Recipe.findByPk(req.params.index, {
        include: [
            {
                model: Ingredient,
                attributes: ['name'],
                order: ['name'],
                include: {
                    model: RecipeIngredient
                    // attributes: ['units']
            }},
            {
                model: Direction
            },
            {
                model: Review,
                include: [
                    {
                        model: User,
                        attributes: ['username', 'name']                       
                    }
                ]
            }
        ]
    })
    .then(foundRecipe => {    
        console.log('\n\n\n',req.user,'\n\n\n')

        // console.log(foundRecipe)
            res.render('recipe.ejs', {
                recipe: foundRecipe,
                reviews: foundRecipe.Reviews, // this variable improves readability of ejs file
                user: req.user
            })
    })
}

const deleteRecipe = (req, res) => {
    RecipeIngredient.destroy({
        where: {recipeId: req.params.index}
    })
    .then(() => {
        Direction.destroy({
            where: {recipeId: req.params.index}
        })
        .then(() => {
            Recipe.destroy({
                where: {id: req.params.index}
            })
            .then(() => {
                res.redirect('/profile')
            })
        })
    })
}

module.exports = {
    renderViewPage,
    renderRecipe,
    deleteRecipe
};
