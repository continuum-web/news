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