const {
	selectArticles,
	articleComments,
	patchArticle,
} = require('../models/articles.model');

//the main article control function handles the get requests and hands of to the model
exports.articlesController = (req, res, next) => {
	//const articles = [];
	const { article_id } = req.params;
	console.log(req.query)
	const { sort_by } = req.query
	//calls the selectArticles model to get articles from the database and send them back as a response to the express app.
	return selectArticles(article_id, sort_by)
		.then(article => {
			if (article.length === 0) {
				return Promise.reject({ status: 404, msg: 'not found' });
			} else if (article.length === 1) {
				//articles.push(article);
				res.status(200).send({ article });
			} else {
				//articles.push(article);
				res.status(200).send({ articles:article });
			}
		})
		.catch(next);
};

//the main article Comments control function handles the get requests and hands of to the model
//this function takes an id and sends it to the model to get the comments from a specific article
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

//this is to patch votes or articles, this controller passes through an id and a number you want to increase the votes by
exports.patchArticle = (req, res, next) => {
	const { article_id } = req.params;
	const { inc_votes } = req.body;
	return patchArticle(article_id, inc_votes)
		.then(({ articles }) => {
			res.status(202).send(articles);
		})
		.catch(next);
};
