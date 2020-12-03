const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../database").db.sequelize;

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
      type: DataTypes.STRING(6),
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

const updateUser = ({ id, displayName }) =>
  User.update({ displayName }, { where: { id } });

const syncUser = () => User.sync({ force: true });

module.exports = {
  syncUser,
  usernameExists,
  registerUser,
  loginUser,
  getUser,
  updateUser,
};
