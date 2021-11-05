const { getUsers } = require('../models/users.model');

exports.getUsersController = (req, res, next) => {
    let  { username } = req.params
    
    return getUsers(username)
        .then((body) => {
            const { rows } = body

            if (rows.length === 0) {
                return Promise.reject({ status: 404, msg: "not found" })
            }
            else {
                res.status(200).send({users:rows});
            }
            
		})
		.catch(next);
};
