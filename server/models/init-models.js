var DataTypes = require('sequelize').DataTypes;
var _dietaryType = require('./dietaryType');
var _hasDietaryType = require('./hasDietaryType');
var _ingredient = require('./ingredient');
var _madeUpOf = require('./madeUpOf');
var _measurement = require('./measurement');
var _recipe = require('./recipe');
var _user = require('./user');

function initModels(sequelize) {
  var dietaryType = _dietaryType(sequelize, DataTypes);
  var hasDietaryType = _hasDietaryType(sequelize, DataTypes);
  var ingredient = _ingredient(sequelize, DataTypes);
  var madeUpOf = _madeUpOf(sequelize, DataTypes);
  var measurement = _measurement(sequelize, DataTypes);
  var recipe = _recipe(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  hasDietaryType.belongsTo(recipe, { foreignKey: 'recipe_id' });
  dietaryType.belongsToMany(recipe, {
    through: hasDietaryType,
    foreignKey: 'dietary_type_id',
    otherKey: 'recipe_id',
  });
  recipe.hasMany(hasDietaryType, { foreignKey: 'recipe_id' });
  hasDietaryType.belongsTo(dietaryType, { foreignKey: 'dietary_type_id' });
  recipe.belongsToMany(dietaryType, {
    through: hasDietaryType,
    foreignKey: 'recipe_id',
    otherKey: 'dietary_type_id',
  });
  dietaryType.hasMany(hasDietaryType, { foreignKey: 'dietary_type_id' });
  ingredient.belongsTo(measurement, { foreignKey: 'measurement_id' });
  measurement.hasMany(ingredient, { foreignKey: 'measurement_id' });
  madeUpOf.belongsTo(ingredient, { foreignKey: 'ingredient_id' });
  recipe.belongsToMany(ingredient, {
    through: madeUpOf,
    foreignKey: 'recipe_id',
    otherKey: 'ingredient_id',
  });
  ingredient.hasMany(madeUpOf, { foreignKey: 'ingredient_id' });
  madeUpOf.belongsTo(recipe, { foreignKey: 'recipe_id' });
  ingredient.belongsToMany(recipe, {
    through: madeUpOf,
    foreignKey: 'ingredient_id',
    otherKey: 'recipe_id',
  });
  recipe.hasMany(madeUpOf, { foreignKey: 'recipe_id' });
  recipe.belongsTo(user, { foreignKey: 'author' });
  user.hasMany(recipe, { foreignKey: 'author' });
  user.belongsTo(recipe, { foreignKey: 'created_recipes' });
  recipe.hasMany(user, { foreignKey: 'created_recipes' });
  user.belongsTo(recipe, { foreignKey: 'saved_recipes' });
  recipe.hasMany(user, { foreignKey: 'saved_recipes' });

  return {
    dietaryType,
    hasDietaryType,
    ingredient,
    madeUpOf,
    measurement,
    recipe,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
