var mongoose = require('mongoose');
Schema = mongoose.Schema;

var userSchema = new Schema({
	name: {type: String, required: true},
	age: {type: String, required: true},
	date: {type: Date, required: true, default: Date.now()}
})

var user = mongoose.model('user', userSchema);

module.exports ={

	User: user
}

