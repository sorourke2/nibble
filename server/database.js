// require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);
const SequelizeAuto = require('sequelize-auto');

db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
// const auto = new SequelizeAuto(sequelize, null, null, {
//   host: 'the host for our server',
//   dialect: 'mysql',
//   port: '3306',
//   caseModel: 'c',
//   caseFile: 'c',
//   lang: 'es6',
// });
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();

exports.db = db;
// auto.run();
