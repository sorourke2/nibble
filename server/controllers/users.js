const jwt = require("jsonwebtoken");
const userService = require("../services/users");
const getTokenFrom = require("../utils/token");

module.exports = (app) => {
  app.get("/api/user/whoami", (req, res) => {
    const token = getTokenFrom(req);
    if (!token) return res.status(401).send({ message: "token missing" });
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id)
      return res.status(401).send({ message: "token invalid" });

    res
      .status(200)
      .send("User: " + decodedToken.id + " : " + decodedToken.username);
  });

  app.post("/api/user/register", (req, res) => {
    const { username, password } = req.body;
    userService.usernameExists(username).then((usernameTaken) => {
      if (usernameTaken) {
        res.status(422).send({ message: "Username already taken" });
      } else {
        userService
          .registerUser({ username, password })
          .then(({ username, id }) => {
            const userForToken = { username, id };
            const token = jwt.sign(userForToken, process.env.SECRET);
            res.status(200).send({ token, username });
          });
      }
    });
  });

  app.post("/api/user/login", (req, res) => {
    const { username, password } = req.body;
    userService.usernameExists(username).then((validUser) => {
      if (!validUser) {
        res.status(400).send({ message: "Username does not exist" });
      } else {
        userService
          .loginUser({ username, password })
          .then(({ match, username, id }) => {
            if (match) {
              const userForToken = { username, id };
              const token = jwt.sign(userForToken, process.env.SECRET);
              res.status(200).send({ token, username });
            } else {
              res.status(401).send({ message: "Incorrect password" });
            }
          });
      }
    });
  });
};
