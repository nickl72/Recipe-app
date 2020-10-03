'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Directions', [{
      step: 'Crumble flour and brown sugar in baking dish',
      step_number: 1,
      recipeId: 1
    },
    {
      step: 'Slice apples and place in baking dish',
      step_number: 2,
      recipeId: 1
    },
    {
      step: 'Bake at 350 degrees for 30 minutes',
      step_number: 3,
      recipeId: 1
    },
    {
      step: 'Beat eggs, cinnamon and milk together in shallow bowl',
      step_number: 1,
      recipeId: 2
    },
    {
      step: 'Dip bread in batter and place in pan',
      step_number: 2,
      recipeId: 2
    },
    {
      step: 'Cook on medium high heat until golden brown',
      step_number: 3,
      recipeId: 2
    }],{})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Directions', null, {});
  }
};
