const usersRouter = require('express').Router();
const { getUsersController } = require('../controllers/users.controller');

usersRouter.get('/', getUsersController);


module.exports = usersRouter
