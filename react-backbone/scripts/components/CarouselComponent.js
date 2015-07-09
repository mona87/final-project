var React = require('react');
var Carousel = require('react-bootstrap/lib/Carousel');
var CarouselItem = require('react-bootstrap/lib/CarouselItem');
var CIComponent = require('./CIComponent');
var MapComponent = require('./MapComponent');

module.exports = React.createClass({
		  getInitialState: function() {
			return {
			  index: 0,
			  direction: null,
			  counter: 0
			};
		  },

		  handleSelect: function(selectedIndex, selectedDirection) {
			// alert('selected=' + selectedIndex + ', direction=' + selectedDirection);
		   
			  if(this.state.counter === 0 && selectedDirection === 'prev'){      
				 this.state.counter = this.props.nearby.length-1
			  }
			  else if(this.state.counter === this.props.nearby.length-1 &&  selectedDirection === 'next'){
				 this.state.counter = 0
			  }else if(selectedDirection === 'next')
			  {
				this.state.counter++;
			  }
			  else if(selectedDirection === 'prev'){
				this.state.counter--;
			  }
					   
				this.setState({
				  index: selectedIndex,
				  direction: selectedDirection
				});
		  },
		  ComponentDidMount: function(){
			  this.setState({
				counter: 0
			  })
		  },

		  render: function() {
		   var self = this;
		   var style ={
			color: 'blue'
			}
			// console.log(this.props)
			return (
				<div>
				<div className="logo"></div>
			  <Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect}>
			   <CarouselItem>
				  <img className="imgHolder" alt='900x500' src='https://img.grouponcdn.com/deal/hHwi69ShuzVgx2F9aEzs/Zd-2048x1229/v1/c700x420.jpg'/>
				  <div className='carousel-caption'>
						{/*<h3>Second slide label</h3>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
				  </div>
				  <div>

						{this.props.nearby.map(function(place, i){

							if(i === self.state.counter){
							  return(
							  	<div key={place._id}>
								<div className="textHolder">{place.restaurant}
								<div>{place.details}</div>
								<div>{place.numbers}</div>
								<div>{place.address}</div>
								<div>{place.phone}</div>
								<div><a href={'"'+place.website+'"'}>{place.website}</a></div>
								</div>
								</div>
							  );
							}
						})}
				  </div>
			  </CarouselItem>
			  <CarouselItem>
				  <img className="imgHolder" width={900} height={200} alt='900x500' src='https://img.grouponcdn.com/deal/hHwi69ShuzVgx2F9aEzs/Zd-2048x1229/v1/c700x420.jpg'/>
				  <div className='carousel-caption'>
					{/*<h3>Second slide label</h3>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
				  </div>
				  <div>
						  {this.props.nearby.map(function(place, i){
						  	
							if(i === self.state.counter){
							  return(
							  	<div key={place._id}>
								<div className="textHolder" >{place.restaurant}
								<div>{place.details}</div>
								<div>{place.numbers}</div>
								<div>{place.address}</div>
								<div>{place.phone}</div>
								<div><a href={'"'+place.website+'"'}>{place.website}</a></div>
								</div>
								</div>
							  );
							}
						})}
				  </div>
			  </CarouselItem>
			  </Carousel>
			  </div>
			);
		  }
		});


