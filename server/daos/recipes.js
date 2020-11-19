const db = require('../database').db;
const { initModels } = require('../models/init-models');
const models = initModels(db.sequelize);
const findAllRecipes = () => models.recipe.findAll();
const findRecipeById = (rid) =>
  models.recipe.findByPk(rid, {
    include: [models.ingredient, models.dietaryType, models.registeredUser],
    required: true,
  });

const findIngredientsForRecipe = (rid) =>
  findRecipeById(rid).then((recipe) => recipe.ingredients);

const findDietaryTypesForRecipe = (rid) =>
  findRecipeById(rid).then((recipe) => recipe.dietaryTypes);

const createRecipe = (newRecipe) =>
  models.recipe
    .create(newRecipe, {
      include: [models.ingredient, models.registeredUser, models.dietaryType],
      required: true,
    })
    .catch(function (err) {
      console.log(err);
    });

const updateRecipe = (rid, newRecipe) => {
  //must update ingredients, registeredUser, and dietaryType seperately
  for (const ing of newRecipe.ingredients) {
    models.ingredient.update(ing, { where: { id: ing.id } });
  }
  for (const diet of newRecipe.dietaryTypes) {
    models.dietaryType.update(diet, { where: { id: diet.id } });
  }
  models.recipe.update(newRecipe, {
    where: {
      id: rid,
    },
  });
};

module.exports = {
  findAllRecipes,
  findRecipeById,
  findDietaryTypesForRecipe,
  findIngredientsForRecipe,
  createRecipe,
  updateRecipe,
};
