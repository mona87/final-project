var Backbone = require('backbone');
var RestaurantModel = require('../models/RestaurantModel');

module.exports = Backbone.Collection.extend({
	model: RestaurantModel,
	url: 'http://localhost:3000/happyhours',
	parse: function(res){return res.happyhours}
})