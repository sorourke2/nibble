const db = require('../database').db;
const ingredientService = require('../services/ingredients');
const { initModels } = require('../models/init-models');
const changeForeignKeyName = require('../utils/foreignKey');
const { create, find } = require('lodash');
const ingredient = require('../models/ingredient');
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
      var safeRecipe = recipe.toJSON();
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
        models.dietaryType
          .findOrCreate({
            where: { name: dietary_type.name },
          })
          .then((diet) => {
            models.hasDietaryType.create({
              recipe_id: recipe.id,
              dietary_type_id: diet[0].id,
            });
          });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
};

// const updateRecipe = (rid, newRecipe) => {
//   return deleteRecipe(rid).then((_) => {
//     newRecipe.id = rid;
//     createRecipe(newRecipe);
//   });
// };

const updateRecipe = (rid, newRecipe) =>
  deleteRecipe(rid).then((status) => {
    newRecipe.id = rid;
    return createRecipe(newRecipe);
  });
// return models.recipe
//   .findOne({
//     where: { id: rid },
//     include: [
//       { model: models.ingredient, include: [models.measurement] },
//       models.user,
//       models.dietaryType,
//     ],
//     required: true,
//   })
//   .then((recipe) => {
//     if (recipe) {
//       return recipe.update(newRecipe).then((success) => {

//         //   for (let diet of recipe.dietaryTypes) {
//         //     diet.destroy();
//         //   }
//         //   for (let dietary_type of newRecipe.dietary_types) {
//         //     models.dietaryType.create(dietary_type);
//         //   }
//         //   for (let ing of recipe.ingredients) {
//         //     ing.destroy();
//         //     ing.measurement.destroy();
//         //   }
//         //   models.dietaryType.bulkCreate(dietary_types).then((_) => {
//         //     for (let ingredient of newRecipe.ingredients) {
//         //       console.log('create iing');
//         //       models.measurement.create(ingredient.measurement).then((mes) => {
//         //         models.ingredient.create(ingredient);
//         //       });
//         //     }
//         //   });
//         // });
//       });
//     }
//   });

const deleteRecipe = (rid) => {
  // Will the check for admin occur here or client side?
  // May be easier client side if you have the user in the state
  // foreign keys use ondelete cascade so this should work
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
