var DataTypes = require('sequelize').DataTypes;
var _dietaryType = require('./dietaryType');
var _hasCreated = require('./hasCreated');
var _hasDietaryType = require('./hasDietaryType');
var _hasSaved = require('./hasSaved');
var _ingredient = require('./ingredient');
var _madeUpOf = require('./madeUpOf');
var _measurement = require('./measurement');
var _recipe = require('./recipe');
var _registeredUser = require('./registeredUser');
var _unregisteredUser = require('./unregisteredUser');

function initModels(sequelize) {
  var dietaryType = _dietaryType(sequelize, DataTypes);
  var hasCreated = _hasCreated(sequelize, DataTypes);
  var hasDietaryType = _hasDietaryType(sequelize, DataTypes);
  var hasSaved = _hasSaved(sequelize, DataTypes);
  var ingredient = _ingredient(sequelize, DataTypes);
  var madeUpOf = _madeUpOf(sequelize, DataTypes);
  var measurement = _measurement(sequelize, DataTypes);
  var recipe = _recipe(sequelize, DataTypes);
  var registeredUser = _registeredUser(sequelize, DataTypes);
  var unregisteredUser = _unregisteredUser(sequelize, DataTypes);

  hasCreated.belongsTo(recipe, { foreignKey: 'recipes' });
  registeredUser.belongsToMany(recipe, {
    through: hasCreated,
    foreignKey: 'registered_users',
    otherKey: 'recipes',
  });
  recipe.hasMany(hasCreated, { foreignKey: 'recipes' });
  hasCreated.belongsTo(registeredUser, { foreignKey: 'registered_users' });
  recipe.belongsToMany(registeredUser, {
    through: hasCreated,
    foreignKey: 'recipes',
    otherKey: 'registered_users',
  });
  registeredUser.hasMany(hasCreated, { foreignKey: 'registered_users' });
  hasDietaryType.belongsTo(recipe, { foreignKey: 'recipe', as: 'recipe_id' });
  dietaryType.belongsToMany(recipe, {
    through: hasDietaryType,
    foreignKey: 'dietary_type',
    otherKey: 'recipe',
  });
  recipe.hasMany(hasDietaryType, { foreignKey: 'recipe', as: 'recipe_id2' });
  hasDietaryType.belongsTo(dietaryType, { foreignKey: 'dietary_type' });
  recipe.belongsToMany(dietaryType, {
    through: hasDietaryType,
    foreignKey: 'recipe',
    otherKey: 'dietary_type',
  });
  dietaryType.hasMany(hasDietaryType, { foreignKey: 'dietary_type' });
  hasSaved.belongsTo(recipe, { foreignKey: 'recipe', as: 'recipe_id' });
  registeredUser.belongsToMany(recipe, {
    through: hasSaved,
    foreignKey: 'user',
    otherKey: 'recipe',
  });
  recipe.hasMany(hasSaved, { foreignKey: 'recipe', as: 'recipe_id' });
  hasSaved.belongsTo(registeredUser, { foreignKey: 'user' });
  recipe.belongsToMany(registeredUser, {
    through: hasSaved,
    foreignKey: 'recipe',
    otherKey: 'user',
  });
  registeredUser.hasMany(hasSaved, { foreignKey: 'user' });
  madeUpOf.belongsTo(ingredient, {
    foreignKey: 'ingredient',
    as: 'ingredient_id',
  });
  recipe.belongsToMany(ingredient, {
    through: madeUpOf,
    foreignKey: 'recipe',
    otherKey: 'ingredient',
  });
  ingredient.hasMany(madeUpOf, {
    foreignKey: 'ingredient',
    as: 'ingredient_id',
  });
  madeUpOf.belongsTo(recipe, { foreignKey: 'recipe', as: 'recipe_id2' });
  ingredient.belongsToMany(recipe, {
    through: madeUpOf,
    foreignKey: 'ingredient',
    otherKey: 'recipe',
  });
  recipe.hasMany(madeUpOf, { foreignKey: 'recipe', as: 'recipe_id3' });

  return {
    dietaryType,
    hasCreated,
    hasDietaryType,
    hasSaved,
    ingredient,
    madeUpOf,
    measurement,
    recipe,
    registeredUser,
    unregisteredUser,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
