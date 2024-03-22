const express = require('express');
const route = express.Router();
const eventController = require('../controllers/eventController');

//checking route
// route.get('/', (req, res) => {
//     res.send("Hello Events");
// })

// route to create event
route.post('/createEvent', eventController.createEvent);

// route ro view events by customer id
route.get('/viewEventsByCustomerId/:id', eventController.viewEventsByCustomerId);
module.exports = route;