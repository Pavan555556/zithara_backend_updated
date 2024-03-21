const Joi = require('joi');
const mongoose = require('mongoose');

// Define Joi schema for validation
const customerJoiSchema = Joi.object({
  customerName: Joi.string().required(),
  email: Joi.string().email().required(),
  revenue: Joi.number().default(0),
  profit: Joi.number().default(0),
  orderCount: Joi.number().default(0),
  createdAt: Joi.date().default(Date.now),
  updatedAt: Joi.date().default(Date.now)
}).options({ stripUnknown: true }); // stripUnknown option removes unknown keys like _id

// Mongoose schema
const customerSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  revenue: {
    type: Number,
    default: 0
  },
  profit: {
    type: Number,
    default: 0
  },
  orderCount: {
    type: Number,
    default: 0
  },
  createdAt : {
    type : Date,
    default : Date.now
  },
  updatedAt : {
    type : Date,
    default : Date.now
  }
});

// Before saving, validate data using Joi schema
customerSchema.pre('save', async function(next) {
  try {
    await customerJoiSchema.validateAsync(this.toObject());
    next();
  } catch (error) {
    next(error);
  }
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
