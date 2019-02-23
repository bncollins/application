const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/users');
mongoose.set('useCreateIndex', true);
const jwt = require('jsonwebtoken');

exports.user_signup = (req, res, next) => {
	User.find({email: req.body.email})
	.exec()
	.then(user=>{
		if(user.length >= 1){
			return res.status(409).json({
				message:'Email already exists'
			});
		}else{
			bcrypt.hash(req.body.password, 10, (err, hash)=>{
				if(err){
					return res.status(500).json({error:err});
				} else {
					const user = new User({
						_id: new mongoose.Types.ObjectId(),
						email: req.body.email,
						password: hash 
				});
				user.save()
				.then(result=>{
					console.log(result);
					res.status(201).json({
						message: 'User successfully created'
					})
				})
				.catch(err=>{
					console.log(err);
					res.status(500).json({error:err})
				});
			}
		});
		}
	})
}


//User Login
exports.user_login = (req, res, next) =>{
	User.find({email: req.body.email})
		.exec()
		.then(user => {
			if(user.length < 1){
				return res.satus(401).json({
					message:'Auth failed'
				});
			}
			bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
				if(err){
					return res.satus(401).json({
						message:'Auth failed'
					});
				}
				if(result){
					const token = jwt.sign({
						email: user[0].email,
						userId: user[0]._id
					}, 
					process.env.JWT_KEY,
					{
						expiresIn: "1hr" 
					});
					return res.status(200).json({
						 message:'Auth Succesful',
						 token: token
					});
				}
				res.status(401).json({
						message:'Auth failed'
				});
			});
		})
		.catch(err=>{
			res.status(500).json({error:err})
		});
	}

//Delete User from database
exports.user_delete_user = (req, res, next)=>{
	User.remove({_id: req.params.userId})
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'User succesfully deleted'
			});
		})
		.catch(err=>{
			res.status(500).json({error:err})
		});
}
