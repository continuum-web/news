const db = require('../connection.js');
const format = require('pg-format');
const { formatDataForEntry } = require('../utils');

const seed = async data => {
	const { articleData, commentData, topicData, userData } = data;
	// 1. create tables
	const qsTopicTable = `CREATE TABLE topics (
    slug VARCHAR UNIQUE PRIMARY KEY,
    description TEXT
  );`;
	const qsUserTable = `CREATE TABLE users (
    username UNIQUE PRIMARY KEY,
    avatar_url TEXT,
    name VARCHAR(40)
  );`;

	const qsArticleTable = `CREATE TABLE articles (
    article_id SERIAL PRIMARY KEY,
    title VARCHAR,
    body TEXT,
    votes INT DEFAULT 0,
    topic REFERENCES topics (slug),
    author REFERENCES users (username),
    created_at DEFAULTS CURRENT_TIMESTAMP
  );`;
	const qsCommentTable = `CREATE TABLE comments (
  comment_id SERIAL PRIMARY KEY,
  author REFERENCES users (username),
  article_id REFERENCES articles (article_id),
  votes INT DEFAULT 0,
  created_at DEFAULTS CURRENT_TIMESTAMP
  body TEXT,
  );`;

  const queryArray = [db.query(qsTopicTable), db.query(qsUserTable),db.query(qsArticleTable),db.query(qsCommentTable),];
    Promise.all(queryArray)
	// 2. insert data
};

module.exports = seed;
