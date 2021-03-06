require('dotenv').config();
const express = require('express');
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA,
};

var sessionStore = new MySQLStore(options);

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string',
    store: sessionStore,
  })
);

const database = require('./database');

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
require('./controllers/users')(app);
// const userDao = require("./daos/users");
// userDao.syncUser();
// userDao.truncateUser();
// const recipeDao = require("./daos/recipes");
// recipeDao.truncateRecipe();
require('./controllers/recipes')(app);
require('./controllers/ingredients')(app);

app.get('/hello', (req, res) => res.send('hello world!'));
const seed = require('./seed');

app.listen(process.env.PORT, () => {
  console.log('Listening at port ' + process.env.PORT);
});
