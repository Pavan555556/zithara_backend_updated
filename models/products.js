const mongoose = require('mongoose');
const Joi = require('joi');

// Define Joi schema for validation
const productJoiSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Name cannot be empty',
        'any.required': 'Name is required'
    }),
    description: Joi.string().messages({
        'string.empty': 'Description cannot be empty'
    }),
    price: Joi.number().required().messages({
        'number.base': 'Price must be a number',
        'any.required': 'Price is required'
    }),
    category: Joi.string().required().messages({
        'string.empty': 'Category cannot be empty',
        'any.required': 'Category is required'
    }),
    brand: Joi.string().messages({
        'string.empty': 'Brand cannot be empty'
    }),
    quantity: Joi.number().min(0).default(0).messages({
        'number.base': 'Quantity must be a number',
        'number.min': 'Quantity must be a non-negative number'
    }),
    createdAt: Joi.date().optional().messages({
        'date.base': 'CreatedAt must be a valid date'
    })
}).options({ stripUnknown: true }); // Add stripUnknown option to strip unknown keys

// mongoose schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand: String,
    quantity: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Add Joi validation middleware to validate the request body before saving
productSchema.pre('save', async function (next) {
    try {
        await productJoiSchema.validateAsync(this.toObject());
        next();
    } catch (error) {
        next(error);
    }
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

// Export the Product model
module.exports = Product;
