'use strict';
const {
  Model
} = require('sequelize');
const ingredient = require('./ingredient');
module.exports = (sequelize, DataTypes) => {
  class RecipeIngredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RecipeIngredient.belongsTo(models.Ingredient, {foreignKey: 'ingredientId'})
      // define association here
    }
  };
  RecipeIngredient.init({
    quantity: DataTypes.INTEGER,
    units: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RecipeIngredient',
  });
  return RecipeIngredient;
};