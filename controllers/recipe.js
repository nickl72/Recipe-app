const express = require('express');
const RecipeIngredient = require('../models').RecipeIngredient;
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
    Recipe.findByPk(req.params.index, {
        include: [
            {
                model: Ingredient,
                attributes: ['name'],
                order: ['name'],
                include: {
                    model: RecipeIngredient
                    // attributes: ['units']
            }}
            // },
            // {
            //     model: recipeingredient,
            //     attributes: ['quantity', 'units']
            // }
        ]
    })
    .then(foundRecipe => {
        console.log(foundRecipe.Ingredients[1].RecipeIngredient.units)
        // Ingredient.findAll(
        //     {
        //         where: {
        //             recipeId: foundRecipe.id
        //         }
        //     })
        // .then(founIdngredients => {
        //     console.log(foundngredients);
            res.render('recipe.ejs', {
                recipe: foundRecipe,
                // ingredient: foundIngredients
            })
        // })

    })
}

module.exports = {
    renderViewPage,
    renderRecipe
};
