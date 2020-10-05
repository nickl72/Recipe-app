'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Recipe, {foreignKey: 'userId', as: 'CreatedRecipes'}); // created recipes
      User.belongsToMany(models.Recipe, {
        as: 'savedRecipes',
        through: 'SavedRecipes',
        foreignKey: 'userId',
        otherKey: 'recipeId'
      });
      User.hasMany(models.Review, {foreignKey: 'userId'}); 
      User.belongsToMany(models.Ingredient, {
        through: 'UserIngredient',
        foreignKey: 'userId',
        otherKey: 'ingredientId'
      });
      User.belongsToMany(models.User, {
          as: "friends",
          through: 'UserFriends',
          foreignKey: 'userId',
          otherKey: 'friendId'
      })
      // User.hasMany(models.User, {
      //   through: 'UserFriends',
      //   foreignKey: 'userId',
      //   otherKey: 'friendId'
      // })
      // User.belongsTo(models.User, {
      //   through: 'UserFriends',
      //   foreignKey: 'friendId',
      //   otherKey: 'userId'
      // })
      // define association here
    }
  };
  User.init({
    name: DataTypes.STRING,
    hashedpass: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};