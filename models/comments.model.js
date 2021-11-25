const db = require('../db/connection');

exports.addCommentById = (article_id, passedBody) => {
	const params = [];

	const { username, body } = passedBody;
	params.push(article_id);
	params.push(username);
	params.push(body);


	const queryStr = `INSERT INTO comments (article_id, author, body)
    VALUES ($1, $2, $3) RETURNING *;`;

	return db.query(queryStr, params);
};

exports.deleteCommentById = comment_id => {
	const queryArr = [comment_id]
	const queryStr = `DELETE FROM comments WHERE comment_id = $1 RETURNING *`
	return db.query(queryStr, queryArr)
}

exports.patchCommentsById = (comment_id, inc_votes) => {
	const commentsLength = `SELECT * FROM comments`;

	if (comment_id > commentsLength.length) {
		return Promise.reject({ status: 404, msg: 'Not Found' });
	}

	if (typeof inc_votes !== 'number') {
		return Promise.reject({ status: 400, msg: 'bad request' });
	}

	let updateQuery = `UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING *`;
	let queryValues = [inc_votes, comment_id];

	return db.query(updateQuery, queryValues);
};
