import React, { Component } from 'react';
import './utils.css';

class Users extends Component {
	constructor () {
		super();
		this.state = {
			users:[],
			products:[],
			isLoaded: false
		}
	}

	componentDidMount(){
		fetch('/api/users')
		.then(res => res.json())
		.then(json => {
			this.setState({
				isLoaded: true,
				users: json
			});
			console.log('Users fetched ..', this.state.users.users);	
		});
}
  render() {
  	var {isLoaded, users} = this.state;
    
	if (!isLoaded){
       	return <div>Loading ...</div>
       } else {
       	return(
       	<div>	
       		<div>
   		{/*		{users.users.map((user, index) => (
					<span key={index}>
						{user.userFirstName} {user.userLastName}
					</span>	
   				))}*/}
       		</div>
       		
	      </div>
       	);
      }
  }
}
export default Users;
