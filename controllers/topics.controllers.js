const { selectTopics } = require('../models/topics.models.js');


exports.topicsController = (req, res) => {
   
    return selectTopics().then(({rows}) => {
		
		res.status(200).send({topics:rows})
	});

}