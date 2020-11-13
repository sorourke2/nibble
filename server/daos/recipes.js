const recipesModel = require('../models/recipe')

const findAllRecipes = () =>
      recipesModel.find()

const findRecipesById = (rid) =>
      recipesModel.findById(rid)

module.exports = {
    findAllRecipes,
    findRecipesById
}