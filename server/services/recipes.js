const recipesDao = require('../daos/recipes');

findAllRecipes = () => recipesDao.findAllRecipes();
findRecipeById = (rid) => recipesDao.findRecipeById(rid);
findIngredientsForRecipe = (rid) => recipesDao.findIngredientsForRecipe(rid);
createRecipe = (newRecipe) => recipesDao.createRecipe(newRecipe);
updateRecipe = (rid, newRecipe) => recipesDao.updateRecipe(rid, newRecipe);

module.exports = {
  findAllRecipes,
  findRecipeById,
  findIngredientsForRecipe,
  createRecipe,
  updateRecipe,
};
