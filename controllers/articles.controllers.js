const { selectArticles, articleComments } = require('../models/articles.model');

exports.articlesController = (req, res, next) => {
	const { article_id } = req.params;
	return selectArticles(article_id)
		.then(({ rows }) => {
			if (rows.length === 0) {
				return Promise.reject({ status: 404, msg: 'not found' });
			} else {
				res.status(200).send({ articles: rows });
			}
		})
		.catch(next);
};

exports.articleComments = (req, res, next) => {
	const { article_id } = req.params;
	return articleComments(article_id)
		.then(({ rows }) => {
			if (rows.length === 0) {
				return Promise.reject({ status: 404, msg: 'not found' });
			} else {
				res.status(200).send({ comments: rows });
			}
		})
		.catch(next);
};
