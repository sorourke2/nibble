const { truncateRecipe } = require('../daos/recipes');
const recipesDao = require('../daos/recipes');

findAllRecipes = () => recipesDao.findAllRecipes();
findRecipeById = (rid) => recipesDao.findRecipeById(rid);
findIngredientsForRecipe = (rid) => recipesDao.findIngredientsForRecipe(rid);
findDietaryTypesForRecipe = (rid) => recipesDao.findDietaryTypesForRecipe(rid);
createRecipe = (newRecipe) => recipesDao.createRecipe(newRecipe);
updateRecipe = (rid, newRecipe) => recipesDao.updateRecipe(rid, newRecipe);
deleteRecipe = (rid) => recipesDao.deleteRecipe(rid);

module.exports = {
  findAllRecipes,
  findRecipeById,
  findIngredientsForRecipe,
  findDietaryTypesForRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
