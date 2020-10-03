'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Reviews', [{
        rating: 5,
        review: 'Fantastic recipe',
        userId: 1,
        recipeId: 2
      },
      {
        rating: 2,
        review: 'This could be better',
        userId: 2,
        recipeId: 1
      }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
