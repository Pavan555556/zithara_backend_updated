// Import the Express module
const express = require('express');
const connectDB = require('./db');
const customerRoutes = require('./routes/customerRoutes');
const eventRoutes = require('./routes/eventRoutes');
const productRoutes = require('./routes/productRoutes');
const apiRoutes = require('./routes/apiRoutes');

// Create an instance of Express
connectDB();
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Use customer routes
app.use('/api', customerRoutes);
//Use event routes
app.use('/events', eventRoutes);
// Use product Routes
app.use('/products', productRoutes);

// Define a route handler for the root path
app.get('/', (req, res) => { 
  res.send('Hello, world!');
});

app.use('/apiTokens', apiRoutes);
// Define the port number
const PORT = process.env.PORT || 3000;

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
