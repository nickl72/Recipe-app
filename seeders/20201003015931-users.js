'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      name: 'Nick',
      hashedpass: '$2a$10$GbNktppXBRd5jUKjRZvs5eCMzGdUQGJ.yZyKurKLsT7nYnnayIgFe', // pass = 12345
      username: 'nlapointe',
      email: 'nick@email.com'
    },
  {
    name: 'David',
    hashedpass: '$2a$10$IJFjSvwtUadGb5xhe0eEcuddUd5WkqT7PbQ3YumMq.fTnmrTcZjfi', // pass=12345
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
