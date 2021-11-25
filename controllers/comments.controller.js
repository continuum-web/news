const { addCommentById } = require('../models/comments.model');

const {
	deleteCommentById,
    patchCommentsById,
    getComments
} = require('../models/comments.model');


exports.getAllComments = (req, res, next) => {
    
    return getComments()
			.then(({ rows }) => {
				res.status(200).send({ comment: rows });
			})
			.catch(next);
}

exports.postComment = (req, res, next) => {
	const { article_id } = req.params;
	const { body } = req;
	return addCommentById(article_id, body)
		.then(({ rows }) => {
			res.status(201).send({ comment: rows[0] });
		})
		.catch(next);
};

exports.deleteComment = (req, res, next) => {
	const { comment_id } = req.params;

	return deleteCommentById(comment_id)
		.then(({ rows }) => {
			res.status(204).send();
		})
		.catch(next);
};

exports.patchComments = (req, res, next) => {
	const { comment_id } = req.params;
	const { inc_votes } = req.body;
	return patchCommentsById(comment_id, inc_votes)
		.then(({ rows }) => {
			res.status(204).send();
		})
		.catch(next);
};
