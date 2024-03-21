const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Route to get all customers
router.get('/getcustomers', customerController.getAllCustomers);

// Route for creating a new customer
router.post('/customers', customerController.createCustomer);


// Route to delete a customer by ID
router.delete('/customers/:id', customerController.deleteCustomer);

// Route to get one customer
router.get('/getonecustomer', customerController.getOneCustomer);

// route to get summary 
router.get('/summary', customerController.getSummary);

// route to update the customer
router.put('/customers/:id', customerController.updateCustomer);

module.exports = router;
