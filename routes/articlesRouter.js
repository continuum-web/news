const articlesRouter = require('express').Router()
const { articlesController } = require('../controllers/articles.controllers')

articlesRouter.get('/', articlesController)




module.exports= articlesRouter