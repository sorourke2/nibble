const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../database').db.sequelize;
const { initModels } = require('../models/init-models');
const models = initModels(sequelize);
const changeForeignKeyName = require('../utils/foreignKey');

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
          avatarColor: '#000000',
          initialsColor: '#FFFFFF',
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

  saveRecipe: (uid, rid) => {
    return models.hasSaved.create({ user_id: uid, recipe_id: rid });
  },

  unsaveRecipe: (uid, rid) => {
    return models.hasSaved.destroy({ where: { user_id: uid, recipe_id: rid } });
  },

  findSavedRecipes: (uid) => {
    return models.recipe
      .findAll({
        include: [
          { model: models.user, as: 'author_fk' },
          {
            model: models.dietaryType,
            attributes: ['id', 'name'],
            through: { attributes: [] },
          },
          {
            model: models.ingredient,
            attributes: ['id', 'name'],
            through: { attributes: [] },
            include: [models.measurement],
          },
          { model: models.hasSaved, where: { user_id: uid } },
        ],
      })
      .then((recipes) => {
        const safeRecipes = recipes.map((recipe) => {
          let safeRecipe = recipe.toJSON();
          safeRecipe = changeForeignKeyName(safeRecipe, 'author_fk', 'author');
          safeRecipe = changeForeignKeyName(
            safeRecipe,
            'dietaryTypes',
            'dietary_types'
          );
          delete safeRecipe.author.password;
          delete safeRecipe.hasSaveds;
          return safeRecipe;
        });
        return safeRecipes;
      });
  },

  findCreatedRecipes: (ruid) => {
    return models.recipe
      .findAll({
        include: [
          { model: models.user, as: 'author_fk' },
          {
            model: models.dietaryType,
            attributes: ['id', 'name'],
            through: { attributes: [] },
          },
          {
            model: models.ingredient,
            attributes: ['id', 'name'],
            through: { attributes: [] },
            include: [models.measurement],
          },
        ],
        where: { author: ruid },
      })
      .then((recipes) => {
        const safeRecipes = recipes.map((recipe) => {
          let safeRecipe = recipe.toJSON();
          safeRecipe = changeForeignKeyName(safeRecipe, 'author_fk', 'author');
          safeRecipe = changeForeignKeyName(
            safeRecipe,
            'dietaryTypes',
            'dietary_types'
          );
          delete safeRecipe.author.password;
          return safeRecipe;
        });
        return safeRecipes;
      });
  },
};

module.exports = {
  ...userDao,
};
