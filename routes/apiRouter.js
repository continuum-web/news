const apiRouter = require('express').Router()
const topicsRouter = require('./topicsRouter')
const articlesRouter = require('./articlesRouter')
const commentsRouter = require('./commentsRouter');


apiRouter.use('/', (req, res) => {
    res.status(200).send("Welcome to the API")
})

apiRouter.use("/topics", topicsRouter)
apiRouter.use('/comments', commentsRouter)
apiRouter.use('/articles', articlesRouter)


modules.exports = apiRouter