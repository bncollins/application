const mongoose = require('mongoose');
const Order = require('../models/orders');
const Product = require('../models/products');
const checkAuth = require('../api/middleware/check-auth');


//GET all products from the databse
exports.products_get_all = (req, res, next) => {
	Product.find()
		.select('-__v')
		.exec()
		.then(docs => {
			const response = {
				count: docs.length,
				products: docs.map(doc => {
					return{
					name: doc.name,
					price: doc.price,
					_id: doc._id,
					productImage: doc.productImage,
					request:{
						type: 'GET',
						url:'http://localhost:5000/api/products/' + doc._id
					}
					}
				})
			}
			res.status(200).json({
				response: response,
				message:'Returned All Products Successfully'
			});				
		})
		.catch(err => {
			res.status(500).json({
				'message': 'The Products List Could Not Be Found',
				'error': err
			});
	});
}


//POST Create a new order
exports.products_create_product = (req, res, next) => {
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price,
		//productImage: req.file.path
	});
	product.save()
	.then(result => {
		console.log(result);
		res.status(201).json({
			message: 'You Successfully Created A New Product!',
			createdPoduct: {
				name: result.name,
				price: result.price,
				_id: result._id,
				//productImage: result.path,
				request:{
					type:'POST',
					url:'http://localhost:5000/api/products/' + result._id
				}
			}	
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({error: err});	
	});
}

//GET Individual Order From Database
exports.products_get_one_product = (req, res, next) => {
	const id = req.params.productId;
	Product.findById(id)
	.select('-__v')
	.exec()
	.then(doc => {
		console.log(doc);
		if(doc){
			res.status(200).json({
				product:doc,
				request:{
					type:'GET',
					url:'http://localhost:5000/products'
				}
			});	
			}else{
			res.status(404).json({
				message: 'Resource Not Found',
			});
		}
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({error: err});
	});
}

//Update Individual Products in the database
exports.products_update_product = (req, res, next) => {	
	const id = req.params.productId;
	const props = req.body;
	Product.update({_id: id}, props)
	//const updateOps = {};
	.exec()
	.then(result =>{
			res.status(200).json({
			message: 'You have successfully updated the product',
			request:{
				type:'GET',
				url:'http://localhost:5000/api/products/' + id
			}	
		});
	})
	.catch(err =>{
		res.status(500).json({error: err});
	});
}

//Delete Individual Product
exports.products_delete_product = (req, res, next) => {
	const id = req.params.productId;
	Product.remove({ _id: id })
	.exec()
	.then(result => {
		res.status(200).json({
			message: 'Successfully deleted product',
			request:{
				type:'POST',
				url:'http://localhost:5000/api/products',
				body:{'name': 'String', 'price': 'Number'}
			}
		});
	})
	.catch( err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
}