'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Direction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Direction.init({
    step: DataTypes.STRING,
    step_number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Direction',
  });
  return Direction;
};