const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const OrdersController = require('../../controllers/orders');


//GET all orders from the databse
router.get('/', checkAuth, OrdersController.orders_get_all);


//POST Create a new order
router.post('/', checkAuth, OrdersController.orders_create_order);


//GET Individual Order From Database
router.get('/:orderId', checkAuth, OrdersController.orders_get_one_order);


//Update Individual Products in the database
router.patch('/:orderId', checkAuth, OrdersController.orders_update_order);


//Delete Individual Product			
router.delete('/:orderId', checkAuth, OrdersController.orders_delete_order);	

module.exports = router;