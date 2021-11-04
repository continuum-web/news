const { addCommentById } = require('../models/comments.model');
const {deleteCommentById} = require('../models/comments.model')
exports.postComment = (req, res, next) => {
	const { article_id } = req.params;
	const { body } = req;
    return addCommentById(article_id, body).then(
        ({rows}) => {		
            res.status(201).send({comment:rows[0]});
	}).catch(next);
};

exports.deleteComment = (req, res, next) => {
    const { comment_id } = req.params
    
    return deleteCommentById(comment_id).then(({ rows}) => {
        res.status(204).send()
    }).catch(next)

}