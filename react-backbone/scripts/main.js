var React = require ('react');
var Backbone = require('backbone');
var UserComponent = require('./components/UserComponent');
var MapComponent = require('./components/MapComponent');
var LocationComponent = require('./components/LocationComponent');
var CarouselComponent = require('./components/CarouselComponent');
var UserCollection = require('./collections/UserCollection');
var users = new UserCollection();
var Carousel = require('react-bootstrap/lib/Carousel');
var CarouselItem = require('react-bootstrap/lib/CarouselItem');


var el = document.getElementById('container');

var App = Backbone.Router.extend({
	routes:{
		'':  	'home',
		'maps': 'maps',
		'carousel': 'carousel'
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
	 	 	<LocationComponent/>,
	 		el	 	
	 	)
	 },
	 carousel: function(){
	 	console.log('carousel');
		 React.render(<CarouselComponent />, el);

	 }
});

var myRouter = new App();
Backbone.history.start();