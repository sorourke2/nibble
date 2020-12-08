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
  const iid = newIngredient.id;
  // Must update ingredient
  if (iid) {
    console.log('update ing');
    const mid = newIngredient.measurement.id;
    // Must update measurement
    if (mid) {
      return models.measurement
        .update(newIngredient.measurement, { where: { id: mid } })
        .then((_) => {
          models.ingredient.update(newIngredient, {
            where: { id: iid },
          });
        });
    }
    // Must create measurement
    return models.measurement.create(newIngredient.measurement).then((_) => {
      models.ingredient.update(newIngredient, {
        where: { id: iid },
        include: [models.measurement],
      });
    });
  }
  // Must create ingredient, this doesn't work
  return models.measurement.create(newIngredient.measurement).then((_) => {
    console.log(_);
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
