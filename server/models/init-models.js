var DataTypes = require('sequelize').DataTypes;
var _dietaryType = require('./dietaryType');
var _hasDietaryType = require('./hasDietaryType');
var _hasSaved = require('./hasSaved');
var _ingredient = require('./ingredient');
var _madeUpOf = require('./madeUpOf');
var _measurement = require('./measurement');
var _recipe = require('./recipe');
var _sessions = require('./sessions');
var _user = require('./user');

function initModels(sequelize) {
  var dietaryType = _dietaryType(sequelize, DataTypes);
  var hasDietaryType = _hasDietaryType(sequelize, DataTypes);
  var hasSaved = _hasSaved(sequelize, DataTypes);
  var ingredient = _ingredient(sequelize, DataTypes);
  var madeUpOf = _madeUpOf(sequelize, DataTypes);
  var measurement = _measurement(sequelize, DataTypes);
  var recipe = _recipe(sequelize, DataTypes);
  var sessions = _sessions(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  hasDietaryType.belongsTo(recipe, {
    foreignKey: 'recipe_id',
    onDelete: 'CASCADE',
    hooks: true,
  });
  dietaryType.belongsToMany(recipe, {
    through: hasDietaryType,
    foreignKey: 'dietary_type_id',
    otherKey: 'recipe_id',
    onDelete: 'CASCADE',
    hooks: true,
  });
  recipe.hasMany(hasDietaryType, {
    foreignKey: 'recipe_id',
    onDelete: 'CASCADE',
    hooks: true,
  });
  hasDietaryType.belongsTo(dietaryType, {
    foreignKey: 'dietary_type_id',
    onDelete: 'CASCADE',
    hooks: true,
  });
  recipe.belongsToMany(dietaryType, {
    through: hasDietaryType,
    foreignKey: 'recipe_id',
    otherKey: 'dietary_type_id',
    onDelete: 'CASCADE',
    hooks: true,
  });
  dietaryType.hasMany(hasDietaryType, {
    foreignKey: 'dietary_type_id',
    onDelete: 'CASCADE',
    hooks: true,
  });
  hasSaved.belongsTo(recipe, { foreignKey: 'recipe_id' });
  user.belongsToMany(recipe, {
    through: hasSaved,
    foreignKey: 'user_id',
    otherKey: 'recipe_id',
  });
  recipe.hasMany(hasSaved, {
    foreignKey: 'recipe_id',
    onDelete: 'CASCADE',
    hooks: true,
  });
  hasSaved.belongsTo(user, { foreignKey: 'user_id' });
  recipe.belongsToMany(user, {
    through: hasSaved,
    foreignKey: 'recipe_id',
    otherKey: 'user_id',
  });
  user.hasMany(hasSaved, { foreignKey: 'user_id' });
  ingredient.belongsTo(measurement, {
    foreignKey: 'measurement_id',
    onDelete: 'CASCADE',
    hooks: true,
  });
  measurement.hasMany(ingredient, {
    foreignKey: 'measurement_id',
    onDelete: 'CASCADE',
    hooks: true,
  });
  madeUpOf.belongsTo(ingredient, {
    foreignKey: 'ingredient_id',
    onDelete: 'CASCADE',
    hooks: true,
  });
  recipe.belongsToMany(ingredient, {
    through: madeUpOf,
    foreignKey: 'recipe_id',
    otherKey: 'ingredient_id',
    onDelete: 'CASCADE',
    hooks: true,
  });
  ingredient.hasMany(madeUpOf, {
    foreignKey: 'ingredient_id',
    onDelete: 'CASCADE',
    hooks: true,
  });
  madeUpOf.belongsTo(recipe, {
    foreignKey: 'recipe_id',
    onDelete: 'CASCADE',
    hooks: true,
  });
  ingredient.belongsToMany(recipe, {
    through: madeUpOf,
    foreignKey: 'ingredient_id',
    otherKey: 'recipe_id',
  });
  recipe.hasMany(madeUpOf, {
    foreignKey: 'recipe_id',
    onDelete: 'CASCADE',
    hooks: true,
  });
  recipe.belongsTo(user, { as: 'author_fk', foreignKey: 'author' });
  user.hasMany(recipe, { as: 'author_fk', foreignKey: 'author' });

  return {
    dietaryType,
    hasDietaryType,
    hasSaved,
    ingredient,
    madeUpOf,
    measurement,
    recipe,
    sessions,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
