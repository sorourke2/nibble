const recipesService = require("../services/recipes");
const getTokenFrom = require("../utils/token");
const jwt = require("jsonwebtoken");

module.exports = function (app) {
  app.get("/api/recipes", (_, res) =>
    recipesService.findAllRecipes().then((recipes) => res.json(recipes))
  );

  app.get("/api/recipes/:rid", (req, res) =>
    recipesService
      .findRecipeById(req.params["rid"])
      .then((recipe) => res.json(recipe))
  );

  app.get("/api/recipes/:rid/ingredients", (req, res) =>
    recipesService
      .findIngredientsForRecipe(req.params["rid"])
      .then((ingredients) => res.json(ingredients))
  );

  app.get("/api/recipes/:rid/dietary-types", (req, res) =>
    recipesService
      .findDietaryTypesForRecipe(req.params["rid"])
      .then((dietaryTypes) => res.json(dietaryTypes))
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

  app.put("/api/recipes/:rid", (req, res) =>
    recipesService
      .updateRecipe(req.params["rid"], req.body)
      .then((status) => res.send(status))
  );
};
