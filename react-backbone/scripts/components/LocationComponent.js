var React = require('react');
var Restaurant = require('./RestaurantComponent');

module.exports = React.createClass({
	getDefaultProps: function(){
		return {
			enableHighAccuracy: true, 
		  	maximumAge        : 30000, 
		  	timeout           : 27000
		}
	},
	getInitialState: function(){
		return {
			lat: null,
			lng: null
		}
	},
	componentWillMount: function(){
		var wpid = navigator.geolocation.watchPosition(this.geoSuccess, this.geoError, this.props);
	},
	geoSuccess: function(position){
		  // console.log('my position ', position.coords.latitude, position.coords.longitude);
		 	  this.setState({
		  		lat: position.coords.latitude,
		  		lng: position.coords.longitude
		 	 })
	},
	geoError: function(){
		alert("Sorry, no position available.");
	},
	render: function(){
		return(
			<Restaurant lat={this.state.lat} lng={this.state.lng} />
		);
		
	}

})