const db = require('../database').db;
const { initModels } = require('../models/init-models');
const models = initModels(db.sequelize);

const findAllRecipes = () =>
  models.recipe
    .findAll({ include: [{ model: models.user, as: 'author_fk' }] })
    .then((recipes) => {
      const safeRecipes = recipes.map((recipe) => {
        const safeRecipe = recipe.toJSON();
        delete safeRecipe.author_fk.password;
        safeRecipe.author = safeRecipe.author_fk;
        delete safeRecipe.author_fk;
        return safeRecipe;
      });
      return safeRecipes;
    });

const findRecipeById = (rid) =>
  models.recipe
    .findByPk(rid, {
      include: [
        models.ingredient,
        { model: models.user, as: 'author_fk' },
        models.dietaryType,
      ],
      required: true,
    })
    .then((recipe) => {
      const safeRecipe = recipe.toJSON();
      delete safeRecipe.author_fk.password;
      safeRecipe.author = safeRecipe.author_fk;
      delete safeRecipe.author_fk;
      return safeRecipe;
    });

const findIngredientsForRecipe = (rid) =>
  findRecipeById(rid, { include: [{ model: models.ingredient }] }).then(
    (recipe) => recipe.ingredients
  );

const findDietaryTypesForRecipe = (rid) =>
  findRecipeById(rid, { include: [{ model: models.dietaryType }] }).then(
    (recipe) => recipe.dietaryTypes
  );

const createRecipe = (newRecipe) =>
  models.recipe
    .create(newRecipe, {
      include: [models.ingredient, models.user, models.dietaryType],
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

const truncateRecipe = () =>
  models.recipe.destroy({ truncate: { cascade: true } });

module.exports = {
  findAllRecipes,
  findRecipeById,
  findDietaryTypesForRecipe,
  findIngredientsForRecipe,
  createRecipe,
  updateRecipe,
  truncateRecipe,
};
