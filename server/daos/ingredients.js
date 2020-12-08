const db = require('../database').db;
const { initModels } = require('../models/init-models');
const models = initModels(db.sequelize);

const findAllIngredients = () => models.ingredient.findAll();

const findIngredientById = (iid) =>
  models.ingredient.findByPk(iid, {
    include: [models.recipe],
    required: true,
  });

const createIngredient = (newIngredient) => {
  // Create measurement for recipe
  return models.measurement
    .create(newIngredient.measurement)
    .then((measurement) => {
      models.ingredient.create(newIngredient, {
        include: [models.measurement],
      });
    });
};

const findRecipesForIngredient = (iid) =>
  findIngredientById(iid).then((ingredient) => ingredient.recipes);

const updateIngredient = (iid, newIngredient) =>
  models.Ingredient.update(newIngredient, {
    where: {
      id: iid,
    },
  });

module.exports = {
  findAllIngredients,
  findIngredientById,
  createIngredient,
  updateIngredient,
  findRecipesForIngredient,
};
