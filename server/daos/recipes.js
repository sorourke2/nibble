const db = require('../database').db;
const ingredientService = require('../services/ingredients');
const { initModels } = require('../models/init-models');
const changeForeignKeyName = require('../utils/foreignKey');
const models = initModels(db.sequelize);

const findAllRecipes = () =>
  models.recipe
    .findAll({
      include: [
        { model: models.user, as: 'author_fk' },
        { model: models.dietaryType },
        {
          model: models.ingredient,
          attributes: ['id', 'name'],
          through: { attributes: [] },
          include: [models.measurement],
        },
      ],
    })
    .then((recipes) => {
      const safeRecipes = recipes.map((recipe) => {
        const safeRecipe = changeForeignKeyName(recipe, 'author_fk', 'author');
        delete safeRecipe.author.password;
        return safeRecipe;
      });
      return safeRecipes;
    });

const findRecipeById = (rid) =>
  models.recipe
    .findByPk(rid, {
      include: [
        {
          model: models.ingredient,
          attributes: ['id', 'name'],
          include: [{ model: models.measurement }],
          through: { attributes: [] },
        },
        { model: models.user, as: 'author_fk' },
        models.dietaryType,
      ],
      required: true,
    })
    .then((recipe) => {
      const safeRecipe = changeForeignKeyName(recipe, 'author_fk', 'author');
      delete safeRecipe.author.password;
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

const createRecipe = (newRecipe) => {
  // Must create the tables for the new recipe stuff assuming that is expect
  // from this route. Should this all be promised??
  for (const ing of newRecipe.ingredients) {
    ingredientService.createIngredient(ing);
  }
  // Trying to make this work lol
  for (const dietary_type of newRecipe.dietary_types) {
    models.dietaryType.create(dietary_type, {
      include: [models.hasDietaryType],
    });
  }
  return models.recipe
    .create(newRecipe, {
      include: [
        { model: models.ingredient, include: [models.measurement] },
        models.user,
        models.dietaryType,
      ],
      required: true,
    })
    .catch(function (err) {
      console.log(err);
    });
};

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
