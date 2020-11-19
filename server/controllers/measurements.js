const measurementsService = require('../services/measurements');
module.exports = function (app) {
  app.get('/api/measurements', (_, res) =>
    measurementsService
      .findAllMeasurements()
      .then((measurements) => res.json(measurements))
  );

  app.get('/api/measurements/:mid', (req, res) =>
    measurementsService
      .findMeasurementById(req.params['mid'])
      .then((measurement) => res.json(measurement))
  );

  app.get('/api/measurements/:mid/ingredients', (req, res) =>
    measurementsService
      .findIngredientsForMeasurement(req.params['mid'])
      .then((ingredients) => res.json(ingredients))
  );

  app.post('/api/measurements', (req, res) =>
    measurementsService
      .createRecipe(req.body)
      .then((newMeasurement) => res.json(newMeasurement))
  );

  app.put('/api/measurements/:mid', (req, res) =>
    measurementsService
      .updateMeasurement(req.params['mid'], req.body)
      .then((status) => res.send(status))
  );
};
