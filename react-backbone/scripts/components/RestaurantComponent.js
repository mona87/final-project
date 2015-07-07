var Backbone = require ('backbone');
var React = require('react');
var RestaurantCollection = require('../collections/RestaurantCollection');
var restaurants = new RestaurantCollection();
var MapComponent = require('./MapComponent');


module.exports = React.createClass ({
	getInitialState: function(){
		
		return{
			places: [],
			lat: this.props.lat,
			lng: this.props.lng
		}
	},
	componentWillMount: function(){
		var self = this;
		this.fetchData();
	},

	rad: function(x) 
	{ 
		return x * Math.PI / 180 
	},
	haversine: function(p1Lat, p1Long, p2Lat, p2Long) {

    var R = 3959
    var dLat  = this.rad(p2Lat - p1Lat)
    var dLong = this.rad(p2Long - p1Long)

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.rad(p1Lat)) * Math.cos(this.rad(p2Long)) * Math.sin(dLong/2) * Math.sin(dLong/2)
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    if (isNaN(c)){
    	c = 0
    }
    // console.log(c);
    var d = R * c
    var miles = Math.round(d)
    // var half = Math.round(d)/2
    // var miles = (half * .25) + half
    return miles
	},
	render: function(){
		self = this;
		var style ={
			color: 'blue'
		}
			// console.log('dis ' +this.haversine(30.26654,-97.738194, this.state.lat, this.state.lng));
		console.log('props ',this.props)
		return(
			<div>
			
			<div>{this.state.places.map(function(place){
					if(self.haversine(place.latitude,place.longitude, self.props.lat, self.props.lng) <= 5 ){
			 			return(
			 					<div key={place._id}>
								<div>{place.restaurant}</div>
								<div>{place.address}</div>
								<div> {'distance ' +self.haversine(place.latitude,place.longitude, self.props.lat, self.props.lng) + ' miles'}</div>
								<div style={style}>This restaurant is less than 5 miles away</div>
								<p></p>
								</div>
			 				)
			 		}
			 		else{
						return(
							<div key={place._id}>
							<div>{place.restaurant}</div>
							<div>{place.address}</div>
							<div> {'distance ' +self.haversine(place.latitude,place.longitude, self.props.lat, self.props.lng) + ' miles'}</div>
							<p></p>
							</div>
						);
				}

			})}</div>
			
			</div>
		)
	},
	componentDidiMount: function(){

	},
	fetchData: function(){
		self = this
		restaurants.fetch({
			success: function(mod, i){
				// console.log(i)
				self.setState({
					places: i.happyhours
				})
			}
		})

		

	}

})

