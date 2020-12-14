const { truncateRecipe } = require("../daos/recipes");
const recipesDao = require("../daos/recipes");

findAllRecipes = (filter) => recipesDao.findAllRecipes(filter);
searchRecipes = (searchTerm) => recipesDao.searchRecipes(searchTerm);
findRecipeById = (rid) => recipesDao.findRecipeById(rid);
findIngredientsForRecipe = (rid) => recipesDao.findIngredientsForRecipe(rid);
findDietaryTypesForRecipe = (rid) => recipesDao.findDietaryTypesForRecipe(rid);
createRecipe = (newRecipe) => recipesDao.createRecipe(newRecipe);
updateRecipe = (rid, newRecipe) => recipesDao.updateRecipe(rid, newRecipe);
deleteRecipe = (rid, userId, is_admin) =>
  recipesDao.deleteRecipe(rid, userId, is_admin);
findUsersWhoHaveSaved = (rid) => recipesDao.findUsersWhoHaveSaved(rid);

module.exports = {
  findAllRecipes,
  searchRecipes,
  findRecipeById,
  findIngredientsForRecipe,
  findDietaryTypesForRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  findUsersWhoHaveSaved,
};
