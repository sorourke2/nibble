const recipesDao = require('../daos/recipes');

findAllRecipes = () => recipesDao.findAllRecipes();
findRecipeById = (rid) => recipesDao.findRecipesById(rid);

module.exports = {
  findAllRecipes,
  findRecipeById,
};
