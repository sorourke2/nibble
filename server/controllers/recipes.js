const recipesService = require("../services/recipes");
const getTokenFrom = require("../utils/token");
const jwt = require("jsonwebtoken");

module.exports = function (app) {
  app.get("/api/recipes", (req, res) => {
    const token = getTokenFrom(req);
    if (!token) return res.status(401).send({ message: "token missing" });
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id)
      return res.status(401).send({ message: "token invalid" });

    return recipesService
      .findAllRecipes(req.body)
      .then((recipes) => res.json(recipes));
  });

  app.post("/api/recipes/search", (req, res) => {
    const token = getTokenFrom(req);
    if (!token) return res.status(401).send({ message: "token missing" });
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id)
      return res.status(401).send({ message: "token invalid" });

    const { searchTerm } = req.body;

    return recipesService
      .searchRecipes(searchTerm)
      .then((recipes) => res.json(recipes));
  });

  app.get("/api/recipes/:rid", (req, res) =>
    recipesService
      .findRecipeById(req.params["rid"])
      .then((recipe) => res.json(recipe))
  );

  app.get("/api/recipes/:rid/saved-by", (req, res) =>
    recipesService
      .findUsersWhoHaveSaved(req.params["rid"])
      .then((recipe) => res.json(recipe))
  );

  app.post("/api/recipes", (req, res) => {
    const token = getTokenFrom(req);
    if (!token) return res.status(401).send({ message: "token missing" });
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id)
      return res.status(401).send({ message: "token invalid" });

    const id = decodedToken.id;
    const recipe = req.body;
    recipesService
      .createRecipe({ author: id, ...recipe })
      .then((newRecipe) => res.json(newRecipe));
  });

  app.delete("/api/recipes/:rid", (req, res) => {
    const token = getTokenFrom(req);
    if (!token) return res.status(401).send({ message: "token missing" });
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id)
      return res.status(401).send({ message: "token invalid" });

    const id = decodedToken.id;
    const is_admin = decodedToken.is_admin;

    recipesService
      .deleteRecipe(req.params["rid"], id, is_admin)
      .then((status) => res.json(status));
  });

  app.put("/api/recipes/:rid", (req, res) => {
    const token = getTokenFrom(req);
    if (!token) return res.status(401).send({ message: "token missing" });
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id)
      return res.status(401).send({ message: "token invalid" });

    recipesService
      .updateRecipe(req.params["rid"], req.body)
      .then((status) => res.send(status));
  });

  app.get("/api/recipes/author/:rid", (req, res) => {
    const token = getTokenFrom(req);
    if (!token) return res.status(401).send({ message: "token missing" });
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id)
      return res.status(401).send({ message: "token invalid" });

    const userId = decodedToken.id;
    const recipeId = req.params["rid"];
    const is_admin = decodedToken.is_admin;

    recipesService.findRecipeById(recipeId).then((recipe) => {
      const match = recipe.author.id === userId || is_admin === 1;
      res.send(match);
    });
  });
};
