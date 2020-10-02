'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe - to - Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Recipe - to - Ingredient.init({
    quantity: DataTypes.INTEGER,
    units: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Recipe-to-Ingredient',
  });
  return Recipe - to - Ingredient;
};