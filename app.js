const express= require('express')
const apiRouter = require('./routes/apiRouter.js')
const { handlePSQLErrors}= require('./errorHandling')

app = express()
app.use(express.json())
app.use('/api', apiRouter)

app.use(handlePSQLErrors)
// app.use(handleCustomErrors)
// app.use(handle500s)

app.all('/*', (req, res) => {
	res.status(404).send({ msg: 'Path Not Found' });
});

module.exports = app;