var React = require('react');
var Backbone = require('backbone');
var UserModel = require('../models/UserModel');
var UserCollection = require('../collections/UserCollection');
var $ = require('jquery');
var myUserlist = new UserCollection();


module.exports = React.createClass({
	getInitialState: function(){
		return{
			myCollection:  [],
			user: 'none'
		}
	},
	componentDidMount: function(){
		this.fetchData();				
		// $.get('http://localhost:3000/users', function(userCollection){
		// 	if(this.isMounted()){
		// 		this.setState({
		// 			myCollection: userCollection.users
		// 		});
		// 	}
			
		// }.bind(this))
	},
	render: function(){
		var style ={
			marginRight: '5px'
		}

		return(
			<div>	
			<form >
			<h1>Add User</h1>
			<label>Name</label><br/>
			<input ref="name" type="text"/><br/>
			<label>Age</label><br/>
			<input ref="age" type="text" /><br/>
			<label>User ID</label><br/>
			<input ref="modelId" type="text"/><br/>
			<button style={style} onClick={this.post} >Add</button>
			<button style={style} onClick={this.delete}>Remove</button>
			<button style={style} onClick={this.put}>Update</button>
			<button style={style} onClick={this.search}>Find</button>
			</form>
			<div>
			<h2>User Search</h2>
			{this.state.user.name}<br/><br/>
			{this.state.user.age}
			</div>
			<h2>User List</h2>
			<div>{this.state.myCollection.map(function(user){
					return(
					<div key={user.attributes._id}>
					<h2>{user.attributes.name}</h2>
					<h3>{user.attributes.age}</h3>
					<h4>{user.attributes._id}</h4>
					</div>
					)

			}).reverse()}</div>

			</div>
		);

	},
	post: function(e){
		e.preventDefault();
		self = this;
		var user = new UserModel({
			name: this.refs.name.getDOMNode().value,
			age: this.refs.age.getDOMNode().value
		})
		user.save().done(
			function(data){
				// console.log('saved')
				self.fetchData();
			},
			function(err){
				console.log(err);
			}
		)
	},
	delete: function(e){
		e.preventDefault();
		console.log(this.refs.modelId.getDOMNode().value);
		self = this;

		var id = this.refs.modelId.getDOMNode().value

		$.ajax({
		    url: 'http://localhost:3000/users',
		    data: {id: id},
		    type: 'DELETE',
		    success: function(result) {
		        console.log(result);
		        self.fetchData();
		    },
		    error: function(err){
		    	console.log(err);
		    }
		});
	
	},
	put: function(e){
		e.preventDefault();
		self = this;
		var name = this.refs.name.getDOMNode().value;
		var id = this.refs.modelId.getDOMNode().value;
		var age = this.refs.age.getDOMNode().value;

		$.ajax({
			url: 'http://localhost:3000/users',
			data: {id: id, name: name, age: age},
			type: 'PUT',
			success: function(result){
				console.log(result)
				self.fetchData();
			},
			error: function(err){
				console.log(err);
			}
		})
	},
	search: function(e){
		e.preventDefault();
		self = this;
		var id = this.refs.modelId.getDOMNode().value
		$.get('http://localhost:3000/users/'+ id, function(data){
			console.log(data);
			self.setState({
				user: data
			})
		})

	},
	fetchData: function(){
		var self = this;
		myUserlist.fetch({
			success: function(user){
				self.setState({
					myCollection: user.models
				})		
			}
		})
	}

})