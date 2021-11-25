const commentsRouter = require('express').Router();
const {
	deleteComment,
	patchComments,
	getAllComments,
	getCommentById,
} = require('../controllers/comments.controller');
//adds a temp message for the /comments endpoint
commentsRouter.get('/', getAllComments);
commentsRouter.get('/:comment_id', getCommentById);
commentsRouter.delete('/:comment_id', deleteComment);
commentsRouter.patch('/:comment_id', patchComments);

module.exports = commentsRouter;
