const db = require('../connection.js');
const format = require('pg-format');
const { formatDataForEntry } = require('../utils');

const seed = async data => {
	const { articleData, commentData, topicData, userData } = data;

	const qsTopicTable = `
  CREATE TABLE topics (
    slug VARCHAR PRIMARY KEY,
    description TEXT
  );`;
	const qsUserTable = `CREATE TABLE users (
    username VARCHAR PRIMARY KEY,
    avatar_url TEXT,
    name VARCHAR
  );`;

	const qsArticleTable = `CREATE TABLE articles (
    article_id SERIAL PRIMARY KEY,
    title VARCHAR,
    body TEXT,
    votes INT DEFAULT 0,
    topic VARCHAR REFERENCES topics (slug),
    author VARCHAR REFERENCES users (username),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`;
	const qsCommentTable = `CREATE TABLE comments (
  comment_id SERIAL PRIMARY KEY,
  author VARCHAR REFERENCES users (username),
  article_id INT REFERENCES articles (article_id),
  votes INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  body TEXT
  );`;

	return db
		.query(`DROP TABLE IF EXISTS comments`)
		.then(() => {
			return db.query(`DROP TABLE IF EXISTS articles`);
		})
		.then(() => {
			return db.query(`DROP TABLE IF EXISTS users`);
		})
		.then(() => {
			return db.query(`DROP TABLE IF EXISTS topics`);
		})
		.then(() => {
			return db.query(qsTopicTable);
		})
		.then(() => {
			return db.query(qsUserTable);
		})
		.then(() => {
			return db.query(qsArticleTable);
		})
		.then(() => {
			return db.query(qsCommentTable);
		})
		.then(() => {
			const formattedData = formatDataForEntry(topicData);
			const queryStr = format(
				`INSERT INTO topics (description,slug ) VALUES %L RETURNING *`,
				formattedData
			);
			return db.query(queryStr);
		})
		.then(() => {
			const formattedData = formatDataForEntry(userData);
			const queryStr = format(
				`INSERT INTO users (username, name, avatar_url) VALUES %L RETURNING *`,
				formattedData
			);
			return db.query(queryStr);
		})
		.then(() => {
			const formattedData = formatDataForEntry(articleData);

			const queryStr = format(
				`INSERT INTO articles (title, topic, author,body, created_at, votes) VALUES %L RETURNING *`,
				formattedData
			);
			return db.query(queryStr);
		})
		.then(() => {
			const formattedData = formatDataForEntry(commentData);

			const queryStr = format(
				`INSERT INTO comments (body, votes, author, article_id, created_at) VALUES %L RETURNING *`,
				formattedData
			);
			return db.query(queryStr);
		})
		// .then(({ rows }) => {
		// 	//console.log(rows);
		// })
		.catch(error => {
			console.error(error);
		});
};

module.exports = seed;
