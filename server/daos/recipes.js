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
        {
          model: models.dietaryType,
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
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
        let safeRecipe = recipe.toJSON();
        safeRecipe = changeForeignKeyName(safeRecipe, 'author_fk', 'author');
        safeRecipe = changeForeignKeyName(
          safeRecipe,
          'dietaryTypes',
          'dietary_types'
        );
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
        {
          model: models.dietaryType,
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
      ],
      required: true,
    })
    .then((recipe) => {
      if (recipe == null) {
        return {};
      }
      safeRecipe = changeForeignKeyName(safeRecipe, 'author_fk', 'author');
      safeRecipe = changeForeignKeyName(
        safeRecipe,
        'dietaryTypes',
        'dietary_types'
      );
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
  for (const ing of newRecipe.ingredients) {
    ingredientService.createIngredient(ing);
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
    .then((recipe) => {
      for (const dietary_type of newRecipe.dietary_types) {
        models.dietaryType.findOrCreate(dietary_type).then((diet) => {
          models.hasDietaryType.findOrCreate({
            recipe_id: recipe.id,
            dietary_type_id: diet.id,
          });
        });
      }
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

const deleteRecipe = (rid) => {
  return models.recipe.destroy({
    where: { id: rid },
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
  deleteRecipe,
};
