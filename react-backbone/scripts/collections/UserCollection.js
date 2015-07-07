var Backbone = require('backbone');
var UserModel = require('../models/UserModel');

module.exports = Backbone.Collection.extend({
	model: UserModel,
	url: 'http://localhost:3000/users',
	parse: function(res){return res.users}
});