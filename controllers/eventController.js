const Event = require('../models/events');
const Customer = require('../models/customers');
const validator = require('../validations/eventValidator');

// controller to create events
exports.createEvent = async(req, res) => {
    try {
        let customerId = req.params.id;
        let event = req.body;
        if(!validator.validateEvent(customerId)) {
            res.status(400).send("Enter the Details Correctly");
        }
        else {
            const eventCreated = await Event.create({
                customerId : customerId.toString(),
                eventName : event.eventName,
                eventData : event.eventData
            });
            res.status(201).json(eventCreated);           
        }
    }
    catch(err) {
        res.status(400).send(err.message);
    }
}

//controller to view events by customer Id
exports.viewEventsByCustomerId = async ( req, res ) => {
    try {
        const customerId = req.params.id;
        const validatedCustomerId = await validator.validateCustomerId(customerId)
        
        if(!validatedCustomerId) {
            res.status(400).send("Enter the Details Correctly");
        }
        else {
            
            console.log(validatedCustomerId);
            res.status(200).send(validatedCustomerId);
        }
    }
    catch {
        res.status(400).send(err.message);
    }
}