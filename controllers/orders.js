const mongoose = require('mongoose');
const Order = require('../models/orders');
const Product = require('../models/products');
const checkAuth = require('../api/middleware/check-auth');


//GET all orders from the databse
exports.orders_get_all = (req, res, next) => {
	Order.find()
	.select('-__v')
	.populate('product', '-__v')
	.exec()
	.then(docs => {
		res.status(200).json({
			count:docs.length,	
			orders:docs.map(doc => {
				return{
					_id:doc._id,
					product: doc.product,
					quantity:doc.quantity,
					request:{
						type:'GET',
						url:'http://localhost:5000/api/orders/' + doc._id
					}
				}
			})
		});
	})
	.catch(err => {
		res.status(500).json({error:err})
	});
}


//POST Create a new order
exports.orders_create_order = (req, res, next) => {
	Product.findById(req.body.productId)
		.then(product => {
			if(!product){
				return res.status(404).json({
					message:'Product not found'
				});
			}
			const order = new Order({
				_id: mongoose.Types.ObjectId(),
				quantity: req.body.quantity,
				product: req.body.productId
			});
		return order
		.save()		
		})
		.then(result => {
			res.status(201).json({
				message: 'Your order has been succesfully created',
				createdOrder:{
					_id: result._id,
					quantity: result.quantity,
					product: result.product
				},
				request:{
					type:'GET',
					url:'http://localhost:5000/api/orders' + result._id
				}
			});
		})
		.catch(err => {
			res.status(500).json({
				message: 'The product does not exist in the database',
				error: err
			})
		});
	}



//GET Individual Order From Database
	exports.orders_get_one_order = (req, res, next) => {
		const id = req.params.orderId;
		Order.findById(id)
		.select('name price _id')
		.populate('product')
		.exec()
		.then(order => {
			console.log(order);
			if(order){
				res.status(200).json({
					order: order,
					request:{
						type:'GET',
						url:'http://localhost:5000/api/orders/' +order._id
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
exports.orders_update_order = (req, res, next) => {	
	const id = req.params.orderId;
	const props = req.body;
	Order.update({_id: id}, props)
	.exec()
	.then(result =>{
			res.status(200).json({
			message: 'You have successfully updated your order.',
			request:{
				type:'GET',
				url:'http://localhost:5000/api/orders/' + id
			}	
		});
	})
	.catch(err =>{
		res.status(500).json({error: err});
	});
}


//Delete Individual Product
exports.orders_delete_order = (req, res, next) => {
	const id = req.params.orderId;
	Order.remove({ _id: id })
	.exec()
	.then(result => {
		res.status(200).json({
			message: 'Successfully deleted your order',
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