const measurements = require('../controllers/measurements');
const measurementsDao = require('../daos/measurements');

findAllMeasurements = () => measurementsDao.findAllRecipes();
findMeasurementById = (mid) => measurementsDao.findRecipeById(mid);
findIngredientsForMeasurement = (mid) =>
  measurementsDao.findIngredientsForRecipe(mid);
createMeasurement = (newMeasurement) =>
  measurementsDao.createMeasurement(newMeasurement);
updateMeasurement = (mid, newMeasurement) =>
  measurementsDao.updateMeasurement(mid, newMeasurement);

module.exports = {
  findAllMeasurements,
  findMeasurementById,
  findIngredientsForMeasurement,
  createMeasurement,
  updateMeasurement,
};
