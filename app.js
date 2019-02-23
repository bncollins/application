const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



//Parse URL encoded bodies
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Set paths for routes
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');


//Connect to MongoDB
mongoose.connect('mongodb://admin:' + process.env.MONGO_ATLAS_PW + '@cluster0-shard-00-00-mygoo.mongodb.net:27017,cluster0-shard-00-01-mygoo.mongodb.net:27017,cluster0-shard-00-02-mygoo.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', { useNewUrlParser: true });


//Log Files Using Morgan Plugin
app.use(morgan('dev'));


//Make Uploads Folder Publicly Available
app.use('/uploads', express.static('uploads'));


//CORS Access Server Resources
app.use((req, res, next) =>{
	res.header('Access-Control-Allow-Origin','*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
		);
	if (req.method === 'OPTIONS'){
		res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
		return res.status(200).json({});
	}
	next();
});

//Initialize routes
app.use('/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/users', userRoutes);


//404 All Requests On Non Existant Routes
app.use((req, res, next) =>{
	const error = new Error('Page not found');
	error.status = 404;
	next(error);
});


app.use((error, req, res, next) =>{
	res.status(error.status || 500);
	res.json({
		error: {
			message:error.message
		}
	});
});

module.exports = app;