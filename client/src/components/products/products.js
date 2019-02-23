import React, { Component } from 'react';

class Products extends Component {
	constructor () {
		super();
		this.state = {
			products:[],
			isLoaded: false
		}
	}

	componentDidMount(){
		fetch('/products')
		.then(res => res.json())
		.then(json => {
			this.setState({
				isLoaded: true,
				products: json
			});
			console.log('Products fetched ..', this.state.products.response.products);	
		});
}
  render() {
  	var {isLoaded, products} = this.state;
    
	if (!isLoaded){
       	return <div>Loading ...</div>
       } else {
       	return(
       	<div>	
       		<div>
       		
	   				{products.response.products.map((product, index) => (
						<div key={index}>
							<div>{product.name}</div>
							<div>{product.price}</div>
						</div>
	   				))}
   				
       		</div>
	      </div>
       	);
      }
  }
}
export default Products;
