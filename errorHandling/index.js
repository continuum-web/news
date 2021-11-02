exports.handlePSQLErrors = (err, req, res, next) => {
    const errorCodes = {
        '22P02': { status: 400, msg: { msg:'invalid data type'} },
	};
	if (!err.code) next(err);
	else {
		const { status, msg } = errorCodes[err.code];
		res.status(status).send(msg);
	}
    
}