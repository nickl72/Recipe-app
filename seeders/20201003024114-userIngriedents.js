'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('UserIngredients', [{
      userId: 1,
      ingredientId: 3
    },
  {
    userId: 1,
    ingredientId: 5
  }],{})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserIngrdients', null, {});
  }
};
