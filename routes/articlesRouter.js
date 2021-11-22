const articlesRouter = require('express').Router();
const {
	getArticles,
	articleComments,
	patchArticle,
} = require('../controllers/articles.controllers');
const { postComment } = require('../controllers/comments.controller')

// these routes handle get requests and routes the path to the relevant controller function
articlesRouter.get('/', getArticles);
articlesRouter.get('/:article_id', getArticles);
articlesRouter.get('/:article_id/comments', articleComments);

// handles the patch method routing 
articlesRouter.patch('/:article_id', patchArticle);


//handles POST requests
articlesRouter.post('/:article_id/comments', postComment);
module.exports = articlesRouter;
