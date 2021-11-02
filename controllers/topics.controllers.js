const { selectTopics } = require('../models/topics.models.js');


exports.topicsController = (req, res, next) => {
   
    return selectTopics().then(({rows}) => {
		//console.log(rows);
		res.status(200).send({topics:rows})
	});

}