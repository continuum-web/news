const articlesRouter = require('express').Router()

articlesRouter.get('/', (req, res) => {
 res.status(404).send("Articles endpoint under construction")
})




module.exports= articlesRouter