'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ingredient.belongsToMany(models.Recipe, {
        through: 'RecipeIngredient',
        foreignKey: 'ingredientId',
        otherKey: 'recipeId'
      });
      Ingredient.belongsToMany(models.User, {
        through: 'UserIngredient',
        foreignKey: 'ingredientId',
        otherKey: 'userId'
      });
      // define association here
    }
  };
  Ingredient.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ingredient',
  });
  return Ingredient;
};