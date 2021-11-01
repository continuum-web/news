const topicsRouter = require('express').Router();

topicsRouter.get('/', (req, res) => {
	res.status(404).send('topics endpoint under construction');
});

module.exports = topicsRouter;
