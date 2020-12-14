const db = require('../database').db;
const { initModels } = require('../models/init-models');
const measurement = require('../models/measurement');
const models = initModels(db.sequelize);

const findAllIngredients = () => models.ingredient.findAll();

const findIngredientById = (iid) =>
  models.ingredient.findByPk(iid, {
    include: [models.recipe],
    required: true,
  });

const createIngredient = (newIngredient) => {
  const measurement = newIngredient.measurement;

  return models.measurement
    .findOrCreate({
      where: { unit: measurement.unit, amount: measurement.amount },
    })
    .then((mes) => {
      return models.ingredient.findOrCreate({
        include: [
          {
            model: models.measurement,
            where: { unit: measurement.unit, amount: measurement.amount },
          },
        ],
        where: {
          name: newIngredient.name,
        },
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
