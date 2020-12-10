const db = require('../database').db;
const ingredientService = require('../services/ingredients');
const { initModels } = require('../models/init-models');
const changeForeignKeyName = require('../utils/foreignKey');
const models = initModels(db.sequelize);

const basicRecipeInclude = [
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
];

const findAllRecipes = (filter) => {
  return models.recipe
    .findAll({
      include: basicRecipeInclude,
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
        let include = true;
        filter.name
          ? (include &= recipe.name.toUpperCase == filter.name.toUpperCase)
          : include;
        filter.difficulty
          ? (include &=
              recipe.difficulty.toUpperCase == filter.difficulty.toUpperCase)
          : include;
        filter.cooking_method
          ? (include &=
              recipe.cooking_method.toUpperCase ==
              filter.cooking_method.toUpperCase)
          : include;
        filter.serving_size
          ? (include &=
              recipe.serving_size.toUpperCase ==
              filter.serving_size.toUpperCase)
          : include;
        filter.cuisine
          ? (include &=
              recipe.cuisine.toUpperCase == filter.cuisine.toUpperCase)
          : include;
        filter.minutes_to_make
          ? (include &=
              recipe.minutes_to_make.toUpperCase ==
              filter.minutes_to_make.toUpperCase)
          : include;
        filter.image_source
          ? (include &=
              recipe.image_source.toUpperCase ==
              filter.image_source.toUpperCase)
          : include;
        filter?.author_fk?.username
          ? (include &=
              recipe?.author_fk?.username?.toUpperCase ==
              filter?.author_fk?.username?.toUpperCase)
          : include;

        // filter for ingredients, This is an or map so if it includes all
        // given ingredients it will include this recipe
        if (filter.ingredients) {
          if (recipe.ingredients[0]) {
            outer_found = true;
          } else {
            outer_found = false;
          }
          for (filter_ingredient of filter.ingredients) {
            inner_found = false;
            for (recipe_ingredient of recipe.ingredients) {
              inner_found |=
                recipe_ingredient.name.toUpperCase ==
                  filter_ingredient.name.toUpperCase &&
                recipe_ingredient.measurement.unit.toUpperCase ==
                  filter_ingredient?.measurement?.unit?.toUpperCase &&
                recipe_ingredient?.measurement?.amount?.toUpperCase ==
                  filter_ingredient?.measurement?.amount?.toUpperCase;
            }
            outer_found &= inner_found;
          }
          include &= outer_found;
        }

        // filter for dietary types, This is an or map so if it includes all
        // given diets it will include this recipe.
        if (filter.dietary_types) {
          if (recipe.dietary_types[0]) {
            outer_found = true;
          } else {
            outer_found = false;
          }
          for (filter_ingredient of filter.dietary_types) {
            inner_found = false;
            for (recipe_ingredient of recipe.dietary_types) {
              inner_found &=
                recipe_ingredient.name.toUpperCase ==
                filter_ingredient.name.toUpperCase;
            }
            outer_found |= inner_found;
          }
          include &= outer_found;
        }
        if (include) {
          return safeRecipe;
        }
      });
      // delete recipes that are not included
      return safeRecipes.filter(function (el) {
        return el != null;
      });
    });
};

const findRecipeById = (rid) =>
  models.recipe
    .findByPk(rid, {
      include: basicRecipeInclude,
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

const findUsersWhoHaveSaved = (rid) => {
  return models.hasSaved
    .findAll({ where: { recipe_id: rid } })
    .then((hasSaveds) => {
      return models.user
        .findAll({
          where: { id: hasSaveds.map((h) => h.user_id) },
        })
        .then((user) => {
          var safeUser = user;
          delete safeUser.password;
          return safeUser;
        });
    });
};

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

const updateRecipe = (rid, newRecipe) =>
  // Spent far too long figuring out how to update the recipe
  // and all of its relations while also being able to add in new relations
  // if needed. That was fucking hard, so here we just delete it and create it
  // (:
  deleteRecipe(rid).then((status) => {
    newRecipe.id = rid;
    return createRecipe(newRecipe);
  });

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
  findUsersWhoHaveSaved,
};
