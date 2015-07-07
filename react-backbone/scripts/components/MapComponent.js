var React = require('react');

module.exports = React.createClass({
	 getDefaultProps: function () {
        return {
                mapCenterLat: 30.198432800000003,
                mapCenterLng: -97.7730461
        };
     },
	componentDidMount: function(){

		 var mapOptions = {
		    zoom: 15,
		    center: this.mapCenterLatLng()
		  }
		  var map = new google.maps.Map(this.getDOMNode(), mapOptions);

		  var marker = new google.maps.Marker({
		      position: this.mapCenterLatLng(),
		      map: map,
		      title: 'Hello World!'
	  	  });
		  this.setState({map: map});
	},
	 mapCenterLatLng: function (lat, long) {
        var props = this.props;
 
        return new google.maps.LatLng(props.mapCenterLat, props.mapCenterLng);
    },
    createLatLng: function(){
    	
    	 self = this;
    	   // console.log('places', this.props);
    	 this.props.places.map(function(place, i){
    	 	// console.log('coord', place.happyhours);
    	 	 self.mapCenterLatLng(place.happyhours.latitude, place.happyhours.longitude);
    	 })
    	},
	render: function(){
		var map = {
			height: '500px',
			width: '500px'
		}
		this.createLatLng();
		return(
			<div style={map} id="map-canvas"></div>
		);

	}



})