var React = require('react');
var $ = require('jquery')
var Carousel = require('react-bootstrap/lib/Carousel');
var CarouselItem = require('react-bootstrap/lib/CarouselItem');
var MapComponent = require('./MapComponent');


module.exports = React.createClass({
		  getInitialState: function() {
			return {
			  index: 0,
			  direction: null,
			  counter: 0,
			  counter2: 0,
			  userId: null,
			  username: null,
			  restaurantId: null
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
		  prev: function(){
		  	if (this.state.index === 0 ){
		  		this.state.index = 1
		  		this.handleSelect(this.state.index, 'prev');
		  	}else if(this.state.index === 1 ){
		  		this.state.index = 0
		  		this.handleSelect(this.state.index, 'prev');
		  	}
		  	
		  },
		  next: function(){
		  	if (this.state.index === 0 ){
		  		this.state.index = 1
		  		this.handleSelect(this.state.index, 'next');
		  	}else if(this.state.index === 1 ){
		  		this.state.index = 0
		  		this.handleSelect(this.state.index, 'next');
		  	}
		  	
		  },
		  ComponentDidMount: function(){
			  this.setState({
				counter: 0
			  })
		  },
		  add: function(e){
		  		e.preventDefault();
		  		// e.currentTarget.style.display = 'none';
		  		 console.log('user ', this.state.username);
		  		  console.log('fav ', this.state.restaurantId);
		  		 $.ajax({
					url: 'http://localhost:3000/users',
					data: {username: this.state.username, id:this.state.userId , favorite: this.state.restaurantId},
					type: 'PUT',
					success: function(result){
						console.log(result)
						// self.fetchData();
					},
					error: function(err){
						console.log(err);
					}
				})
		  },
		  update: function(){
			this.state.username = localStorage.getItem('username');
			this.state.userId = localStorage.getItem('id');
		  },
		  render: function() {
		  	this.update();
		   var self = this;
		   var style ={
			color: 'blue'
			}
			// console.log(this.props)
			return (
				<div>
			<div className="row row-color">
				<div className="col-sm-12 ">
				
				  <Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect}>
				   <CarouselItem className="carouselItem ">
				  
					   <div className="imgHolder" alt='900x500'></div>
					<div className="textWrapper" >

							{this.props.nearby.map(function(place, i){

								if(i === self.state.counter){
									self.state.restaurantId = place._id;
								  return(

								   	<div className="textHolder" key={place._id}>
									  	<div >
									  		<i onClick={self.add} className="fa fa-heart fa-2x"></i>
										  	<h1 className="rest-name">{place.restaurant}</h1>
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
				 <CarouselItem className="carouselItem ">
				
				   <div className="imgHolder2" alt='900x500'></div>
			
				
					  <div className="textWrapper">
							  {this.props.nearby.map(function(place, i){
							  	
								if(i === self.state.counter){
								  return(
								  	<div className="textHolder" key={place._id}>
								  	<div ><h1 className="rest-name">{place.restaurant}</h1>
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
			  </div>
			  <div className="row icon-row">
			  	<div onClick={this.prev} className="col-sm-2 mob-btn ">			  			  
			  		<i className="fa fa-hand-o-left fa-3x"></i>			  				  		
			  	</div>
			  	<div className="col-sm-2 mob-btn ">				  				  		
			  		<i className="fa fa-glass fa-3x"></i>
			  	</div>
			  	<div className="col-sm-2 mob-btn ">			  		
			  		<i className="fa fa-street-view fa-3x"></i>
			  	</div>
			  	<div className="col-sm-2 mob-btn ">			  		
			  		<i className="fa fa-list-alt fa-3x"></i>
			  	</div>
			  	 <div onClick={this.next}  className="col-sm-2 mob-btn ">		  
			  		<i className="fa fa-hand-o-right fa-3x "></i>			 
			  	</div>	
			  </div>
			  </div>
			);
		  }
		});


