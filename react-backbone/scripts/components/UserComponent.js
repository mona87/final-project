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
		var style2 = {
			paddingLeft: '20px'
		}
		return(
			<div style= {style2}>	
			<form >
			<h1>User</h1>
			<label>Name</label><br/>
			<input ref="name" type="text"/><br/>
			<label>Password</label><br/>
			<input ref="age" type="text" /><br/>
			<label>User ID</label><br/>
			<input ref="modelId" type="text"/><br/><br/>
			<button style={style} onClick={this.post} >Add</button>
			<button style={style} onClick={this.delete}>Remove</button>
			<button style={style} onClick={this.put}>Update</button>
			<button style={style} onClick={this.search}>Find</button>
			<button style={style} onClick={this.login}>Login</button>
			<button style={style} onClick={this.logout}>Logout</button>
			</form>
			<div>
			<h2>User Search</h2>
			{this.state.user.name}<br/><br/>
			{this.state.user.age}
			{this.state.user.username}<br/><br/>
			{this.state.user.password}
			</div>
			<h2>User List</h2>
			<div>{this.state.myCollection.map(function(user){
					return(
					<div key={user.attributes._id}>
					<h2>{user.attributes.username}</h2>
					<h3>{user.attributes.password}</h3>
					<h2>{user.attributes.name}</h2>
					<h3>{user.attributes.age}</h3>
					<h4>{user.attributes._id}</h4>
					</div>
					)

			}).reverse()}</div>

			</div>
		);

	},
	login: function(e){
		e.preventDefault();
		self = this;
		var name = this.refs.name.getDOMNode().value;
		var pass = this.refs.age.getDOMNode().value;
		console.log('click')
		$.ajax({
		    url: 'http://localhost:3000/login',
		    data: {username: name, password: pass},
		    type: 'POST',
		    success: function(result) {
		        console.log(result);
		        // self.fetchData();
		    },
		    error: function(err){
		    	console.log(err);
		    }
		});
	},
	logout: function(e){
		e.preventDefault();
		self = this;
		var name = this.refs.name.getDOMNode().value;
		var pass = this.refs.age.getDOMNode().value;
		console.log('click')
		$.ajax({
		    url: 'http://localhost:3000/logout',
		    data: {},
		    type: 'GET',
		    success: function(result) {
		        console.log(result);
		        // self.fetchData();
		    },
		    error: function(err){
		    	console.log(err);
		    }
		});
	},
	post: function(e){
		e.preventDefault();
		self = this;
		var user = new UserModel({
			username: this.refs.name.getDOMNode().value,
			password: this.refs.age.getDOMNode().value
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
		var pass = this.refs.age.getDOMNode().value;

		$.ajax({
			url: 'http://localhost:3000/users',
			data: {id: id, username: name, password: pass},
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