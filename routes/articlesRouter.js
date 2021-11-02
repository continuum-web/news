const articlesRouter = require('express').Router()
const { articlesController } = require('../controllers/articles.controllers')

articlesRouter.get('/', articlesController)
articlesRouter.get('/:article_id', articlesController)



module.exports= articlesRouter