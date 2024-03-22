const Event = require('../models/events');

// validator for event creation
exports.validateEvent = (event) => {
    if(event) {
        return false;
    }
    return true;
}

// validator for view events by customer id
exports.validateCustomerId = async (customerId) => {
    const events = await Event.find({customerId:customerId});
    // console.log(events);
    if(events.length == 0) {
        return false;
    }
    return events;
}