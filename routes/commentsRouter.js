const commentsRouter = require('express').Router();
const {
	deleteComment,
	patchComments,
	getComments,
} = require('../controllers/comments.controller');
//adds a temp message for the /comments endpoint
commentsRouter.get('/', (req, res) => {});
commentsRouter.delete('/:comment_id', deleteComment);
commentsRouter.patch('/:comment_id', patchComments);

module.exports = commentsRouter;
