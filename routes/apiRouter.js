const apiRouter = require('express').Router()
const topicsRouter = require('./topicsRouter');
const articlesRouter= require('./articlesRouter')
const commentsRouter = require('./commentsRouter');

//sends the user an welcome message
apiRouter.get('/', (req, res) => {
    res.status(200).send({ msg: "Welcome to the API" })
})

// routers for /topics /comments and /articles
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/comments', commentsRouter)
apiRouter.use('/articles', articlesRouter)


module.exports = apiRouter