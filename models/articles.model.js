const db = require('../db/connection');

exports.selectArticles = article_id => {
	let queryStr = `SELECT articles.*, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id`;
	if (article_id !== undefined) {
		queryStr += ` WHERE article_id = $1`;
		queryParams.push(article_id);
	}
	 
	return db.query(queryStr, queryParams),
};

exports.articleComments = article_id => {
	const queryParams = [];
	let queryStr = `SELECT * FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id`;
	if (article_id !== undefined) {
		queryStr += ` WHERE articles.article_id = $1`;
		queryParams.push(article_id);
	}
	return db.query(queryStr, queryParams);
};
