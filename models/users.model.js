const db = require('../db/connection');

exports.getUsers = username => {
	let queryStr = `SELECT * FROM users`;
	const queryParams = [];
	if (username !== undefined) {
		queryStr += ` WHERE username = $1`;
		queryParams.push(username);
	}

	return db.query(queryStr, queryParams);
};
