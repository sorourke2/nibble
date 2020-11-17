const registeredUsersDao = require('../daos/registeredUsers');

findAllRegisteredUsers = () => registeredUsersDao.findAllRegisteredUsers();
findRegisteredUserById = (ruid) =>
  registeredUsersDao.findRegisteredUserById(ruid);
findCreatedRecipes = (ruid) => registeredUsersDao.findCreatedRecipes(ruid);
createCreatedRecipes = (ruid) => registeredUsersDao.createCreatedRecipes(ruid);
updateCreatedRecipes = (ruid) => registeredUsersDao.updateCreatedRecipes(ruid);
findSavedRecipes = (ruid) => registeredUsersDao.findSavedRecipes(ruid);
createSavedRecipes = (ruid) => registeredUsersDao.createSavedRecipes(ruid);
updateSavedRecipes = (ruid) => registeredUsersDao.updateSavedRecipes(ruid);
createRegisteredUser = (newRecipe) =>
  registeredUsersDao.createRegisteredUser(newRecipe);
updateRegisteredUser = (ruid, newRecipe) =>
  registeredUsersDao.updateRegisteredUser(ruid, newRecipe);

module.exports = {
  findAllRegisteredUsers,
  findRegisteredUserById,
  findRecipesForRegisteredUser,
  createRegisteredUser,
  updateRegisteredUser,
  findCreatedRecipes,
  updateCreatedRecipes,
  createCreatedRecipes,
  findSavedRecipes,
  createSavedRecipes,
  updateSavedRecipes,
};
