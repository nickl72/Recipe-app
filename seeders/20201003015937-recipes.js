'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Recipes', [{
      title: 'Apple Crisp',
      image: 'https://i.imgur.com/jCmIAib.jpeg',
      description: 'crispy apple desert',
      userId: 1
    },
  {
    title: 'French Toast',
    image: 'https://i.imgur.com/3zhVILX.jpg',
    description: 'Fluffy breakfast bread',
    userId: 2
  }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Recipes', null, {});
  }
};
