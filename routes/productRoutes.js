// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { addProduct, viewAllProducts, viewProductById, updateProductById } = require('../controllers/productController');


// Add a product
router.post('/', addProduct);

// View all products
router.get('/', viewAllProducts);

// View one product by ID
router.get('/:id', viewProductById);

// Update a product by ID
router.put('/:id',  updateProductById);

module.exports = router;
