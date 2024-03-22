const mongoose = require('mongoose');
const Joi = require('joi');

// Define Joi schema for validation
const eventJoiSchema = Joi.object({
    customerId: Joi.string().required(),
    eventName: Joi.string().valid(
        'visitedStore',
        'pageView',
        'categoryView',
        'productView',
        'order',
        'cartUpdated',
        'cartCreated',
        'customerAdded',
        'customerCreated'
    ).required(),
    eventDetails: Joi.object().required(), // Adjust the validation as needed
    ingestedAt: Joi.date().optional()
}).options({ stripUnknown: true });

// mongoose schema
const eventSchema = new mongoose.Schema({
    eventId: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString(),
        unique: true
    },
    customerId: {
        type: String,
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    eventDetails: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    ingestedAt: {
        type: Date
    }
});

// Add Joi validation middleware to validate the request body before saving
eventSchema.pre('save', async function (next) {
    try {
        await eventJoiSchema.validateAsync(this.toObject());
        next();
    } catch (error) {
        next(error);
    }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
