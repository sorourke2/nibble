const db = require("../database").db;
const { initModels } = require("../models/init-models");
const models = initModels(db.sequelize);

const findAllIngredients = () => models.ingredient.findAll();

const findIngredientById = (iid) =>
  models.ingredient.findByPk(iid, {
    include: [models.recipe],
    required: true,
  });

const createIngredient = (newIngredint) =>
  models.ingredient.create(newIngredint);

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
