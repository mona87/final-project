var Backbone = require ('backbone');

module.exports = Backbone.Model.extend({
	defaults:{
		name: '',
		age: '',
		_id: ''
	},
	urlRoot: 'http://localhost:3000/users',
	idAttribtue: '_id'
})