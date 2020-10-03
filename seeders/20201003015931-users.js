'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      name: 'Nick',
      hashedpass: '123456',
      username: 'nlapointe',
      email: 'nick@email.com'
    },
  {
    name: 'David',
    hashedpass: '654321',
    username: 'dwilliams',
    email: 'david@email.com'
  }],{})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
