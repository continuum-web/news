const db = require('../db/connection');

exports.addCommentById = (article_id, passedBody) => {
	const params = [];

	const { username, body } = passedBody;
	params.push(article_id);
	params.push(username);
	params.push(body);

	console.log(params);
	const queryStr = `INSERT INTO comments (article_id, author, body)
    VALUES ($1, $2, $3) RETURNING *;`;

	return db.query(queryStr, params);
};
