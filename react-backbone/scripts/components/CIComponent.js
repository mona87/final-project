var React = require('react')
var CarouselItem = require('react-bootstrap/lib/CarouselItem');

module.exports = React.createClass({
	render: function(){
		return(
			
			 <CarouselItem>
                  <img width={900} height={500} alt='900x500' src='https://placeholdit.imgix.net/~text?txtsize=47&txt=500%C3%97300&w=500&h=300'/>
                  <div className='carousel-caption'>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </div>
              </CarouselItem>

		);
	}
})