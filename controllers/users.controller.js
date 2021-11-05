const { getUsers } = require('../models/users.model');

exports.getUsersController = (req, res, next) => {
    let  { username } = req.params
    
    return getUsers(username)
        .then((body) => {
            const { rows } = body
            res.status(200).send({users:rows});
		})
		.catch(next);
};
