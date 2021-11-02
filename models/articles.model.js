const db = require('../db/connection');

exports.selectArticles = article_id => {
	const queryParams = [];
	let queryStr = `SELECT * FROM articles`;
	if (article_id !== undefined) {
		queryStr += ` WHERE article_id = $1`;
		queryParams.push(article_id);
	}
	return db.query(queryStr, queryParams);
};

exports.articleComments = (article_id) => {
	const queryParams = []
	let queryStr = `SELECT * FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id`;
	if (article_id !== undefined) {
		queryStr += ` WHERE articles.article_id = $1`;
		queryParams.push(article_id);
	}
	return db.query(queryStr, queryParams);
}
