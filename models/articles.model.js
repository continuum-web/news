const db = require('../db/connection');

exports.selectArticles = article_id => {
	const queryParams = [];
	const articles = []
	let queryStr = `SELECT * FROM articles`;
	let countQuery = ``
	if (article_id !== undefined) {
		queryStr += ` WHERE article_id = $1`;
		countQuery += `SELECT COUNT(*) FROM comments WHERE article_id =  $1`;
		queryParams.push(article_id);
	}
	
	const promises = [
		db.query(queryStr, queryParams),
		db.query(countQuery, queryParams)
	];
	return Promise.all(promises).then((data) => {
		//for each article returned we query the db for its count

		const article = data[0].rows[0];
		const { count } = data[1].rows[0];
		article.comment_count = Number(count)
		articles.push(article)
		return articles
	})
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
