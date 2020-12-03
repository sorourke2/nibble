const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../database").db.sequelize;
const { initModels } = require("../models/init-models");
const models = initModels(sequelize);

const userDao = {
  usernameExists: (username) => {
    return models.user
      .findOne({ where: { username } })
      .then((user) => user !== null);
  },

  registerUser: ({ username, password }) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds).then((encryptedPassword) =>
      models.user
        .create({
          username,
          password: encryptedPassword,
          displayName: username,
          avatarColor: "#000000",
          initialsColor: "#FFFFFF",
          is_admin: false,
        })
        .then((newUser) => ({ username: newUser.username, id: newUser.id }))
    );
  },

  truncateUser: () => models.user.destroy({ truncate: { cascade: true } }),

  loginUser: ({ username, password }) =>
    models.user.findOne({ where: { username } }).then((savedUser) =>
      bcrypt.compare(password, savedUser.password).then((match) => ({
        match,
        username,
        id: savedUser.id,
      }))
    ),

  getUser: ({ id }) => models.user.findByPk(id),

  updateUser: ({ id, displayName, avatarColor, initialsColor }) =>
    models.user.update(
      { displayName, avatarColor, initialsColor },
      { where: { id } }
    ),
};

module.exports = {
  ...userDao,
};

/*
class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING,
    },
    avatarColor: {
      type: DataTypes.STRING(7),
    },
    initialsColor: {
      type: DataTypes.STRING(7),
    },
  },
  {
    sequelize,
    modelName: "user",
    freezeTableName: true,
  }
);

const usernameExists = (username) => {
  return User.findOne({ where: { username } }).then((user) => user !== null);
};

const registerUser = ({ username, password }) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds).then((encryptedPassword) =>
    User.create({
      username,
      password: encryptedPassword,
      displayName: username,
      avatarColor: "#000000",
      initialsColor: "#FFFFFF",
    }).then((newUser) => ({ username: newUser.username, id: newUser.id }))
  );
};

const loginUser = ({ username, password }) =>
  User.findOne({ where: { username } }).then((savedUser) =>
    bcrypt.compare(password, savedUser.password).then((match) => ({
      match,
      username,
      id: savedUser.id,
    }))
  );

const getUser = ({ id }) => User.findByPk(id);

const updateUser = ({ id, displayName, avatarColor, initialsColor }) =>
  User.update({ displayName, avatarColor, initialsColor }, { where: { id } });

const syncUser = () => User.sync({ force: true });

const truncateUser = () => User.destroy({ truncate: { cascade: true } });

module.exports = {
  syncUser,
  truncateUser,
  usernameExists,
  registerUser,
  loginUser,
  getUser,
  updateUser,
};
*/
