const recipesService = require('../services/recipes');
module.exports = function (app) {
  app.get('/api/recipes/:rid', (req, res) =>
    res.json(recipesService.findRecipe(req.params['rid']))
  );
};
