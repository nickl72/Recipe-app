'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('UserFriends', [{
      userId: 1,
      friendId: 2
    }],{})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('userFriends', null, {});
  }
};
