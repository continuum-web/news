const topicsRouter = require('express').Router();
const { topicsController } = require('../controllers/topics.controllers');

//routed the GET request for the /api/topics route
topicsRouter.get('/', topicsController);

module.exports = topicsRouter;
