const express = require("express");
const app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var session = require("express-session");
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "any string",
  })
);

const database = require("./database");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

require("./controllers/recipes.js")(app);
require("./controllers/ingredients.js")(app);

app.get("/hello", (req, res) => res.send("hello world!"));

app.listen(4000);
