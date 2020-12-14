const db = require("../database").db;
const ingredientService = require("../services/ingredients");
const { initModels } = require("../models/init-models");
const changeForeignKeyName = require("../utils/foreignKey");
const models = initModels(db.sequelize);
const { Op } = require("sequelize");

const basicRecipeInclude = [
  { model: models.user, as: "author_fk" },
  {
    model: models.dietaryType,
    attributes: ["id", "name"],
    through: { attributes: [] },
  },
  {
    model: models.ingredient,
    attributes: ["id", "name"],
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
        safeRecipe = changeForeignKeyName(safeRecipe, "author_fk", "author");
        safeRecipe = changeForeignKeyName(
          safeRecipe,
          "dietaryTypes",
          "dietary_types"
        );
        delete safeRecipe.author.password;
        let include = true;
        filter.name ? (include &= recipe?.name == filter?.name) : include;
        filter.difficulty
          ? (include &= recipe?.difficulty == filter?.difficulty)
          : include;
        filter.cooking_method
          ? (include &= recipe?.cooking_method == filter?.cooking_method)
          : include;
        filter.serving_size
          ? (include &= recipe?.serving_size == filter?.serving_size)
          : include;
        filter.cuisine
          ? (include &= recipe?.cuisine == filter?.cuisine)
          : include;
        filter.minutes_to_make
          ? (include &= recipe?.minutes_to_make == filter?.minutes_to_make)
          : include;
        filter.image_source
          ? (include &= recipe?.image_source == filter?.image_source)
          : include;
        filter?.author_fk?.username
          ? (include &=
              recipe?.author_fk?.username == filter?.author_fk?.username)
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
                recipe_ingredient?.name == filter_ingredient?.name &&
                recipe_ingredient?.measurement?.unit ==
                  filter_ingredient?.measurement?.unit &&
                recipe_ingredient?.measurement?.amount ==
                  filter_ingredient?.measurement?.amount;
            }
            outer_found &= inner_found;
          }
          include &= outer_found;
        }

        // filter for dietary types, This is an or map so if it includes all
        // given diets it will include this recipe.
        if (filter.dietary_types) {
          if (recipe.dietaryTypes[0]) {
            outer_found = true;
          } else {
            outer_found = false;
          }
          for (filter_diet of filter.dietary_types) {
            inner_found = false;
            for (recipe_diet of recipe.dietaryTypes) {
              inner_found |= recipe_diet.name == filter_diet.name;
            }
            outer_found &= inner_found;
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

const searchRecipes = (searchTerm) =>
  models.recipe
    .findAll({
      include: { model: models.user, as: "author_fk" },
      where: {
        name: { [Op.like]: `%${searchTerm}%` },
      },
    })
    .then((recipes) => {
      const safeRecipes = recipes.map((recipe) => {
        let safeRecipe = recipe.toJSON();
        safeRecipe = changeForeignKeyName(safeRecipe, "author_fk", "author");
        delete safeRecipe.author.password;
        return safeRecipe;
      });
      return safeRecipes;
    });

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
      safeRecipe = changeForeignKeyName(safeRecipe, "author_fk", "author");
      safeRecipe = changeForeignKeyName(
        safeRecipe,
        "dietaryTypes",
        "dietary_types"
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

const updateRecipe = (recipeId, newRecipe, userId, is_admin) => {
  // Spent far too long figuring out how to update the recipe
  // and all of its relations while also being able to add in new relations
  // if needed. That was fucking hard, so here we just delete it and create it
  // (:
  // return deleteRecipe(recipeId, userId, is_admin).then((status) => {
  //   newRecipe.id = recipeId;
  //   return createRecipe(newRecipe);
  // });
  return models.recipe.findByPk(recipeId).then((recipe) => {
    recipe.name = newRecipe.name;
    recipe.difficulty = newRecipe.difficulty;
    recipe.cooking_method = newRecipe.cooking_method;
    recipe.serving_size = newRecipe.serving_size;
    recipe.cuisine = newRecipe.cuisine;
    recipe.minutes_to_make = newRecipe.minutes_to_make;

    const ingredientDelete = models.ingredient.destroy({
      where: { id: { [Op.in]: newRecipe.deletedIngredientIds } },
    });

    return Promise.all([ingredientDelete, recipe.save()]);
  });
};

const deleteIngredients = (ingredientIds) =>
  models.ingredient.destroy({ where: { [Op.in]: ingredientIds } });

const deleteRecipe = (rid, userId, is_admin) => {
  if (is_admin === 1) {
    return models.recipe.destroy({
      where: { id: rid },
    });
  } else {
    return models.recipe.destroy({
      where: { id: rid, author: userId },
    });
  }
};

const truncateRecipe = () =>
  models.recipe.destroy({ truncate: { cascade: true } });

module.exports = {
  findAllRecipes,
  searchRecipes,
  findRecipeById,
  findDietaryTypesForRecipe,
  findIngredientsForRecipe,
  createRecipe,
  updateRecipe,
  truncateRecipe,
  deleteRecipe,
  findUsersWhoHaveSaved,
};
