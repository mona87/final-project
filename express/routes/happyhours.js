var Happyhour = require('../models/happyhour').Happyhour;

exports.index = function(req, res){
	Happyhour.find({}, function(err, docs){
		console.log('docs' +docs)
		if(!err){
			res.status(200).json({happyhours: docs});
		}
		else{
			res.status(200).json({message: err})
		}
	})
}