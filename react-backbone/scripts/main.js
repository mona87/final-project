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
var LoginComponent = require('./components/LoginComponent');
var User = require('./components/User');

var el = document.getElementById('container');

var App = Backbone.Router.extend({
	routes:{
		'':  	'home',
		'maps/:user': 'maps',
		'test': 'test',
		'login': 'login'
	},

	home: function(){
		console.log('home');
		React.render(
				<UserComponent/>,
				el
		)
	
	},
	maps: function(user){
	 	console.log('maps');

	 	React.render(
	 		<div>
	 		<User/>
	 	 	<LocationComponent router={myRouter} />
	 	 	</div>,
	 		el	 	
	 	)
	 },
	 test: function(){
	 	console.log('carousel');
		 React.render(
		 	<div>
		 	<CarouselComponent />
		 	</div>, el);

	 },
	 login: function(){
	 	React.render(
	 		<div>
	 		<User/>
	 		<LoginComponent router={myRouter}/>
	 		</div>,el
	 	);
	 }
});

var myRouter = new App();
Backbone.history.start();