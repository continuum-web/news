const apiRouter = require('express').Router()
const topicsRouter = require('./topicsRouter');
const articlesRouter= require('./articlesRouter')
const commentsRouter = require('./commentsRouter');
const usersRouter = require('./usersRouter')
const endpointJson = require('../endpoints.json')


apiRouter.get('/', (req, res) => {
   
        res.header('Content-Type', 'application/json')
			.status(200)
			.json(endpointJson);
   
    
})


apiRouter.use('/topics', topicsRouter);
apiRouter.use('/comments', commentsRouter)
apiRouter.use('/articles', articlesRouter)
apiRouter.use('/users', usersRouter)


module.exports = apiRouter