const ingredientsDao = require('../daos/ingredients');

findAllIngredients = () => ingredientsDao.findAllIngredients();
findIngredientById = (iid) => ingredientsDao.findIngredientById(iid);
findRecipesForIngredient = (iid) =>
  ingredientsDao.findRecipesForIngredient(iid);
createIngredient = (newIngredient) =>
  ingredientsDao.createIngredient(newIngredient);
updateIngredient = (iid, newIngredient) =>
  ingredientsDao.updateIngredient(iid, newIngredient);

module.exports = {
  findAllIngredients,
  findIngredientById,
  createIngredient,
  updateIngredient,
  findRecipesForIngredient,
};
