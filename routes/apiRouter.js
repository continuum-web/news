const apiRouter = require('express').Router()
const topicsRouter = require('./topicsRouter');
const articlesRouter= require('./articlesRouter')
const commentsRouter = require('./commentsRouter');
const endpointJson = require('../endpoints.json')
const fs = require('fs/promises');

//sends the user an welcome message
apiRouter.get('/', (req, res) => {
   
        res.header('Content-Type', 'application/json')
			.status(200)
			.json(endpointJson);
   
    
})

// routers for /topics /comments and /articles
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/comments', commentsRouter)
apiRouter.use('/articles', articlesRouter)


module.exports = apiRouter