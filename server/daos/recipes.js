// const { models } = require('../models/init-models');
const db = require('../database').db;
var DataTypes = db.Sequelize.DataTypes;
var Recipe = require('../models/recipe')(db.sequelize, DataTypes);
var Ingredient = require('../models/ingredient')(db.sequelize, DataTypes);
// initModels(sequelize);
const findAllRecipes = () => Recipe.findAll();

const findRecipeById = (rid) => Recipe.findByPk(rid);

const findIngredientsForRecipe = (rid) =>
  Recipe.findByPk(rid, { include: [{ model: Ingredient }] });

const createRecipe = (newRecipe) => Recipe.create(newRecipe);

const updateRecipe = (rid, newRecipe) =>
  Recipe.update(newRecipe, {
    where: {
      id: rid,
    },
  });

module.exports = {
  findAllRecipes,
  findRecipeById,
  findIngredientsForRecipe,
  createRecipe,
  updateRecipe,
};
