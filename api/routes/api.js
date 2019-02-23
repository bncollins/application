/*const express = require('express');
const router = express.Router();
const User = require('../models/users');

//Get List Of Users from the db
router.get('/users',function(req,res){
		const users = [
		{id: 1, firstName: 'The', lastName: 'Powerful'},
		{id: 2, firstName: 'Play', lastName: 'Goes On'},
		{id: 3, firstName: 'And You', lastName: 'May'},
		{id: 4, firstName: 'Contribute', lastName: 'A Verse'}
	];
	res.json(users);
});



//Add Users to the db
router.post('/users',function(req,res){
	User.create(req.body).then(function(user){
		res.send({user});
	});
});


//Update User info 
router.put('/users/:id',function(req,res){
	res.send({type:'PUT'});
});


//Delete User info 
router.delete('/users/:id',function(req,res){
	res.send({type:'DELETE'});
});

module.exports = router;*/