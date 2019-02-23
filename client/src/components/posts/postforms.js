import React, { Component } from 'react';

class PostForm extends Component {
	constructor (props) {
		super(props);
		this.state = {
			name:'',
			price:''
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e){
		this.setState({[e.target.name]: e.target.value})
	}

	onSubmit(e){
		 e.preventDefault();
		 const post = {
		 	name: this.state.name,
		 	price:this.state.price
		 };
		 fetch('http://localhost:5000/api/products', {
		 	method:'POST',
		 	headers:{
		 		'content-type':'application-json'
		 	},
		 	body: JSON.stringify(post)
		 })
		 .then(res=>res.json())
		 .then(data=>console.log(data)); 
	}

  render() {
       	return(
       	<div>	
       		<div>
		        <form onSubmit={this.onSubmit}>
		        <label>Name</label><br/>
		        	<input  name="name" value={this.state.name} onChange={this.onChange} placeholder="What will your verse be?" type="text"/>
		        	<br/>
		        	<label>Price</label>
		        	<br/>
		        	<input name="price" value={this.state.price} onChange={this.onChange} placeholder="What will your verse be?" type="text"/>
		        	<br/>
		        	<input type="submit"/>
		        </form>
	      	</div>
	      </div>
       	);
      }
}
export default PostForm;
