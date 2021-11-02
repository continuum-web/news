const db = require('../db/connection');

exports.selectArticles = (article_id) => {
    console.log(article_id)
    const queryParams = []
    let queryStr = `SELECT * FROM articles`
    if (article_id !== undefined) {
        console.log(`this is inside the if`)
        queryStr += ` WHERE article_id = $1`
        queryParams.push(article_id)
    }
	return db.query(queryStr, queryParams);
};
