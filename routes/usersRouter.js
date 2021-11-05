const usersRouter = require('express').Router();
const { getUsersController } = require('../controllers/users.controller');

usersRouter.get('/', getUsersController);
usersRouter.get('/:username', getUsersController);


module.exports = usersRouter
