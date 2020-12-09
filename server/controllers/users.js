const jwt = require('jsonwebtoken');
const _ = require('lodash');
const UserService = require('../services/users');
const getTokenFrom = require('../utils/token');

module.exports = (app) => {
  app.post('/api/user/register', (req, res) => {
    const { username, password } = req.body;
    UserService.usernameExists(username).then((usernameTaken) => {
      if (usernameTaken) {
        res.status(422).send({ message: 'Username already taken' });
      } else {
        UserService.registerUser({ username, password }).then(
          ({ username, id }) => {
            const userForToken = { username, id };
            const token = jwt.sign(userForToken, process.env.SECRET);
            res.status(200).send({ token, username });
          }
        );
      }
    });
  });

  app.post('/api/user/login', (req, res) => {
    const { username, password } = req.body;
    UserService.usernameExists(username).then((validUser) => {
      if (!validUser) {
        res.status(400).send({ message: 'Username does not exist' });
      } else {
        UserService.loginUser({ username, password }).then(
          ({ match, username, id }) => {
            if (match) {
              const userForToken = { username, id };
              const token = jwt.sign(userForToken, process.env.SECRET);
              res.status(200).send({ token, username });
            } else {
              res.status(401).send({ message: 'Incorrect password' });
            }
          }
        );
      }
    });
  });

  app.get('/api/user', (req, res) => {
    const token = getTokenFrom(req);
    if (!token) return res.status(401).send({ message: 'token missing' });
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id)
      return res.status(401).send({ message: 'token invalid' });

    const id = decodedToken.id;

    UserService.getUser({ id }).then((user) => {
      const safeUser = _.omit(user.toJSON(), 'password');
      res.status(200).send(safeUser);
    });
  });

  app.get('/api/user/:uid/created-recipes', (req, res) =>
    UserService.findCreatedRecipes(req.params['uid']).then((created_recipes) =>
      res.json(created_recipes)
    )
  );

  app.post('/api/user/:uid/saved-recipes', (req, res) => {
    UserService.saveRecipe(
      req.params['uid'],
      req.body.id
    ).then((saved_recipe) => res.json(saved_recipe));
  });

  app.delete('/api/user/:uid/saved-recipes/:rid', (req, res) => {
    UserService.unsaveRecipe(
      req.params['uid'],
      req.params['rid']
    ).then((status) => res.json(status));
  });

  app.get('/api/user/:uid/saved-recipes', (req, res) => {
    UserService.findSavedRecipes(req.params['uid']).then((saved_recipe) =>
      res.json(saved_recipe)
    );
  });

  app.put('/api/user', (req, res) => {
    const token = getTokenFrom(req);
    if (!token) return res.status(401).send({ message: 'token missing' });
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id)
      return res.status(401).send({ message: 'token invalid' });

    const id = decodedToken.id;
    const { displayName, avatarColor, initialsColor } = req.body;

    UserService.updateUser({
      id,
      displayName,
      avatarColor,
      initialsColor,
    }).then((user) => {
      res.sendStatus(200);
    });
  });
};
