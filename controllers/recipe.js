const express = require('express');
const Recipe = require('../models').Recipe;
const User = require('../models').User;
const Ingredient = require('../models').Ingredient

const renderViewPage = (req, res) => {
    Recipe.findAll()
    .then(recipe => {
        // console.log(recipe)
        res.render('index.ejs', {
            recipes: recipe
        })
        // console.log(recipe)

    })
};

const renderRecipe = (req, res) => {
    Recipe.findByPk(req.params.index)
    .then(foundRecipe => {
        console.log(foundRecipe.id)
        Ingredient.findAll(
            {
                where: {
                    recipeId: foundRecipe.id
                }
            })
        .then(founIngredients => {
            console.log(founIngredients);
            res.render('recipe.ejs', {
                recipe: foundRecipe,
                ingredient: founIngredients
            })
        })

    })
}

module.exports = {
    renderViewPage,
    renderRecipe
};
