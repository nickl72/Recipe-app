const express = require('express');
const Recipe = require('../models').Recipe;

const renderViewPage = (req, res) => {
    Recipe.findAll()
    .then(recipe => {
        res.render('index.ejs', {
            recipes: recipe
        })
    })
};

module.exports = {
    renderViewPage
};
