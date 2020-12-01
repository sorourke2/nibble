const userDao = require("../daos/users");

const usernameExists = (username) => userDao.usernameExists(username);

const registerUser = ({ username, password }) =>
  userDao.registerUser({ username, password });

const loginUser = ({ username, password }) =>
  userDao.loginUser({ username, password });

module.exports = {
  usernameExists,
  registerUser,
  loginUser,
};
