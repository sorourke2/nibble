const express = require('express')
const app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var session = require('express-session')
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));

const connection = require('./connection.json');
const sequelize = require('sequelize');
const sequelize =
  new Sequelize(connection.database, connection.username, connection.password);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin",
      "http://localhost:4200");
  res.header("Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

require('./controllers/recipes.js')(app)

app.get('/hello', (req, res) => res.send('hello world!'))

app.listen(3000)