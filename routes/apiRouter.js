const apiRouter = require('express').Router()
const topicsRouter = require('./topicsRouter');
const articlesRouter= require('./articlesRouter')
const commentsRouter = require('./commentsRouter');
const fs = require('fs');

//sends the user an welcome message
apiRouter.get('/', (req, res) => {
    const jsonFile = fs.readFile('./endpoints.json', (err, json) => {
		let obj = JSON.parse(json);
		res.json(obj);
    });
    jsonFile.then((obj) => {
        res.status(200).send(obj)
    })
    
})

// routers for /topics /comments and /articles
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/comments', commentsRouter)
apiRouter.use('/articles', articlesRouter)


module.exports = apiRouter