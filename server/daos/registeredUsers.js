const db = require('../database').db;
const { initModels } = require('../models/init-models');
const models = initModels(db.sequelize);
const findAllRegisteredUsers = () => models.registeredUser.findAll();
const findRegisteredUserById = (ruid) =>
  models.registeredUser.findByPk(ruid, {
    include: [models.recipe],
    required: true,
  });

const findCreatedRecipes = (ruid) =>
  findRecipeById(ruid).then((registeredUser) => registeredUser.createdRecipes);

const createCreatedRecipes = (ruid) => {};
const updateCreatedRecipes = (ruid) => {};
const findSavedRecipes = (ruid) =>
  findRecipeById(ruid).then((registeredUser) => registeredUser.savedRecipes);
const createSavedRecipes = (ruid) => {};
const updateSavedRecipes = (ruid) => {};
const createRegisteredUser = (newRegisteredUser) =>
  models.registeredUser
    .create(newRegisteredUser, {
      include: [models.recipe],
      required: true,
    })
    .catch(function (err) {
      console.log(err);
    });
const updateRegisteredUser = (ruid, newRegisteredUser) =>
  // TODO: Look into possible need to update recipe tables / references
  models.registeredUser.update(newRegisteredUser, {
    where: {
      id: ruid,
    },
  });

module.exports = {
  findAllRegisteredUsers,
  findRegisteredUserById,
  createRegisteredUser,
  updateRegisteredUser,
  findCreatedRecipes,
  updateCreatedRecipes,
  createCreatedRecipes,
  findSavedRecipes,
  createSavedRecipes,
  updateSavedRecipes,
};
