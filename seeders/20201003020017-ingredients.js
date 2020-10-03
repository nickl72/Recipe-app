'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Ingredients', [{
      name: 'syrup'
    },
  {
    name: 'apple'
  },
  {
    name: 'flour'
  },
{
  name: 'brown sugar'
},
{
  name: 'bread'
},
{
  name: 'eggs'
},
{
  name: 'cinnamon'
},
{
  name: 'milk'
}],{})

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Ingredients', null, {});
  }
};
