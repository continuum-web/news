const { getUsers } = require('../models/users.model');

exports.getUsersController = (req, res, next) => {
    return getUsers()
        .then((body) => {
            const { rows } = body
            res.status(200).send({users:rows});
		})
		.catch(next);
};
