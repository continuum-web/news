const topicsRouter = require('express').Router();
const { topicsController } = require('../controllers/topics.controllers');

topicsRouter.get('/', topicsController);

module.exports = topicsRouter;
