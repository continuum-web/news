const articlesRouter = require('express').Router();
const {
	articlesController,
	articleComments,
	patchArticle,
} = require('../controllers/articles.controllers');

articlesRouter.get('/', articlesController);
articlesRouter.get('/:article_id', articlesController);
articlesRouter.get('/:article_id/comments', articleComments);
articlesRouter.patch('/:article_id', patchArticle);

module.exports = articlesRouter;
