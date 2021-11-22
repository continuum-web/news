const express = require('express');
const apiRouter = require('./routes/apiRouter.js');
const {
	handlePSQLErrors,
	handleCustomErrors,
	handle500s,
} = require('./errorHandling');
const cors = require('cors');



// Creates the Express app
app = express();
//this allows us to use the body of requests
app.use(cors());
app.use(express.json());

//our base route
app.use('/api', apiRouter);

//Error Handlers for, Postgres errors, custom Errors (custom 404 msg's etc) and finally 500 errors (any server error)
app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handle500s);

//catches all unknown routes and returns a 404 with the Not Found message
app.all('/*', (req, res) => {
	res.status(404).send({ msg: 'Not Found' });
});

//exports the app
module.exports = app;
