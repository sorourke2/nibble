const userDao = require('../daos/users');

const userService = {
  usernameExists: (username) => userDao.usernameExists(username),

  registerUser: ({ username, password }) =>
    userDao.registerUser({ username, password }),

  loginUser: ({ username, password }) =>
    userDao.loginUser({ username, password }),

  findCreatedRecipes: (ruid) => userDao.findCreatedRecipes(ruid),

  getUser: ({ id }) => userDao.getUser({ id }),

  saveRecipe: (uid, rid) => userDao.saveRecipe(uid, rid),

  unsaveRecipe: (uid, rid) => userDao.unsaveRecipe(uid, rid),

  findSavedRecipes: (uid) => userDao.findSavedRecipes(uid),

  updateUser: ({ id, displayName, avatarColor, initialsColor }) =>
    userDao.updateUser({ id, displayName, avatarColor, initialsColor }),
};

module.exports = {
  ...userService,
};
