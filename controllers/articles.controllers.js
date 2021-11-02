const { selectArticles } = require('../models/articles.model')

exports.articlesController = (req, res, next) => {
	return selectArticles().then(({ rows }) => {
		res.status(200).send({ articles: rows });
	});
};