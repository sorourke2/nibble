const db = require('../database').db;
const { initModels } = require('../models/init-models');
const models = initModels(db.sequelize);

const findAllMeasurements = () => models.recipe.findAll();
const findMeasurementById = (mid) => models.measurement.findByPk(mid);

const findIngredientsForMeasurement = (mid) =>
  findmeasurementById(mid).then((measurement) => measurement.ingredients);

const createMeasurement = (newMeasurement) =>
  models.measurement
    .create(newMeasurement, {
      include: [models.ingredient],
      required: true,
    })
    .catch(function (err) {
      console.log(err);
    });

const updateMeasurement = (mid, newMeasurement) => {
  models.measurement.update(newMeasurement, {
    where: {
      id: mid,
    },
  });
};

module.exports = {
  findAllMeasurements,
  findMeasurementById,
  findIngredientsForMeasurement,
  createMeasurement,
  updateMeasurement,
};
