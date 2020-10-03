'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('SavedRecipes', [{
      userId: 1,
      recipeId: 2
    }],{});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SavedRecipes', null, {});
  }
};
