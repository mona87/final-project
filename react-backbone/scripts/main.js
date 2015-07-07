var React = require ('react');
var Backbone = require('backbone');
var UserComponent = require('./components/UserComponent');
var MapComponent = require('./components/MapComponent');
var LocationComponent = require('./components/LocationComponent')
var UserCollection = require('./collections/UserCollection');
var users = new UserCollection();




var el = document.getElementById('container');

var App = Backbone.Router.extend({
	routes:{
		'':  	'home',
		'maps': 'maps'
	},

	home: function(){
		console.log('home');
		React.render(
				<UserComponent  />,
				el
		)
	
	},
	maps: function(){
	 	console.log('maps');

	 	React.render(
	 		<div>
	 	 	<LocationComponent/>
	 		</div>,
	 		el
	 	
	 	)

	 }
});

var myRouter = new App();
Backbone.history.start();