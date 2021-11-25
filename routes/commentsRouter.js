const commentsRouter = require('express').Router();
const { deleteComment, patchComments } = require('../controllers/comments.controller');
//adds a temp message for the /comments endpoint
commentsRouter.get('/', (req, res) => {
	res.status(404).send('Comments endpoint under construction');
});

commentsRouter.delete('/:comment_id', deleteComment);
commentsRouter.patch('/:comment_id', patchComments);

module.exports = commentsRouter;
