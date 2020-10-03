'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('RecipeIngredients', [{
      recipeId: 1,
      ingredientId: 2,
      quantity: 1,
      units: 'fruit'
    },{
      recipeId: 1,
      ingredientId: 3,
      quantity: 2,
      units: 'cup'
    },
    {
      recipeId: 1,
      ingredientId: 4,
      quantity: 3,
      units: 'cup'
    },
    {
      recipeId: 2,
      ingredientId: 1,
      quantity: 1,
      units: 'Tbsp'
    },
    {
      recipeId: 2,
      ingredientId: 5,
      quantity: 8,
      units: 'slice'
    },
    {
      recipeId: 2,
      ingredientId: 6,
      quantity: 1,
      units: 'egg'
    },
    {
      recipeId: 2,
      ingredientId: 7,
      quantity: 2,
      units: 'tsp'
    },
    {
      recipeId: 2,
      ingredientId: 8,
      quantity: 1,
      units: 'pint'
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('RecipeIngredients', null, {});
  }
};
