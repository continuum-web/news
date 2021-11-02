const apiRouter = require('express').Router()
const topicsRouter = require('./topicsRouter');
const articlesRouter= require('./articlesRouter')
const commentsRouter = require('./commentsRouter');


apiRouter.get('/', (req, res) => {
    res.status(200).send({ msg: "Welcome to the API" })
})

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/comments', commentsRouter)
apiRouter.use('/articles', articlesRouter)


module.exports = apiRouter