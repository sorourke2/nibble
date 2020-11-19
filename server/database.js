const config = require('./config.json');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.db.url);
const SequelizeAuto = require('sequelize-auto');

db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
// const auto = new SequelizeAuto(
//   sequelize,
//   null,
//   null,
//   config.db.sequelizeAutoOptions
// );

exports.db = db;
// auto.run();
