// controllers/productController.js
const Product = require('../models/products');
const verifyApiToken = require('../middlewares/verifyApiToken');

// Controller function to add a product
exports.addProduct = async (req, res) => {
     const headers = req.headers;
     console.log(headers);
     console.log(typeof headers['apikey']);
     console.log(headers['apisecret']);
    //  console.log(await verifyApiToken.checkToken(headers['apikey'], headers['apisecret']));
     if(await verifyApiToken.checkToken(headers['apikey'], headers['apisecret'])) {
        try {
            const productData = req.body;
            const product = await Product.create(productData);
            res.status(201).json(product);
        } catch (error) {
            console.error('Error adding product:', error);
            res.status(500).send(error.message);
        }
    }
    else {
        res.status(401).send("Unauthorized Access");
    }
}

// Controller function to view all products
exports.viewAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to view one product by ID
exports.viewProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to update a product by ID
exports.updateProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const updateData = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
