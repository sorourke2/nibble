const ingredientsService = require('../services/ingredients');
module.exports = function (app) {
  app.get('/api/ingredients', (_, res) =>
    ingredientsService
      .findAllIngredients()
      .then((ingredients) => res.json(ingredients))
  );

  app.get('/api/ingredients/:iid', (req, res) =>
    ingredientsService
      .findIngredientById(req.params['iid'])
      .then((ingredient) => res.json(ingredient))
  );

  app.get('/api/ingredients/:iid/recipes', (req, res) =>
    ingredientsService
      .findRecipesForIngredient(req.params['iid'])
      .then((ingredient) => res.json(ingredient))
  );

  app.post('/api/ingredients', (req, res) =>
    ingredientsService
      .createIngredient(req.body)
      .then((newIngredient) => res.json(newIngredient))
  );

  app.put('/api/ingredients/:rid', (req, res) =>
    ingredientsService
      .updateIngredient(req.params['rid'], req.body)
      .then((status) => res.send(status))
  );
};
