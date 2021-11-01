const commentsRouter = require('express').Router()

commentsRouter.get('/', (req, res) => {
 res.status(404).send("Comments endpoint under construction")
})




module.exports= commentsRouter