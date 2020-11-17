const registeredUsersService = require('../services/registeredUsers');
module.exports = function (app) {
  app.get('/api/registeredUsers', (_, res) =>
    registeredUsersService
      .findAllRegisteredUsers()
      .then((registeredUsers) => res.json(registeredUsers))
  );

  app.get('/api/registeredUsers/:ruid', (req, res) =>
    registeredUsersService
      .findRegisteredUserById(req.params['ruid'])
      .then((recipe) => res.json(recipe))
  );

  app.get('/api/registeredUsers/:ruid/created-recipes', (req, res) =>
    registeredUsersService
      .findCreatedRecipes(req.params['ruid'])
      .then((createdRecipes) => res.json(createdRecipes))
  );

  app.post('/api/registeredUsers/:ruid/created-recipes', (req, res) =>
    registeredUsersService
      .createCreatedRecipe(req.params['ruid'], req.body)
      .then((newCreatedRecipe) => res.json(newCreatedRecipe))
  );

  app.get('/api/registeredUsers/:ruid/saved-recipes', (req, res) =>
    registeredUsersService
      .findSavedRecipes(req.params['ruid'])
      .then((savedRecipes) => res.json(savedRecipes))
  );

  app.post('/api/registeredUsers/:ruid/saved-recipes', (req, res) =>
    registeredUsersService
      .createSavedRecipe(req.params['ruid'], req.body)
      .then((newSavedRecipe) => res.json(newSavedRecipe))
  );

  app.post('/api/registeredUsers', (req, res) =>
    registeredUsersService
      .createRegisteredUser(req.body)
      .then((newRegistedUser) => res.json(newRegistedUser))
  );

  app.put('/api/registeredUsers/:ruid', (req, res) =>
    registeredUsersService
      .updateRegisteredUser(req.params['ruid'], req.body)
      .then((status) => res.send(status))
  );
};
