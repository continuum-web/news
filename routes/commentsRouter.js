const commentsRouter = require('express').Router()

//adds a temp message for the /comments endpoint
commentsRouter.get('/', (req, res) => {
 res.status(404).send("Comments endpoint under construction")
})




module.exports= commentsRouter