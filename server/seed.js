const UserService = require('./services/users');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
require('dotenv').config();

const password = process.env.ADMIN_PASSWORD;
const username = process.env.ADMIN_USERNAME;
const is_admin = true;
UserService.usernameExists(username).then((usernameTaken) => {
  if (usernameTaken) {
  } else {
    UserService.registerUser({ username, password, is_admin }).then(
      ({ username, id }) => {
        const userForToken = { username, id };
        const token = jwt.sign(userForToken, process.env.SECRET);
      }
    );
  }
});
