const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL);
const SequelizeAuto = require("sequelize-auto");

db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
// const auto = new SequelizeAuto(
//   sequelize,
//   null,
//   null,
//   config.db.sequelizeAutoOptions
// );
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testConnection();

exports.db = db;
// auto.run();
