const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../../models/products');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const ProductsController = require('../../controllers/products');

//Set Multer Image Upload Path
const storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, './uploads/');
	},
	filename: function(req, file, cb){
		cb(null, Date.now() + file.originalname);
	}
});


// Use Multer to accept & filter file types
const fileFilter = (req, file, cb) => { 
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
		//Accept a file 
		cb(null, true);		
	}else{
		//Reject a file
		cb(new Error({messge:'File type is not supported'}), false);
	}
};

//Configure Multer Image Path, File Size, File Type
const upload = multer({
	storage: storage,
	//Set File Limit To 5mb
	limit:{
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilter
});


//Get Products From Database
router.get('/', ProductsController.products_get_all);


//Add Product To Database
router.post('/', checkAuth, upload.single('productImage'), ProductsController.products_create_product);


//GET Individual Product From Database
router.get('/:productId', ProductsController.products_get_one_product);


//Update Individual Products in the database
router.patch('/:productId', checkAuth, ProductsController.products_update_product);


//Delete Individual Product			
router.delete('/:productId',checkAuth, ProductsController.products_delete_product);			

module.exports = router;
