const articlesRouter = require('express').Router()
const {
	articlesController,
	articleComments,
} = require('../controllers/articles.controllers');

articlesRouter.get('/', articlesController)
articlesRouter.get('/:article_id', articlesController)
articlesRouter.get('/:article_id/comments', articleComments);



module.exports= articlesRouter