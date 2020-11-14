const recipesService = require('../services/recipes');
module.exports = function (app) {
  app.get('/api/recipes', (_, res) =>
    recipesService.findAllRecipes().then((recipes) => res.json(recipes))
  );

  app.get('/api/recipes/:rid', (req, res) =>
    recipesService
      .findRecipeById(req.params['rid'])
      .then((recipe) => res.json(recipe))
  );

  app.get('/api/recipes/:rid/ingredients', (req, res) =>
    recipesService
      .findIngredientsForRecipe(req.params['rid'])
      .then((ingredients) => res.json(ingredients))
  );

  app.post('/api/recipes', (req, res) =>
    recipesService
      .createRecipe(req.body)
      .then((newRecipe) => res.json(newRecipe))
  );

  app.put('/api/recipes/:rid', (req, res) =>
    recipesService
      .updateRecipe(req.params['rid'], req.body)
      .then((status) => res.send(status))
  );
};
