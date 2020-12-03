const userDao = require("../daos/users");

const userService = {
  usernameExists: (username) => userDao.usernameExists(username),

  registerUser: ({ username, password }) =>
    userDao.registerUser({ username, password }),

  loginUser: ({ username, password }) =>
    userDao.loginUser({ username, password }),

  getUser: ({ id }) => userDao.getUser({ id }),

  updateUser: ({ id, displayName, avatarColor, initialsColor }) =>
    userDao.updateUser({ id, displayName, avatarColor, initialsColor }),
};

module.exports = {
  ...userService,
};
