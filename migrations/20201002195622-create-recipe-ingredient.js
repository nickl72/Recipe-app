'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('RecipeIngredients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      recipeId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ingredientId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      units: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      }
    }
    // ,
    // {
    //   uniqueKeys: {
    //     actions_unique: {
    //       fields: ['recipeId', 'ingredientId']
    //     }
    //   }
    // }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('RecipeIngredients');
  }
};