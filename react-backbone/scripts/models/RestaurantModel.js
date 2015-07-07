var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
	defaults: {
		restaurant: '',
		details: '',
		address: '',
		phone: '',
		website: '',
		url: '',
		latitude: '',
		longitude: '',
		_id: ''
	},
	urlRoot: 'http://localhost:3000/happyhours',
	idAttribute: '_id'
})