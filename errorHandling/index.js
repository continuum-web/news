exports.handleCustomErrors = (err, req, res, next) => {
	if (err.status && err.msg) {
		res.status(err.status).send({ msg: err.msg });
	} else {
		next(err);
	}
};
exports.handlePSQLErrors = (err, req, res, next) => {
	console.log('THIS IS AN ERROR ', err);
	const errorCodes = {
		'22P02': { status: 400, msg: { msg: 'Bad Request' } },
	};
	if (!err.code) next(err);
	else {
		const { status, msg } = errorCodes[err.code];
		res.status(status).send(msg);
	}
};

exports.handle500s = (err, req, res, next) => {
	res.status(500).send({ msg: 'server error' });
};
