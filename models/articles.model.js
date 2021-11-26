const db = require('../db/connection');

exports.selectArticles = (
	article_id,
	topic,
	sort_by = 'created_at',
	order = 'desc',
) => {
	const topics = ['coding', 'cooking', 'football'];
	const queryParams = [];
	const sortQuery = [
		'created_at',
		'votes',
		'title',
		'article_id',
		'topic',
		'author',
		'comment_count',
	];
	const allowedOrders = ['asc', 'desc'];
	let queryStr = `SELECT articles.*, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id `;
	if (article_id !== undefined) {
		queryStr += `WHERE articles.article_id = $1`;
		queryParams.push(article_id);
	}
	if (topic !== undefined) {
		if (topics.includes(topic)) {
			queryStr += `WHERE articles.topic = $1 `;
			queryParams.push(topic);
		} else {
			return Promise.reject({ status: 404, msg: 'not found' });
		}
	}
	queryStr += ` GROUP BY articles.article_id`;
	if (!sortQuery.includes(sort_by) || !allowedOrders.includes(order)) {
		return Promise.reject({ status: 400, msg: 'bad request' });
	}

	if (sort_by === 'comment_count') {
		queryStr += ` ORDER BY ${sort_by} ${order}`;
	} else {
		queryStr += ` ORDER BY articles.${sort_by} ${order}`;
	}

	return db.query(queryStr, queryParams);
	
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



exports.patchArticle = (article_id, inc_votes) => {
	
	// if (article_id < articleLength.length) {
	// 	return Promise.reject({ status: 404, msg: 'Not Found' });
	// }

	if (typeof inc_votes !== 'number') {
		return Promise.reject({ status: 400, msg: 'bad request' });
	}

	let updateQuery = `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`;
	let queryValues = [inc_votes, article_id];

	return db.query(updateQuery, queryValues).then(({ rows }) => {
		return { articles: rows[0] };
	});
};
